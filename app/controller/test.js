/**
 * Created by shumin on 16-10-26.
 */

const index = async function (ctx, next) {
    ctx.state = {
        title: 'Koa-Swig',
        body: 'Hello World!'
    };
    await ctx.render('test/index', {})
};


const people_list = async function (ctx, next) {
    let people = [
        {name: 'Paul', age: 28},
        {name: 'Jane', age: 26},
        {name: 'Jimmy', age: 45}
    ]
    const start = new Date()
    await ctx.render('test/people', {people: people, key: "Hello World!"})
    const delta = Math.ceil(Date.now() - start)
    ctx.set('X-Render-Time', delta + 'ms')
    ctx.state.X_Render_Time = delta;
};


const people_info = async function (ctx, next) {
    let people = [
        {name: 'Paul', age: 28},
        {name: 'Jane', age: 26},
        {name: 'Jimmy', age: 45}
    ];
    let index = ctx.params.id
    const start = new Date()
    await ctx.render('test/person', {person: people[index]})
    const delta = Math.ceil(Date.now() - start)
    ctx.set('X-Render-Time', delta + 'ms')
    ctx.state.X_Render_Time = delta;
};

export default {
    index, people_list, people_info
}