"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
exports.default = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            const hash = uuid_1.v4().replace(new RegExp('-', 'g'), '');
            const fileName = `${hash}-${file.filename}`;
            callback(null, fileName);
        },
    }),
});
