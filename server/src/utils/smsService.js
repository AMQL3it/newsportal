const axios = require("axios");
require("dotenv").config();

const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_SENDER_ID = process.env.SMS_SENDER_ID;

const smsService = {
  // One to Many
  async sendBulkSMS(numberList, message) {
    // console.log(numberList, typeof numberList, message);

    try {
      // const response = await axios.post("http://bulksmsbd.net/api/smsapi", {
      //   api_key: SMS_API_KEY,
      //   senderid: SMS_SENDER_ID,
      //   number: numberList, //.join(","), // string of comma separated numbers
      //   message: message,
      // });

      console.log(message);
      return {
        success: true,
        message: "SMS sent successfully",
      };

      // return response.data;
    } catch (error) {
      console.error("Error sending bulk SMS:", error.message);
      throw new Error("Bulk SMS sending failed");
    }
  },

  // Many to Many
  async sendMultipleSMS(messageList) {
    try {
      const response = await axios.post("http://bulksmsbd.net/api/smsapimany", {
        api_key: SMS_API_KEY,
        senderid: SMS_SENDER_ID,
        messages: messageList, // array of {to, message}
      });

      return response.data;
    } catch (error) {
      console.error("Error sending many-to-many SMS:", error.message);
      throw new Error("Many-to-many SMS sending failed");
    }
  },
};

module.exports = smsService;
