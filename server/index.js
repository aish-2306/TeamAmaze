const express = require("express");
const cors = require("cors");
const { questions, tags } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.get("/api/tags", (req, res) => {
  res.json(tags);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
