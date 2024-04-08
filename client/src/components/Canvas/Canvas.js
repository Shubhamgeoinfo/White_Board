import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { ButtonTools } from "../ButtonTools/ButtonTools";
import { useViewportSize } from "../../hooks/useViewportSize";
import { useSocket } from "../../hooks/useSocket";
import "./Canvas.css";
import { useSocketDraw } from "../../hooks/useSocketDraw";
import { useSocketMousePos } from "../../hooks/useSocketMousePos";

export const Canvas = () => {
  const socket = useSocket();
  const { editor, onReady } = useFabricJSEditor();
  const { width, height } = useViewportSize();

  const history = [];
  const [color, setColor] = useState("#35363a");

  useSocketDraw(false, editor);
  useSocketMousePos();

  const getLastMove = () => {
    return editor.canvas._objects[editor.canvas._objects.length - 1];
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
        socket.emit("mouse_move", opt.e.clientX, opt.e.clientY);
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
        socket.emit("draw", getLastMove());
      });
    }
    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(height);
    editor.canvas.setWidth(width);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  const toggleSize = () => {
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12);
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);

  const toggleDraw = () => {
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };
  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) {
      const redoMove = history.pop();
      console.log({ redoMove });
      editor.canvas.add(redoMove);
    }
  };

  const clear = () => {
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const onAddCircle = () => {
    editor.addCircle();
    socket.emit("draw", getLastMove());
  };
  const onAddLine = () => {
    editor.addLine();
    socket.emit("draw", getLastMove());
  };
  const onAddRectangle = () => {
    editor.addRectangle();
    socket.emit("draw", getLastMove());
  };
  const addText = () => {
    editor.addText("insert text");
    socket.emit("draw", getLastMove());
  };

  const downloadCanvasImage = () => {
    const href = editor.canvas.toDataURL({
      format: "png",
    });
    const a = document.createElement("a");
    a.href = href;
    a.download = "canvas.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleColorChange = (value) => {
    setColor(value);
  };

  const exportSVG = () => {
    const svg = editor.canvas.toSVG();
    console.info(svg);
  };

  return (
    <div className="canvas-wrapper">
      <ButtonTools
        onAddCircle={onAddCircle}
        onAddLine={onAddLine}
        onAddRectangle={onAddRectangle}
        addText={addText}
        undo={undo}
        redo={redo}
        clear={clear}
        toggleDraw={toggleDraw}
        toggleSize={toggleSize}
        removeSelectedObject={removeSelectedObject}
        handleColorChange={handleColorChange}
        downloadCanvasImage={downloadCanvasImage}
      />

      <div
        style={{
          position: "absolute",
        }}
      >
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </div>
  );
};
