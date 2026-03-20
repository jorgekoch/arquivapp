"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSupportMessage = sendSupportMessage;
const supportService_1 = require("../services/supportService");
async function sendSupportMessage(req, res, next) {
    try {
        const userId = req.userId;
        const { message } = req.body;
        await (0, supportService_1.sendSupportMessageService)(userId, message);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
