/**
 * Created by shumin on 16-10-26.
 */

import request from '../api/request'

import log4js from 'koa-log4'
import * as config from '../config'

const logger = log4js.getLogger('service.city');


const query = async() => {
    let options = {
        method: 'GET',
        uri: config.api.server + "/cities",
        headers: {
            'User-Agent': 'node::request'
        }
    };
    let response = await request(options);
    let cities = response.statusCode === 200 ? JSON.parse(response.body) : [];
    return cities;
};

export default {
    query
}