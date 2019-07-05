const express = require("express");
const path = require("path");
const gameRoutes = require("./routes/game");
const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(
    "Servers is listening at http://localhost:3000/ Let's play a game!"
  );
});

app.use(express.static(path.join(__dirname, "public")));

gameRoutes(app);
