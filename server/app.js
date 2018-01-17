const express = require("express"),
      exphbs = require("express-handlebars"),
      path = require("path");

var index = require("./../routes/index.js"),
    search = require("./../routes/search");

var app = express();

/*===View Engine===*/
app.set("views", path.join(__dirname, "/../views"));
app.engine("handlebars", exphbs({
  defaultLayout: __dirname + "/../views/layouts/default.handlebars",
  layoutsDir: __dirname + "/views",
  partialDir: __dirname + "/views"
}));
app.set("view engine", "handlebars");

/*===Static===*/
app.use(express.static(path.join(__dirname, "/../public")));

/*===Routes===*/
app.use("/", index);
app.use("/search", search);

app.listen(3000, () => {
  console.log("Server up on port 3000");
});

module.exports = app;
