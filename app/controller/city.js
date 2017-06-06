/**
 * Created by shumin on 16-10-26.
 */


import city_service from '../service/city-service'


const cities = async(ctx, next) => {

    const start = new Date();

    let cities = await city_service.query();

    const delta = Math.ceil(Date.now() - start);

    ctx.set('X-Query-Time', delta + 'ms');
    ctx.state.X_Query_Time = delta;

    ctx.body = cities;
};

export default {cities}