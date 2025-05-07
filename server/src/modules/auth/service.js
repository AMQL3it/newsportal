const otpService = require("./otpService"); // adjust path
const { generateToken } = require("../../utils/jwt");
const userService = require("../user/service");

const authService = {
  async sendLoginOTP(req) {
    const { identifier } = req.body; // client থেকে আসবে যেকোনো একটি
    const user = await userService.findByIdentifier(identifier);
    if (!user) throw new Error("User not found");

    return await otpService.sendCode(user);
  },

  async verifyLoginOTP(req) {
    const { phone, code } = req.body;
    const user = await userService.getByQuery({ phone });
    if (!user) throw new Error("User not found");

    await otpService.verifyCode(user.id, code);

    const payload = {
      user_id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = generateToken(payload);

    await userService.tokenCreate({
      user_id: user.id,
      token,
      login_time: new Date(),
      ip_address: req.ip,
      device_info: req.headers["user-agent"],
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

    return await userService.tokenDestroy(token);
  },
};

module.exports = authService;
