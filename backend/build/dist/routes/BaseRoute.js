"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var baseRoute = (0, express_1.Router)();
baseRoute.get('/', function (req, res) {
    res.status(200).json({
        OK: 'Base Route Connected!!!',
    });
});
exports.default = baseRoute;
//# sourceMappingURL=BaseRoute.js.map