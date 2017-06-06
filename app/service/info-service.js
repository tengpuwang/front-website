/**
 * Created by shumin on 16-12-22.
 */

import request from '../api/request'

import log4js from 'koa-log4'
import * as config from '../config'

import cities from '../datas/cities.json'

import query from '../datas/query.json'

const logger = log4js.getLogger('info-service');

/**
 * 查询信息
 * @param query 查询条件
 * @param sort  排序规则
 * @param page  分页信息
 */
const search = async(query, sort, page) => {
    let options = {
        method: 'GET',
        uri: encodeURI(config.api.server + "/infos?q=" + JSON.stringify(query)),
        headers: {
            'User-Agent': 'node::request'
        }
    };
    logger.info('query info url :', options.uri);
    let response = await request(options);
    logger.info('reponse status :', response.statusCode);
    // logger.info('reponse body :', response);
    let infos = response.statusCode === 200 ? JSON.parse(response.body) : {};
    return infos;
};
/**
 * 查询某个信息
 * @params _id 信息id
 * @return object 信息对象
 * @author zhangyanming
 * @date 2017-03-28
 * */
const detail = async(_id) => {
    let _options = {
        method: 'GET',
        uri: config.api.server + '/infos/' + _id,
        headers: {
            'User-Agent': 'node::request'
        }
    }
    console.log('api url :', config.api.server + '/infos/' + _id);
    let _res = await request(_options);
    console.log('api response code :', _res.statusCode);
    let _data = JSON.parse(_res.body || '');
    return _data;
};
/* 查询主页所有广告信息 */
const advertises = async(_id) => {
    let _options = {
        method: 'GET',
        uri: config.api.server + '/index?site_id=' + _id,
        headers: {
            'User-Agent': 'node::request'
        }
    };
    console.log('api url :', config.api.server + '/index?site_id=' + _id);
    let _response = await request(_options);
    let _data = JSON.parse(_response.body);
    // let _data = _response.body;
    return _data;
};

export default {
    detail,
    search,
    advertises
}