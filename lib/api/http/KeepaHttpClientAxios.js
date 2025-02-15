"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeepaHttpClientAxios = void 0;
function createKeepaHttpClientAxios({ userAgent, }) {
    const getAxios = () => __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield Promise.resolve().then(() => __importStar(require('axios')))).default;
        }
        catch (error) {
            throw new Error('axios is not available. Please install axios if using Node.js.');
        }
    });
    return ({ method, url, data, timeout, }) => __awaiter(this, void 0, void 0, function* () {
        const axios = yield getAxios();
        try {
            const response = yield axios({
                method,
                url,
                headers: Object.assign({ 'User-Agent': userAgent, 'Accept-Encoding': 'gzip' }, (method === 'post' ? { 'Content-Type': 'application/json' } : {})),
                data,
                timeout,
                decompress: true,
            });
            return { status: response.status, payload: response.data };
        }
        catch (error) {
            if (error instanceof axios.AxiosError) {
                if (error.response && 'tokensLeft' in error.response.data) {
                    return {
                        status: error.response.status,
                        payload: error.response.data,
                    };
                }
            }
            throw error;
        }
    });
}
exports.createKeepaHttpClientAxios = createKeepaHttpClientAxios;
