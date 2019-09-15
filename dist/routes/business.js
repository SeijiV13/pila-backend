"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var checkJwt_1 = require("../middlewares/checkJwt");
var BusinessController_1 = require("../controllers/BusinessController");
var checkRole_1 = require("../middlewares/checkRole");
var router = express_1.Router();
router.get("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], BusinessController_1.default.getBusiness);
router.post("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"]), BusinessController_1.default.createBusiness]);
exports.default = router;
//# sourceMappingURL=business.js.map