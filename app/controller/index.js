/**
 * Created by shumin on 16-11-3.
 */

import * as Services from '../service'
import values from '../datas/index/data.json'
import info_type from '../datas/dict/info-types.json'

const index = async(ctx, next) => {
    // 获取菜单列表
    let menus = await Services.IndustryService.query();
    // 获取城市列表
    let cities = await Services.CityService.query();
    // 获取站点
    let sites = await Services.SiteService.query();
    // 处理域名，获取站点信息
    let _site_sd = ctx.subdomains && ctx.subdomains[0];
    // 解析参数，没有的话，要查询默认站点的数据
    const _params = ctx.params;
    let _site_id = '';
    if (_site_sd !== 'www') {
        _site_sd = _site_sd;
    } else {
        _site_sd = 'nj'
    }
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].subDomain === _site_sd) {
            _site_id = sites[i].id;
            break;
        }
    }
    if (!_site_id) _site_id = sites[0].id;
    let _siteData = await Services.SiteService.query(_site_id);
    // 获取当前站点的推荐信息
    let _advs = await Services.InfoService.advertises(ctx.site.id);
    // 置顶信息
    // 优选信息
    // 腾铺优选
    let _tengpu_best = values.tengpu_best;
    // 一周快转
    let _week_quaichuan = values.week_quaichuan;
    // 最新成交
    let _newest_trade = values.newest_trade;
    // 租售推荐
    let _rent_sale = values.sale_rent;
    // 个人发布
    let _per_pub = values.per_pub;
    // 渲染index.html
    ctx.state = {
        menus: menus,
        site: ctx.site,
        sites: ctx.sites,
        advs: _advs,
        info_type: info_type
    };
    const start = new Date();
    await ctx.render('index');
    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Render-Time', delta + 'ms')
};

export default {index}