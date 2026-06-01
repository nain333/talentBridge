import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import homeRoutes from "./routes/home.routes.js";
import jobRoutes from "./routes/job.routes.js";

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
  }),
);
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.session.recruiterId;
  res.locals.recruiterId = req.session.recruiterId;

  next();
});
// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
// routes
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/", jobRoutes);

export default app;
