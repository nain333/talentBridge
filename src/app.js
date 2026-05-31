import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(process.env.SESSION_SECRET);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// view engine
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
// routes
app.get("/", (req, res) => {
  res.render("home/index", {
    title: "Home",
  });
});

export default app;