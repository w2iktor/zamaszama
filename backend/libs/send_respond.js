module.exports.sendRespond = function(res, err, data){
    if(err){
        throw new Error(err);
    } else {
        res.set("Content-type", "application/json; charset=utf-8")
            .send(JSON.stringify(data, null, 2));
        //res.json(data);
    }
}

//function sendRespond(res, err, data){
//    if(err){
//        res.status(err.status || 500);
//        res.json({
//            message: err
//        });
//    } else {
//        res.set("Content-type", "application/json; charset=utf-8")
//            .send(JSON.stringify(data, null, 2));
//        //res.json(data);
//    }
//}