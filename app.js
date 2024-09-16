const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// import si router nya
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizersRouter = require("./app/api/v1/organizers/router");
const authCMSRouter = require("./app/api/v1/auth/router");

const v1 = "/api/v1/cms"; // khusus cms
const v2 = "/api/v1"; // khusus auth, orders & participants
// const v3 = '/api/v1/auth'; // khusus authetication

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to api semina",
  });
});

// lalu kita gunakan/use dibawah ini
app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);
app.use(v1, organizersRouter);
app.use(v1, authCMSRouter);
// app.use(v3, categoriesRouter);

app.use(notFoundMiddleware);

// const logErrors = (err, req, res, next) => {
//   console.error("Error:", err); // Log semua error
//   next(err); // Teruskan error ke error handler berikutnya
// };

// app.use(logErrors);
app.use(handleErrorMiddleware);

module.exports = app;
