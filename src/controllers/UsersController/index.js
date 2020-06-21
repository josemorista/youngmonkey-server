"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../env");
class UsersController {
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await database_1.default.Users.findOne({ _id: id });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
        }
    }
    async signIn(req, res) {
        try {
            const { email, password, invitedBy } = req.body;
            const user = await database_1.default.Users.findOne({ email }).select('+password');
            if (!user) {
                let notFoundError = new Error('user not found.');
                notFoundError.name = 'us001';
                throw notFoundError;
            }
            else {
                if (!(await bcrypt_1.default.compare(password, user.password))) {
                    let wrongPasswordError = new Error('wrong password.');
                    wrongPasswordError.name = 'us002';
                    throw wrongPasswordError;
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, env_1.secret, {
                        expiresIn: 86400,
                    });
                    return res.json({ userId: user._id, token });
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
        }
    }
    async create(req, res) {
        try {
            const user = await database_1.default.Users.create(Object.assign({}, req.body));
            user.password = await bcrypt_1.default.hash(user.password, 10);
            await user.save();
            const token = jsonwebtoken_1.default.sign({ id: user._id }, env_1.secret, {
                expiresIn: 86400,
            });
            return res.json({ userId: user._id, token });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
        }
    }
    async update(req, res) {
        try {
            const user = await database_1.default.Users.updateOne({ _id: req.userId }, { $set: Object.assign({}, req.body) });
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ errorMessage: 'Ops! ' + error.message || '', errorCode: error.name || 'us000' });
        }
    }
    async verifyToken(req, res) {
        const token = String(req.headers.authorization || req.body.token);
        if (!token) {
            return res.json({ valid: false });
        }
        else {
            jsonwebtoken_1.default.verify(token, env_1.secret, (error) => {
                if (error)
                    return res.json({ valid: false });
                return res.json({ valid: true });
            });
        }
    }
}
exports.default = UsersController;
