const { Router } = require('express');

const routes = new Router();

routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

routes.get('/', (req, res) => {
    res.send({message: "netLex backend test!"});
});



module.exports = routes;