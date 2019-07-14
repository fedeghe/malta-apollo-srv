module.exports =  (_, { }, ctx, info) => {
    return ctx.store.getActors();
}
