module.exports.isSameDay = function(date1, date2){
    return date1.toDateString() === date2.toDateString();
}

module.exports.getBeginOfDay = function(date){
    var newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    console.log('New date: ' + newDate.getTime());
    return newDate.getTime();
}

module.exports.getBeginOfNextDay = function(date){
    var newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1));
    console.log('New next date: ' + newDate.getTime());
    return newDate.getTime();
}

module.exports.toDate = function (val) {
    if (!val) return val;
    var month = (val.getMonth() + 1);
    month = month < 10? '0' + month: month;
    var day = val.getDate();
    day = day < 10? '0' + day: day;
    return val.getFullYear() + "-" + month + "-" + day;
}