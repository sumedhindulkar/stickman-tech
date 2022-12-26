const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream("output.pdf"));
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

doc.fontSize(8);
doc.text(`This text is left aligned. ${lorem}`, {
  width: 410,
  align: "left",
});

doc.moveDown();
doc.text(`This text is centered. ${lorem}`, {
  width: 410,
  align: "center",
});

doc.moveDown();
doc.text(`This text is right aligned. ${lorem}`, {
  width: 410,
  align: "right",
});

doc.moveDown();
doc.text(`This text is justified. ${lorem}`, {
  width: 410,
  align: "justify",
});

// Add an image, constrain it to a given size, and center it vertically and horizontally
// doc.image("path/to/image.png", {
//   fit: [250, 300],
//   align: "center",
//   valign: "center",
// });

// Add another page
doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

// Draw a triangle
doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
  .fill("red", "even-odd")
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor("blue")
  .text("Here is a link!", 100, 100)
  .underline(100, 100, 160, 27, { color: "#0000FF" })
  .link(100, 100, 160, 27, "http://google.com/");

// Finalize PDF file
doc.end();
