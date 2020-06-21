"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const env_1 = require("../../env");
const serializeTiles = (tiles) => {
    const serialized = tiles.map(tile => {
        const serializedData = Object.assign({}, tile);
        serializedData.img = `${env_1.serverUrl}/uploads/${tile.img}`;
        return serializedData;
    });
    return serialized;
};
class TilesController {
    async index(req, res) {
        try {
            const tiles = await database_1.default.Tiles.find({}).lean();
            return res.json(serializeTiles(tiles));
        }
        catch (error) {
            console.log(error);
            return res.json({ error: 'Ops, some wild error appeared!' });
        }
    }
    async create(req, res) {
        try {
            console.log(req.file);
            res.json({ img: req.file });
        }
        catch (error) {
            console.log(error);
            return res.json({ error: 'Ops, some wild error appeared!' });
        }
    }
}
exports.default = TilesController;
