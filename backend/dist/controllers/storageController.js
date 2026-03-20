"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageInfo = getStorageInfo;
const storageService_1 = require("../services/storageService");
const userRepository_1 = require("../repositories/userRepository");
async function getStorageInfo(req, res) {
    const userId = req.userId;
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado" });
    }
    const used = await (0, storageService_1.getUserStorageUsage)(userId);
    const limit = (0, storageService_1.getStorageLimit)(user.plan);
    res.send({
        used,
        limit,
        plan: user.plan,
    });
}
