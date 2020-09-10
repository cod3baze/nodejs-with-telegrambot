const routes = require("express").Router();
// CONTROLLERS
const UserController = require("./controllers/UserController");

// HANDLE USERS
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.one);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
