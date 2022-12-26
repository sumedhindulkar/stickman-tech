var express = require("express");
var PORT = 8000 || process.env.PORT;
var app = express();
var bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/convert-to-pdf", (req, res) => {
  let phoneNumbers = req.body.phoneNumber;
  let urls = [];
  try {
    for (let x of phoneNumbers) {
      if (x === "") {
        continue;
      }
      let id = uuidv4();
      const doc = new PDFDocument();

      doc.pipe(fs.createWriteStream(`${id}.pdf`));

      doc.fontSize(16);
      doc.text(`Name: ${req.body.fname}`, {
        width: 410,
      });

      doc.moveDown();
      doc.text(`Phone Number: ${x}`, {
        width: 410,
      });
      doc.end();

      urls.push(`${__dirname}\\${id}.pdf`);
    }

    res.json({
      msg: "PDF Created successfully",
      phoneNumber: phoneNumbers,
      path: urls,
    });
  } catch (err) {
    res.json({
      msg: "ERROR",
    });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`App started on PORT: ${PORT}`);
});
