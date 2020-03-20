const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.js');

const app = express();

const compiler = webpack(config);

app.use(webpackMiddleware(compiler));
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static('.'))
app.listen(3000, () => {
	console.log('webpack server 开启了')
})