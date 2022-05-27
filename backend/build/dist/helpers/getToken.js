"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getToken = function (req) {
    var authToken = req.headers.authorization;
    var token = authToken && authToken.split(' ')[1];
    return token;
};
exports.default = getToken;
//# sourceMappingURL=getToken.js.map