/*
 * description: 站点管理
 * author: 张艳明
 * date: 2017-03-15 17:11
 * */
import request from '../api/request'
import log4js from 'koa-log4'
import * as config from '../config'

const logger = log4js.getLogger('site.city');

const query = async(_id) => {
  let _options = {
    method: 'GET',
    uri: config.api.server + "/sites" + (_id ? ('/' + _id) : ''),
    headers: {
      'User-Agent': 'node::request' 
    }
  };
  console.log('api url :', config.api.server + "/sites" + (_id ? ('/' + _id) : ''));
  let _response = await request(_options);
  let _sites = JSON.parse(_response.body);
  return _sites;
};

export default {
  query
}
