"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("./api/process"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Welcome to the main page');
});
routes.use('/process', process_1.default);
exports.default = routes;
