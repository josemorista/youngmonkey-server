"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tilesSchema = new mongoose_1.Schema({
    cols: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    img: {
        type: String
    },
    video: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    names: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    },
    descriptions: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true
    }
});
exports.default = tilesSchema;
