var requireFrom = require('requirefrom');
var respond = requireFrom('libs')('send_respond');
var services = requireFrom('services');
var mealService = services('MealService');

exports.readMeal = function(req, res, next){
    var mealId = req.swagger.params.mealId.value;
    mealService.read(mealId, function(err, meals){
        respond.sendRespond(res, err, meals);
    });
}

exports.readAllMeals = function(req, res, next){
    mealService.readAll(function(err, meals){
        respond.sendRespond(res, err, meals);
    });
}

exports.create =  function(req, res, next) {
    var meal = req.swagger.params.meal.value;
    mealService.create(meal, function(err, meal) {
        respond.sendRespond(res, err, meal);
    });
};

exports.update=  function(req, res, next) {
    var meal = req.swagger.params.meal.value;
    delete meal._id;
    mealService.update(req.swagger.params.mealId.value, meal, function(err, meal) {
        respond.sendRespond(res, err, meal);
    });
};

exports.delete =  function(req, res, next) {
    mealService.remove(req.swagger.params.mealId.value, function(err, meal) {
        respond.sendRespond(res, err, meal);
    });
};