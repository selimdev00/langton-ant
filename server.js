const express = require("express");
const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));
