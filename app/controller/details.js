/**
 * Created by shumin on 16-12-10.
 */

import * as Services from '../service'

import infos from "../datas/infos.json"
import values from "../datas/index/detail.json"

import moment from 'moment'

const index = async(ctx, next) => {

    let info_id = ctx.params.id;
    //TODO
    // let info = Services.CityService.query({"_id": info_id});
    // let info = Services.CityService.query({"_id": info_id});

    let info = await Services.InfoService.detail(info_id);
    console.log('infoSource :', info.infoSource);
    let view = (info && info.infoSource === "TENGPU") ? "info-details" : "info-details-personal";
    // 交通设施
    let _bs = values.bus_station;
    // 猜你喜欢
    let _yb = values.you_best;

    const now = moment().format("YYYY-MM-DD");
    ctx.state = {
        // 当前转让信息
        info: info,
        bus_station: _bs,
        you_best: _yb,
        now: now
    };

    const start = new Date();
    await ctx.render(view);
    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Query-Time', delta + 'ms');
    ctx.state.X_Query_Time = delta;
};

export default {index}