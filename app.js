const express = require("express");
const multer = require("multer");

const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 8081;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "./public/data/uploads"),
  filename: (req, file, callback) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e5) + file.originalname;
    callback(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.post("/upload/", upload.single("file"), (req, res) =>
  res.json({
    status: "true",
    message: "Image uploaded successfully!",
    image: req.file.filename,
  })
);

app.use(
  "/image/",
  express.static(path.join(__dirname, "/public/data/uploads"))
);

app.get("/", (req, res) =>
  res.json({ status: "true", author: "Atanu Debnath", about: "Image Server" })
);

app.listen(PORT, () => console.log(`Running on http://127.0.0.1:${PORT}`));
