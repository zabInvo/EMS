const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const port = 3000;
app.use(bodyParser.json());

// CONFIG FOR FILE UPLOADING
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
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
  fileFilter : checkFileType
});

app.use('/uploads', express.static('uploads'));

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

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

module.exports = app;
