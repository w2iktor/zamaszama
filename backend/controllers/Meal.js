var services = require('requirefrom')('services');
var mealService = services('MealService');

exports.readAllMeals = function(req, res, next){
    mealService.readAll(function(err, meals){
        sendRespond(res, err, meals);
    });
}

exports.create =  function(req, res, next) {
    var meal = req.swagger.params.meal.value;
    mealService.create(meal, function(err, meal) {
        sendRespond(res, err, meal);
    });
};

exports.update=  function(req, res, next) {
    var meal = req.swagger.params.meal.value;
    delete meal._id;
    mealService.update(req.swagger.params.mealId.value, meal, function(err, meal) {
        sendRespond(res, err, meal);
    });
};

exports.delete =  function(req, res, next) {
    mealService.remove(req.swagger.params.mealId.value, function(err, meal) {
        sendRespond(res, err, meal);
    });
};

function sendRespond(res, err, data){
    if(err){
        throw new Error(err);
    } else {
        res.set("Content-type", "application/json; charset=utf-8")
            .send(JSON.stringify(data, null, 2));
        //res.json(data);
    }
}