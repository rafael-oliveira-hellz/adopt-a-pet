"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _dbConnection_1 = __importDefault(require("../database/_dbConnection"));
var User = _dbConnection_1.default.model('User', new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps: true }));
exports.default = User;
//# sourceMappingURL=User.js.map