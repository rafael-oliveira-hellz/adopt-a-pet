"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Model
var User_1 = __importDefault(require("../models/User"));
// Helpers
var CreateUserToken_1 = __importDefault(require("../helpers/CreateUserToken"));
var getToken_1 = __importDefault(require("../helpers/getToken"));
dotenv_1.default.config();
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // Register a new user
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, password_confirmation, role, userExists, salt, passwordHash, user, newUser, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password, password_confirmation = _a.password_confirmation, role = _a.role;
                        if (!name) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Name is required'
                                })];
                        }
                        if (!email) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Email is required'
                                })];
                        }
                        if (!password) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Password is required'
                                })];
                        }
                        if (!password_confirmation) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Password confirmation is required'
                                })];
                        }
                        if (password !== password_confirmation) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Password and Password confirmation must be the same'
                                })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        userExists = _b.sent();
                        if (userExists) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'User already exists, choose a different e-mail address'
                                })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.genSalt(18)];
                    case 2:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 3:
                        passwordHash = _b.sent();
                        user = new User_1.default({
                            name: name,
                            email: email,
                            password: passwordHash,
                            role: role
                        });
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, user.save()];
                    case 5:
                        newUser = _b.sent();
                        return [4 /*yield*/, (0, CreateUserToken_1.default)(newUser, req, res)];
                    case 6:
                        token = _b.sent();
                        console.log(token);
                        return [2 /*return*/, res.status(201).json({
                                status: 201,
                                message: 'User created successfully',
                                token: token,
                                data: newUser
                            })];
                    case 7:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({
                                status: 400,
                                error: error_1.message
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Login a user
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, isPasswordValid, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Email is required'
                                })];
                        }
                        if (!password) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Password is required'
                                })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'User does not exist'
                                })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isPasswordValid = _b.sent();
                        if (!isPasswordValid) {
                            return [2 /*return*/, res.status(401).json({
                                    status: 401,
                                    error: 'Invalid password'
                                })];
                        }
                        return [4 /*yield*/, (0, CreateUserToken_1.default)(user, req, res)];
                    case 3:
                        token = _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                status: 200,
                                message: 'User logged in successfully',
                                token: token,
                                data: user
                            })];
                }
            });
        });
    };
    // Check the user token
    UserController.prototype.checkToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, SECRET, token, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SECRET = process.env.JWT_SECRET;
                        if (!req.headers.authorization) return [3 /*break*/, 2];
                        token = (0, getToken_1.default)(req);
                        decoded = jsonwebtoken_1.default.verify(token, SECRET);
                        console.log(decoded);
                        return [4 /*yield*/, User_1.default.findById(decoded.id).select('-password')];
                    case 1:
                        currentUser = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        currentUser = null;
                        _a.label = 3;
                    case 3: return [2 /*return*/, res.status(200).json({
                            status: 200,
                            message: 'User authenticated successfully',
                            data: currentUser
                        })];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map