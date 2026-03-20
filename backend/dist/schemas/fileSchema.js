"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileBodySchema = void 0;
const zod_1 = require("zod");
exports.uploadFileBodySchema = zod_1.z.object({
    folderId: zod_1.z.coerce.number().int().positive("Invalid folderId"),
});
