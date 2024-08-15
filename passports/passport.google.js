const { Provider, User } = require("../models/index");
const { CLIENT_ID, CLIENT_SECRET } = process.env;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = new GoogleStrategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const {
      displayName: name,
      emails: [{ value: email }],
    } = profile;
    console.log(name, email);

    const [provider] = await Provider.findOrCreate({
      where: { name: "google" },
      defaults: {
        name: "google",
      },
    });
    const [user] = await User.findOrCreate({
      where: { email, provider_id: provider.id },
      defaults: {
        name,
        email,
        status: true,
        provider_id: provider.id,
      },
    });
    done(null, user);
  }
);
