"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var createUserToken = function (user, req, res) {
    var SECRET = process.env.JWT_SECRET;
    var token = jsonwebtoken_1.default.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }, SECRET, { expiresIn: '6h' });
    return token;
};
exports.default = createUserToken;
//# sourceMappingURL=CreateUserToken.js.map