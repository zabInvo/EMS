const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require("./swagger").swaggerOptions;

const port = 3000;
app.use(bodyParser.json());

// CONFIG FOR FILE UPLOADING
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const checkFileType = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: checkFileType,
});

app.use("/uploads", express.static("uploads"));

// ROUTE FOR  BULLBOARD UI FOR QUEUES
app.use("/admin/queues", require("bull-board").router);

// ROUTE FOR  SWAGGER API DOCS 
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("You land on a wrong planet, no one lives here.");
});

// ROUTES FOR ADMIN
app.use("/api/admin", require("./routes/admin"));
// ROUTES FOR COMPANY
app.use("/api/company", require("./routes/company"));
// ROUTES FOR EMPLOYEE
app.use("/api/employee", require("./routes/employee"));
// ROUTES FOR SALARY
app.use("/api/salary", require("./routes/salary"));
// ROUTE FOR ATTENDANCE
app.use("/api/attendance", require("./routes/attendance"));
// ROUTE FOR REDIS EMAIL QUEUE
app.use("/api/sendEmail", require("./queues/index"));

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

module.exports = app;