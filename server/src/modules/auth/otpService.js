// services/otpService.js
const { Op } = require("sequelize");
const Verification = require("./model");
const smsService = require("../../utils/smsService"); // আপনার SMS পাঠানোর হেল্পার

const otpService = {
  async sendCode(user) {
    const user_id = user.id;
    const phone = user.phone;

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingCount = await Verification.count({
      where: { user_id, createdAt: { [Op.gt]: oneHourAgo } },
    });

    // if (existingCount >= 5)
    //   return {
    //     success: false,
    //     message: "Too many OTP requests. Try after 1 hour",
    //   };

    // const last = await Verification.findOne({
    //   where: { user_id },
    //   order: [["createdAt", "DESC"]],
    // });
    // if (last && new Date() - last.createdAt < 60000) {
    //   return {
    //     success: false,
    //     message: "Please wait 1 minute before requesting another code.",
    //   };
    // }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Verification.create({ user_id, code, expiresAt });

    const message = `Your verification code is: ${code}`;
    return await smsService.sendBulkSMS(phone, message);
  },

  async verifyCode(user_id, code) {
    const record = await Verification.findOne({
      where: { user_id, isVerified: false },
      order: [["createdAt", "DESC"]],
    });

    if (!record) return { success: false, message: "No active code." }; //throw new Error("No active code. Request again.");
    if (new Date() > record.expiresAt)
      return { success: false, message: "Code expired." }; //throw new Error("Code expired.");
    if (record.attempts >= 3)
      return { success: false, message: "Too many failed attempts." }; //throw new Error("Too many failed attempts.");

    if (record.code !== code) {
      record.attempts += 1;
      await record.save();

      return { success: false, message: "Invalid code." }; //throw new Error("Invalid code.");
    }

    record.isVerified = true;
    await record.save();
    return { success: true, message: "Code verified successfully." };
  },
};

module.exports = otpService;
