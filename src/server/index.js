"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const server = express_1.default();
server.use(cors_1.default({}));
server.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'uploads')));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
routes_1.default(server);
exports.default = server;
