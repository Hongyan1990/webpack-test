var webpackHotMiddleware = require('webpack-hot-middleware');

function middleware(doIt, req, res) {
    var originalEnd = res.end;
    return (done) => {
        res.end = function() {
            originalEnd.apply(this, arguments);
            done(null, 0);
        };
        doIt(req, res, () => {
            done(null, 1);
        });
    };
}

module.exports = (compiler, option) => {
    var action = webpackHotMiddleware(compiler, option);
    return function* (next) {
    	const ctx = this;
        var nextStep = yield middleware(action, ctx.req,  ctx.res);
        if (nextStep && next) {
            next();
        }
    };
};