"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process = express_1.default.Router();
process.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqExp = /[a-zA-Z]/g;
    if (reqExp.test(req.query.width) || reqExp.test(req.query.height)) {
        return res.send('Width and Height can only be numbers!');
    }
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageName = req.query.imageName;
    if (!fs_1.default.existsSync(`./images/${imageName}.jpg`)) {
        return res.send('The images does not exist!');
    }
    if (fs_1.default.existsSync(`./images/cache/${imageName}-${width}-${height}.png`)) {
        res.sendFile(`${path_1.default.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`);
    }
    else {
        const processImage = yield (0, sharp_1.default)(`./images/${imageName}.jpg`)
            .resize(width, height)
            .png()
            .toBuffer();
        fs_1.default.writeFile(`./images/cache/${imageName}-${width}-${height}.png`, processImage, (err) => {
            if (err) {
                console.log(`saving file failed: ${err}`);
            }
            res.sendFile(`${path_1.default.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`);
        });
    }
}));
exports.default = process;
