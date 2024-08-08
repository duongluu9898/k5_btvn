const express = require("express");
const port = 3000;
const app = express();

// const authMiddleware = require("./middlewares/auth.middleware");
const webRouter = require("./routes/web");
// const homeRouter = require("./routes/home");
// const authRouter = require("./routes/auth");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const dotenv = require("dotenv");
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
app.set("view engine", "ejs");
// set engine
app.set("views", __dirname + "/views");
// setup đường dẫn folder chứa views
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// dang urlencode
app.use(express.json());
// dang json

// app.use(authRouter);
// app.use(authMiddleware);
// app.use(homeRouter);
app.use(webRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
