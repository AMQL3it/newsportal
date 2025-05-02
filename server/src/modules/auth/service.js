const bcrypt = require("bcrypt");
const UserToken = require("../user/UserToken");
const User = require("../user/model");
const { generateToken } = require("../../utils/jwt");

const authService = {
    async login(data) {
        const { email, password } = data.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            user_id: user.id,
            name: user.name,
            role: user.role,
        };

        const token = generateToken(payload);

        // Set HTTP Only Cookie
        // res.cookie(process.env.COOKIE_NAME, token, {
        //     httpOnly: true,
        //     secure: true,
        //     signed: true,
        //     maxAge: parseInt(process.env.JWT_EXPIRY) * 1000,
        //     sameSite: "lax",
        // });

        // Optional: Log the token into DB
        await UserToken.create({
            user_id: user.id,
            token,
            login_time: new Date(),
            ip_address: data.ip,
            device_info: data.headers['user-agent'],
        });

        const rdata = {
            token,
            user_id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };
        return rdata;
    },

    async logout(token) {
        // const token = data.signedCookies[process.env.COOKIE_NAME];
        if (!token) return false;
        await UserToken.destroy({ where: { token } });
        return true;
    },
};

module.exports = authService;
