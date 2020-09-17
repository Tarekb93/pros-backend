// use these functions to manipulate our database
const { findByUsername, addNewUser } = require("../models/users/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userInformation = {
  userId: 45,
  accessPrivileges: {
    user: true,
    admin: false,
  },
};
const cookieValue = JSON.stringify(userInformation);

exports.loginPage = (req, res) => {
  res.render("login", { activePage: { login: true } });
};
exports.registerPage = (req, res) => {
  res.render("register", { activePage: { register: true } });
};

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
exports.addUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    return res.render("register", { error: "Password not match" });
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.render("register", { error: err.message });
    }
    addNewUser(username, hash)
      .then(() => res.redirect("/"))
      .catch((err) => {
        res.render("register", { error: err.message });
      });
  });

  // bcrypt.compare(confirmPassword, hash, function (err, result) {
  //   result == false;
  // });
};

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  findByUsername(username)
    .then((user) => {
      bcrypt.compare(password, user.password, function (err, equals) {
        if (err) return res.render("home", { error: err.message });
        if (equals) {
          jwt.sign({ username }, process.env.JWT_SECRET, function (err, token) {
            if (err) {
              res.render("error", {
                error: err.message,
              });
            }
            console.log(token);
            res.cookie("access_token", token, { HttpOnly: true });
            console.log(token);
            res.redirect("/user/" + user.id);
          });
         } else
          res.render("home", {
            error: "Check your username/password ",
          });
      });
    })
    .catch((err) => {
      res.render("home", { error: err.message });
    });
};
exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
};
