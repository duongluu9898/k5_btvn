const DeviceDetector = require("device-detector-js");
const BotDetector = require("device-detector-js/dist/parsers/bot");
module.exports = {
  index: async (req, res) => {
    const deviceDetector = new DeviceDetector();
    const headers = req.headers;
    const userAgent = headers["user-agent"];
    const device = deviceDetector.parse(userAgent);
    const { client, os } = device;

    const name = req.session.user.name;
    const email = req.session.user.email;
    await res.render("account/account", {
      layout: "auth/layout",
      name,
      email,
      client,
      os,
    });
  },
};
