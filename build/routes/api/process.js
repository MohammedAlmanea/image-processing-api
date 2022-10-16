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
const utilities_1 = __importDefault(require("../../utilities"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const process = express_1.default.Router();
process.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Regular Expression used to check if width or height have any letter in them
    const reqExp = /[a-zA-Z]/g;
    // Checks if height and width are positive numbers
    if (reqExp.test(req.query.width) ||
        reqExp.test(req.query.height) ||
        parseInt(req.query.width) < 0 ||
        parseInt(req.query.height) < 0) {
        res.status(400);
        return res.send('Width and Height can only be positive numbers!');
    }
    // Query return type is undefined
    // Casting with (as string) so it can parseInt since sharp takes type number for height and width
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageName = req.query.imageName;
    // Checks if the image entered exists
    if (!fs_1.default.existsSync(`./images/${imageName}.jpg`)) {
        res.status(404);
        return res.send('The images does not exist!');
    }
    // Caching - if image with same width,height exist
    if (fs_1.default.existsSync(`./images/cache/${imageName}-${width}-${height}.png`)) {
        return res.sendFile(`${path_1.default.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`);
    }
    else {
        //Else call proccesImage() that processes new image with width,height entered
        yield (0, utilities_1.default)(width, height, imageName);
        // Since .sendFile only takes absolute path, used path resolve
        // to get absolute path of root folder
        res.sendFile(`${path_1.default.resolve('./')}/images/cache/${imageName}-${width}-${height}.png`);
    }
}));
exports.default = process;
