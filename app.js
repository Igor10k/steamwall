var app = require('koa')();
var session = require('koa-session');
var jade = require('koa-jade');
var serve = require('koa-static');
var flash = require('koa-flash');
var router = require('./routes/router');
var config = require('./config');

app.keys = config.keys.split(',');

app.use(session(app));
app.use(flash());

app.use(jade.middleware({
	viewPath: __dirname + '/views',
	locals: {
		isProduction: app.env === 'production',
		analytics: config.analytics,
		domain: config.domain
	}
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve('public'));

app.listen(process.env.PORT || 3000);
