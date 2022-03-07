const { format } = require('timeago.js');


const  helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
};
module.exports = helpers;
// importamos el metodo format con corchetesque que pertenece a timeago 