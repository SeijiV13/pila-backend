"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var checkJwt_1 = require("../middlewares/checkJwt");
var checkRole_1 = require("../middlewares/checkRole");
var router = express_1.Router();
//Get all users
router.get("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.listAll);
// Get one user
router.get("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.getOneById);
//Create a new user
router.post("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.newUser);
//Edit one user
router.patch("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.editUser);
//Delete one user
router.delete("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map