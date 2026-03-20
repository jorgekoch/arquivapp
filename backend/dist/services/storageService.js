"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRO_STORAGE_LIMIT = exports.FREE_STORAGE_LIMIT = void 0;
exports.getUserStorageUsage = getUserStorageUsage;
exports.getStorageLimit = getStorageLimit;
const filesRepository_1 = require("../repositories/filesRepository");
exports.FREE_STORAGE_LIMIT = 500 * 1024 * 1024; // 500 MB
exports.PRO_STORAGE_LIMIT = 20 * 1024 * 1024 * 1024; // 20 GB
async function getUserStorageUsage(userId) {
    const files = await (0, filesRepository_1.getUserFiles)(userId);
    const total = files.reduce((sum, file) => {
        return sum + (file.size ?? 0);
    }, 0);
    return total;
}
function getStorageLimit(plan) {
    if (plan === "PRO") {
        return exports.PRO_STORAGE_LIMIT;
    }
    return exports.FREE_STORAGE_LIMIT;
}
