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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('gets main endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main');
        // 200 is http code for OK
        expect(response.status).toEqual(200);
    }));
    it('gets process endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        // 200 is http code for OK
        const response = yield request.get('/main/process?height=400&width=300&imageName=fjord');
        expect(response.status).toEqual(200);
    }));
});
describe('Height, Width, fileName  responses', () => {
    it('gets success if height and width and imageName are valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?height=400&width=300&imageName=fjord');
        expect(response.status).toEqual(200);
    }));
    it('gets error if height is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?width=300&imageName=fjord');
        expect(response.status).not.toEqual(200);
    }));
    it('gets error if width is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?height=300&imageName=fjord');
        expect(response.status).not.toEqual(200);
    }));
    it('gets error if imageName is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?height=300&width=300&imageName=helloWorld');
        expect(response.status).toEqual(404);
    }));
    it('gets error if height is negative number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?height=-200&width=300&imageName=fjord');
        expect(response.status).toEqual(400);
    }));
    it('gets error if width is negative number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/main/process?height=200&width=-300&imageName=fjord');
        expect(response.status).toEqual(400);
    }));
});
