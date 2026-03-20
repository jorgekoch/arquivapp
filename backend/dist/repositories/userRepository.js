"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.findUserByStripeCustomerId = findUserByStripeCustomerId;
exports.findUserByStripeSubscriptionId = findUserByStripeSubscriptionId;
exports.updateUserProfile = updateUserProfile;
exports.updateUserPassword = updateUserPassword;
exports.updateUserBillingData = updateUserBillingData;
exports.saveResetPasswordToken = saveResetPasswordToken;
exports.findUserByResetPasswordToken = findUserByResetPasswordToken;
exports.clearResetPasswordToken = clearResetPasswordToken;
exports.createUser = createUser;
exports.setEmailVerificationToken = setEmailVerificationToken;
exports.findUserByEmailVerificationToken = findUserByEmailVerificationToken;
exports.confirmUserEmail = confirmUserEmail;
const prisma_1 = __importDefault(require("../database/prisma"));
function findUserByEmail(email) {
    return prisma_1.default.user.findUnique({
        where: { email },
    });
}
function findUserById(id) {
    return prisma_1.default.user.findUnique({
        where: { id },
    });
}
function findUserByStripeCustomerId(stripeCustomerId) {
    return prisma_1.default.user.findFirst({
        where: { stripeCustomerId },
    });
}
function findUserByStripeSubscriptionId(stripeSubscriptionId) {
    return prisma_1.default.user.findFirst({
        where: { stripeSubscriptionId },
    });
}
function updateUserProfile(id, data) {
    return prisma_1.default.user.update({
        where: { id },
        data,
    });
}
function updateUserPassword(id, password) {
    return prisma_1.default.user.update({
        where: { id },
        data: { password },
    });
}
function updateUserBillingData(id, data) {
    return prisma_1.default.user.update({
        where: { id },
        data,
    });
}
function saveResetPasswordToken(userId, token, expiresAt) {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            resetPasswordToken: token,
            resetPasswordExpiresAt: expiresAt,
        },
    });
}
function findUserByResetPasswordToken(token) {
    return prisma_1.default.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpiresAt: {
                gt: new Date(),
            },
        },
    });
}
function clearResetPasswordToken(userId) {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            resetPasswordToken: null,
            resetPasswordExpiresAt: null,
        },
    });
}
function createUser(email, password, name) {
    return prisma_1.default.user.create({
        data: {
            email,
            password,
            name,
            emailVerified: false,
        },
    });
}
function setEmailVerificationToken(userId, token, expiresAt) {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            emailVerificationToken: token,
            emailVerificationExpiresAt: expiresAt,
            emailVerified: false,
        },
    });
}
function findUserByEmailVerificationToken(token) {
    return prisma_1.default.user.findFirst({
        where: {
            emailVerificationToken: token,
        },
    });
}
function confirmUserEmail(userId) {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            emailVerified: true,
            emailVerificationToken: null,
            emailVerificationExpiresAt: null,
        },
    });
}
