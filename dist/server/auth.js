"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require('jsonwebtoken');
const env_1 = require("../env");
exports.auth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ errorMessage: 'Ops, token not provided.', errorCode: 'au401' });
    }
    else {
        const parts = auth.split(' ');
        if (!parts || !(parts.length === 2)) {
            return res.status(401).json({ errorMessage: 'Ops, token error.', errorCode: 'au402' });
        }
        const [scheme, token] = parts;
        if (!/Bearer$/i.test(scheme)) {
            return res.status(401).json({ errorMessage: 'Ops, bad formatted token.', errorCode: 'au403' });
        }
        jwt.verify(token, env_1.secret, (err, decoded) => {
            if (err)
                return res.status(401).json({ errorMessage: 'Ops, invalid token.', errorCode: 'au405' });
            req.userId = decoded.id;
            req.token = decoded.token || undefined;
            next();
        });
    }
};
