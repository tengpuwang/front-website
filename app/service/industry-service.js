/**
 * Created by shumin on 16-10-26.
 */

import log4js from 'koa-log4'
import industries from '../datas/dict/industries.json'
import eastate_types from '../datas/dict/estate-types.json'

const logger = log4js.getLogger('service.menu');

/**
 * 查询分类列表
 * @returns {*}
 */
const query = async() => {
    return industries;
};
/**
 * 查询商铺类型
 * @return Array []
 * */
const query_estate_type = async() => {
	return  eastate_types;
};

export default {
	query,
	query_estate_type
}