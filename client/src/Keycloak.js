import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "board.io",
  clientId: "board.io",
});

export default keycloak;
