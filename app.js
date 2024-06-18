const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const countriesRoutes = require("./routes/countriesRoutes");
const volcanoesRoutes = require("./routes/volcanoesRoutes");
const volcanoRoutes = require("./routes/volcanoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const corsMiddleware = require("./middlewares/corsMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
require("dotenv").config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(errorMiddleware);

app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDocument));

app.use("/user", userRoutes);
app.use("/countries", countriesRoutes);
app.use("/volcanoes", volcanoesRoutes);
app.use("/volcano", volcanoRoutes);
app.use("/comments", commentRoutes);

app.get("/me", (req, res) => {
  res.status(200).json({
    name: "Mahmood Anaam",
    email: "eng.mahmood.anaam@gmail.com",
  });
});

module.exports = app;


