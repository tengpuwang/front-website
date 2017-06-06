import _request from 'request'
import log4js from 'koa-log4'

const logger = log4js.getLogger('request');

const request = async(options) => {
    let promise = new Promise(function (resolve, reject) {
        _request(options, (error, response, body) => {
            if (error) {
                // 异步操作失败
                logger.error(`request error: ${error}`);
                reject(error);
            } else {
                resolve(response);
            }
        })
    });
    return promise;
};

export default request;