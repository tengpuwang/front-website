/**
 * Created by shumin on 16-10-26.
 */

import _ from "underscore";
import * as Services from "../service";

import attorn_values from '../datas/search/attorn.json'
import sell_values from '../datas/search/sell.json'
import seek_values from '../datas/search/seek.json'

import store_types from '../datas/dict/store-types.json'
import query_string from '../datas/query.json'

import moment from 'moment'

const index = async(ctx, next) => {
    // URL参数
    const params = ctx.params;
    const subject = params.subject;
    let _query = {sort: {"createdAt": -1}, page: {"index": 1, "size": 20}};
    // 获取站点
    let sites = await Services.SiteService.query();
    // 解析参数，没有的话，要查询默认站点的数据
		let _site_sd = ctx.subdomains && ctx.subdomains[0];
		// 解析参数，没有的话，要查询默认站点的数据
		const _params = ctx.params;
		let _site_id = '';
		if (_site_sd !== 'www') {
			_site_sd = _site_sd;
		} else {
			_site_sd = 'nj'
		}
		for(let i = 0; i < sites.length; i++) {
			if(sites[i].subDomain === _site_sd) {
				_site_id = sites[i].id;
				break;
			}
		}
		if(!_site_id) _site_id = sites[0].id;
    // 获取站点数据
    let _site_data = await Services.SiteService.query(_site_id);
    if (!_.isEmpty(ctx.query)) {
        if (ctx.query && ctx.query.q) {
            const query_params = JSON.parse(ctx.query.q);
            _query = _.extend(_query, query_params);
            // 处理分页查询
            let _pageNo = ctx.query.pageNo;
            if (_pageNo) _query.page.index = _pageNo;
        }
    }
    if (!_query.query) _query.query = {};
    // 行业分类
    let industries = await Services.IndustryService.query();

    // 店铺分类
    let _estate_types = await Services.IndustryService.query_estate_type();
    let view = "";
    let path = ctx.path;
    let _values = {};

    switch (subject) {
        // 商铺转让
        case "attorn": {
            // TODO
            view = "search-attorn";
            _values = attorn_values;
            _query.query.infoType = 'Attorn';  // 设定查询 info type
            break;
        }
        // 商铺租售
        case "sell": {
            // TODO
            view = "search-sell";
            _values = sell_values;
            _query.query.infoType = _query.query.infoType || 'Sell';  // 设定查询 info type
            break;
        }
        // 求租求售
        case "seek": {
            // TODO
            view = "search-seek";
            _values = seek_values;
            _query.query.infoType = _query.query.infoType || 'SeekLease';  // 设定查询 info type
            break;
        }
    }

    // 处理查询json
    _query.query.site = _site_id;  // 设定查询 站点id
    // 处理搜索内容查询
    let _title = ctx.query.title;
    console.log('处理搜索内容查询 :', _title);
    if (_title) _query.query.title = _title;
    // 处理行业url参数
    let _category = ctx.query.category;
    if (_category) {
        let _cate = _query.query.category;
        if (!_cate) _query.query.category = {'$in': []};
        _query.query.category['$in'].push(_category);
    }

    const now = moment().format("YYYY-MM-DD");

    // 查询所有列表
    let _reponse_data = await Services.InfoService.search(_query);
    ctx.state = {
        q: {query: _query.query, sort: _query.sort, page: _query.page},
        // 当前页面路径
        path: path,
        // 当前城市信息
        sites: sites,
        site_id: _site_id,
        industries: industries,
        store_types: store_types,
        // 当前站点信息
        site_data: _site_data,
        // 您已选择
        choosen: _values && _values.choosen && _values.choosen.list,
        // 搜索结果List(假数据)
        result_list: _values && _values.result_list && _values.result_list.list,
        // 搜索结果结合(真数据)
        result_collection: _reponse_data,
        now: now
    };

    const start = new Date();
    await ctx.render(view);
    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Query-Time', delta + 'ms');
    ctx.state.X_Query_Time = delta;
};

export default {index}