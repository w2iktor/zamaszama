var path = require("path"),
    config = require("./config.json"),
    User = require(path.join(__dirname, "models", "User.js"));
var config 			= require('./libs/config');

var args = process.argv.slice(2);

var login = args[0];
var password = args[1];
var role = args[2] || 'ADMIN';
var name = args[3] || login;
var email = args[4] || "test@gmail.com";

if (args.length < 2) {
    console.log("usage: node %s %s %s", path.basename(process.argv[1]), "user", "password");
    process.exit();
}

console.log("Username: %s", login);
console.log("Password: %s", password);
console.log("Name: %s", name);
console.log("E-mail: %s", email);

console.log("Creating a new user in Mongo");


var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(config.get('mongoose:uri'));
mongoose.connection.on('error', function () {
    console.log('Mongoose connection error', arguments);
});
mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");

    var user = new User();

    user.login = login;
    user.password = password;
    user.name = name;
    user.email = email;
    user.role = role;

    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
        }
        process.exit();
    });

});