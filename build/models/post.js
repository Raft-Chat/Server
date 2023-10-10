"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: String,
    picture: String,
    email: String,
    mentions: [{
            name: String,
            avatar: String,
            _id: String
        }]
});
exports.PostModel = mongoose_1.default.model('posts', PostSchema);
