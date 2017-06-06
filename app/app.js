import path from 'path'

import koa from 'koa'
import log4js from 'koa-log4'
import onerror from 'koa-onerror'
import render from 'koa-swig';
// import views from 'koa-views'

import bodyparser from 'koa-bodyparser'

import static_serve from 'koa-static'
import static_cache from 'koa-static-cache'

import json from 'koa-json'
import co from 'co'

import router from './router'

import * as filters from './filters/swig.filters'

const app = new koa();
const logger = log4js.getLogger('app');

import * as Services from './service'

import moment from 'moment'

// handle error
onerror(app);

// middlewares   配置中间件
app.use(log4js.koaLogger(log4js.getLogger('http'), {level: 'auto'}));

app.use(bodyparser());
app.use(json());

// 静态资源
// app.use(serve(path.join(__dirname, '../assets')));
app.use(static_cache(path.join(__dirname, '../assets'), {
    maxAge: 365 * 24 * 60 * 60
}));

// setup view
// use koa-views
// app.use(views(path.join(__dirname, '../views'), {map: {html: 'swig'}}))

// use koa-swig
app.context.render = co.wrap(render({
    root: path.join(__dirname, '../views'),
    filters: filters,
    autoescape: true,
    tzOffset: 8,
    cache: 'memory', // disable, set to false
    encoding: 'utf8',
    ext: 'html'
}));

// x-response-time  响应时间
// logger 日志记录
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const delta = Math.ceil(Date.now() - start);
    // 响应时间
    ctx.set('X-Response-Time', delta + 'ms');
    ctx.state.X_Response_Time = delta;

    // console.log(ctx.state);

    logger.info(`${ctx.method} ${ctx.url} - ${delta}ms`)
});

// 二级域名处理
app.use(async(ctx, next) => {
    // 站点列表
    const sites = await Services.SiteService.query();

    let subdomain = ctx.subdomains && ctx.subdomains[0];
    //noinspection JSAnnotator
    if (!subdomain || subdomain == "www") {
        subdomain = "nj"
    }
    // 当前站点
    let site;
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].subDomain === subdomain) {
            site = sites[i];
            break;
        }
    }
    ctx.subdomain = subdomain;
    ctx.sites = sites;
    ctx.site = site;
    await next();
});

// 路由配置
router.get('/subdomain', (ctx, next) => {
    let subdomains = ctx.subdomains;
    logger.info('subdomains:' + JSON.stringify(subdomains));
    ctx.body = subdomains;

});
router.get('/ping', (ctx, next) => ctx.body = "I am alive!");
router.get('/hello', (ctx, next) => ctx.body = "Hello World!");
router.get('/routes', (ctx, next) => ctx.body = router);
// mount root routes
app.use(router.routes()).use(router.allowedMethods());

// 错误处理 log error  错误日志记录
app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx)
});

module.exports = app;