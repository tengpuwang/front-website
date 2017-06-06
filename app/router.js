import koa_router from 'koa-router'
import log4js from 'koa-log4'


import index_controller from './controller/index'
import search_controller from './controller/search'
import details_controller from './controller/details'

const logger = log4js.getLogger('router');

const router = koa_router();

router.get('/website', async(ctx, next) => {
    const start = new Date();
    await ctx.render('website/index');
    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Render-Time', delta + 'ms')
});


// 首页
router.get('', index_controller.index);
router.get('/', index_controller.index);
router.get('/index', index_controller.index);

// 详情页
router.get('/info', details_controller.index);

// 搜索页
router.get('/info/:subject/search', search_controller.index);

// 详情页
router.get('/info/:id/details', details_controller.index);


module.exports = router;