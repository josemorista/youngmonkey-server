"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverUrl = exports.secret = exports.port = exports.database = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
switch (process.env.NODE_ENV) {
    case 'development':
        console.log("Environment is 'development! Good coding!");
        dotenv_1.config({
            path: path_1.resolve(__dirname, '../.env.development'),
        });
        break;
    case 'test':
        console.log('Good luck on your tests!');
        dotenv_1.config({
            path: path_1.resolve(__dirname, '../.env.test'),
        });
        break;
    case 'prod':
        console.log('Production mode lock and loaded!');
        dotenv_1.config({
            path: path_1.resolve(__dirname, '../.env'),
        });
        break;
    default:
        console.log('Production mode lock and loaded!');
        dotenv_1.config({
            path: path_1.resolve(__dirname, '../.env'),
        });
        break;
}
exports.database = String(process.env.database);
exports.port = Number(process.env.port);
exports.secret = String(process.env.secret);
exports.serverUrl = String(process.env.serverUrl);
