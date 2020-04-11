var express = require("express");
var app = express();
var port = 3000;
// cookies
var cookieParser = require("cookie-parser");

app.use(cookieParser());
// middleware Auth
var middlewareAuth = require("./middleware/auth.middleware");

var useRouter = require("./routes/character.route");
var authRouter = require("./routes/auth.route");
// temple engine
app.set("view engine", "pug");
app.set("views", "./views");
// body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// db

//------------------------------------------------------------
app.get("/", function(req, res) {
    res.render("index");
});

app.use("/character", middlewareAuth.authLogin, useRouter);
app.use("/auth", authRouter);

app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});