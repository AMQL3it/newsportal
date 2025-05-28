const otpService = require("./otpService"); // adjust path
const { generateToken } = require("../../utils/jwt");
const userService = require("../user/service");
const bcrypt = require("bcrypt");

const authService = {
  async login(req) {
    const { identifier, password } = req.body;
    const user = await userService.findByIdentifier(identifier);

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const payload = {
      user_id: user.id,
      name: user.name,
      role: user.role?.name,
    };
    const token = generateToken(payload);

    const logEntry = await userService.tokenCreate({
      user_id: user.id,
      token,
      login_time: new Date(),
      ip_address: req.ip,
      device_info: req.headers["user-agent"],
    });

    return {
      success: true,
      message: "Login successful",
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.name,
        },
        log: logEntry,
      },
    };
  },

  async sendLoginOTP(req) {
    const { identifier } = req.body; // client থেকে আসবে যেকোনো একটি
    const user = await userService.findByIdentifier(identifier);
    if (!user) throw new Error("User not found");

    return await otpService.sendCode(user);
  },

  async verifyLoginOTP(req) {
    const { identifier, code } = req.body;
    const user = await await userService.findByIdentifier(identifier);
    if (!user) throw new Error("User not found");

    const result = await otpService.verifyCode(user.id, code);
    if (!result.success) return result;

    const payload = {
      user_id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = generateToken(payload);

    const data = await userService.tokenCreate({
      user_id: user.id,
      token,
      login_time: new Date(),
      ip_address: req.ip,
      device_info: req.headers["user-agent"],
    });

    return {
      success: true,
      token,
      message: result.message,
      data,
    };
  },

  async logout(token) {
    if (!token) return false;

    return await userService.tokenDestroy(token);
  },
};

module.exports = authService;
