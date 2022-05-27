"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// Routing
var BaseRoute_1 = __importDefault(require("./routes/BaseRoute"));
var UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
dotenv.config({ path: "".concat(__dirname, "/.env") });
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.server.use(express_1.default.json());
        this.server.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
        this.server.use(express_1.default.static('public'));
    };
    App.prototype.routes = function () {
        this.server.use(BaseRoute_1.default);
        this.server.use('/users', UserRoutes_1.default);
    };
    return App;
}());
exports.default = new App().server;
//# sourceMappingURL=app.js.map