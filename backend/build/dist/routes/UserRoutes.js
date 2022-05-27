"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var userRoute = (0, express_1.Router)();
userRoute.get('/', function (req, res) {
    res.status(200).json({
        OK: 'User Routes Connected!!!',
    });
});
userRoute.post('/register', UserController_1.default.register);
userRoute.post('/login', UserController_1.default.login);
userRoute.get('/checkToken', UserController_1.default.checkToken);
exports.default = userRoute;
//# sourceMappingURL=UserRoutes.js.map