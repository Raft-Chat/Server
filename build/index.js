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
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const dotenv_1 = require("dotenv");
const config_1 = require("./db/config");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const cors_1 = __importDefault(require("cors"));
// Dotenv
(0, dotenv_1.config)();
// GraphQl
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect To DB
        (0, config_1.connectDB)();
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json({ limit: '500mb' }));
        const PORT = Number(process.env.PORT) || 8000;
        // Create Graphql Server
        const gqlServer = new server_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
        yield gqlServer.start();
        app.use('/api', (0, express4_1.expressMiddleware)(gqlServer));
        app.listen(PORT, () => console.log('Server is running...'));
    });
}
init();
