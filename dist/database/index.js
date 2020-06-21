"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../env");
const Users_1 = __importDefault(require("./models/Users"));
const Tiles_1 = __importDefault(require("./models/Tiles"));
mongoose_1.default.connect(String(env_1.database), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = {
    Tiles: mongoose_1.default.model('tiles', Tiles_1.default, 'tiles'),
    Users: mongoose_1.default.model('users', Users_1.default, 'users')
};
exports.default = db;
