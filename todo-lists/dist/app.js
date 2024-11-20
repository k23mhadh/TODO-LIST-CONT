"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = void 0;
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const cors_1 = __importDefault(require("@fastify/cors"));
const options = {};
exports.options = options;
const app = async (fastify, opts) => {
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'plugins'),
        options: opts
    });
    void fastify.register(cors_1.default, {
        origin: ['http://localhost:3006'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type'],
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'routes'),
        options: opts
    });
    void fastify.register(swagger_ui_1.default, {
        routePrefix: "/api-docs",
    });
};
exports.app = app;
exports.default = app;
//# sourceMappingURL=app.js.map