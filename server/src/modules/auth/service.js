const otpService = require("./otpService"); // adjust path
const UserToken = require("../user/UserToken");
const User = require("../user/model");
const { generateToken } = require("../../utils/jwt");

const authService = {
  async sendLoginOTP(req) {
    const { phone } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user) throw new Error("User not found");

    return await otpService.sendCode(phone);
  },

  async verifyLoginOTP(req) {
    const { phone, code } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user) throw new Error("User not found");

    await otpService.verifyCode(phone, code);

    const payload = {
      user_id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = generateToken(payload);

    await UserToken.create({
      user_id: user.id,
      token,
      login_time: new Date(),
      ip_address: req.ip,
      device_info: req.headers['user-agent'],
    });

    return {
      token,
      user_id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  },

  async logout(token) {
    if (!token) return false;
    await UserToken.destroy({ where: { token } });
    return true;
  }
};

module.exports = authService;
