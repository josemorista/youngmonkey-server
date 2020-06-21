"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TilesController_1 = __importDefault(require("../controllers/TilesController"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const uploaders_1 = __importDefault(require("../uploaders"));
const auth_1 = require("./auth");
const tilesController = new TilesController_1.default();
const usersController = new UsersController_1.default();
exports.default = (server) => {
    const oapi = express_1.Router();
    const api = express_1.Router();
    api.use(auth_1.auth);
    // Tiles Api
    oapi.get('/tiles', tilesController.index);
    oapi.post('/tiles/upload', uploaders_1.default.single('file'), tilesController.create);
    // Users APi
    oapi.post('/users/signUp', usersController.create);
    oapi.post('/users/signIn', usersController.signIn);
    server.use('/oapi', oapi);
};
