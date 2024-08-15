const express = require("express");
const port = 3000;
const app = express();

// const authMiddleware = require("./middlewares/auth.middleware");
const webRouter = require("./routes/web");
// const homeRouter = require("./routes/home");
// const authRouter = require("./routes/auth");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./passports/passport.local");
const passportGoogle = require("./passports/passport.google");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { User } = require("./models/index");
const validateMiddleware = require("./middlewares/validate.middleware");
dotenv.config();

app.use(
  session({
    secret: "f8 expressjs01",
    resave: false,
    saveUninitialized: true,
    name: "f8 session",
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);
passport.use("google", passportGoogle);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id);
  done(null, user);
});
app.set("view engine", "ejs");
// set engine
app.set("views", __dirname + "/views");
// setup đường dẫn folder chứa views
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// dang urlencode
app.use(express.json());
// dang json
app.use(cookieParser());

app.use(validateMiddleware);
// app.use(authRouter);
// app.use(authMiddleware);
// app.use(homeRouter);
app.use(webRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
