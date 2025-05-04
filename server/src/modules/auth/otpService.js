// services/otpService.js
const { Op } = require("sequelize");
const Verification = require("./Verification");
const smsService = require("../sms/service"); // আপনার SMS পাঠানোর হেল্পার

const otpService = {
  async sendCode(phone) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingCount = await Verification.count({
      where: { phone, createdAt: { [Op.gt]: oneHourAgo } }
    });
    // if (existingCount >= 5) throw new Error("Too many OTP requests. Try after 1 hour");

    // const last = await Verification.findOne({ where: { phone }, order: [["createdAt", "DESC"]] });
    // if (last && new Date() - last.createdAt < 60000) {
    //   throw new Error("Please wait 1 minute before requesting another code.");
    // }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Verification.create({ phone, code, expiresAt });

    const message = `Your verification code is: ${code}`;
    const otpmessage =  await smsService.sendBulkSMS(phone, message); // implement this if not yet

    return { message: "OTP sent successfully", data: otpmessage };
  },

  async verifyCode(phone, code) {
    const record = await Verification.findOne({
      where: { phone, isVerified: false },
      order: [["createdAt", "DESC"]],
    });

    if (!record) throw new Error("No active code. Request again.");
    if (new Date() > record.expiresAt) throw new Error("Code expired.");
    if (record.attempts >= 3) throw new Error("Too many failed attempts.");

    if (record.code !== code) {
      record.attempts += 1;
      await record.save();
      throw new Error("Invalid code.");
    }

    record.isVerified = true;
    await record.save();
    return true;
  }
};

module.exports = otpService;
