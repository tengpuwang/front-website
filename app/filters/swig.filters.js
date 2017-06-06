/**
 * Created by shumin on 16-11-23.
 */

const json = (input) => {
    return JSON.stringify(input);
};

const watermark = (input) => {
    const watermark = '?imageMogr2/auto-orient/blur/1x0/quality/75|watermark/1/image/aHR0cDovL29uNWx1ZHNxai5ia3QuY2xvdWRkbi5jb20vd2F0ZXJtYXJrLTAxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim';
    return input + watermark;
};

const infoType = (input) => {
    switch (input) {
        case "Attorn":
            return "转让";
            break;
        case "Lease":
            return "出租";
            break;
        case "Sell":
            return "出售";
            break;
        case "Invite":
            return "招商";
            break;
        case "SeekLease":
            return "求租";
            break;
        case "SeekSell":
            return "求售";
            break;
        case "Other":
            return "其他";
            break;
    }
};

/**
 * 搜索列表页生成url
 * @param input
 * @param flag
 * @param q
 */
const url = (input, flag, q) => {
    switch (flag) {
        case 'query': {

        }
        case 'sort': {

        }
        case 'page': {

        }
    }
};

/**
 * 生成script标签，添加到html中
 * @param input
 * @return string
 * @author zhangyanming
 * */
const script = (input, varname) => {
    let _string = '<script> var ' + varname + '= ' + JSON.stringify(input) + ';</script>';
    return _string;
};

/**
 * 获取制定数组
 * @param _index 制定位置，从0开始
 * @param _num 数量，默认是1
 * @return Array
 * @author zhangyanming
 * */
const arrty_get = (input, _index, _num) => {
    let _retArray = [];
    _num = _num || 1;
    for (let i = 0; i < _num; i++) {
        let _target = _index + i;
        if (_target >= input.length) break;
        let _obj = input[_target];
        _retArray.push(_obj);
    }
    return _retArray;
};

export {json, infoType, script, arrty_get, watermark}