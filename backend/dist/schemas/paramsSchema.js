"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderIdParamSchema = exports.idParamSchema = void 0;
const zod_1 = require("zod");
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive("Invalid id"),
});
exports.folderIdParamSchema = zod_1.z.object({
    folderId: zod_1.z.coerce.number().int().positive("Invalid folderId"),
});
