const co = require('co');
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/expedia/:city', co.wrap(function* (ctx, next) {
  const city = ctx.params.city;
}));

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
