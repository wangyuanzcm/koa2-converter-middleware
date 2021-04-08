"use strict";

//将express中间件转化为koa中间件
function middleware(expressMiddleware, req, res) {
  const { end: originalEnd } = res;

  return new Promise((resolve) => {
    res.end = function end() {
      originalEnd.apply(this, arguments);
      resolve(0);
    };
    expressMiddleware(req, res, () => {
      resolve(1);
    });
  });
}

/**
 * 
 * @param {*} expressMiddleware
 * @returns koaMiddleware
 */
export default function converter(expressMiddleware) {
  return async function (ctx, next) {
    const { request } = ctx;
    ctx.webpack = expressMiddleware;
    //这里是将req和res对象改装之后作为参数传入，主要用来对齐express和koa2
    const runNext = await middleware(expressMiddleware, request, {
      end(content) {
        ctx.body = content;
      },
      locals:ctx.state,//ctx.state是官方推荐的命名空间
      setHeader() {
        ctx.set.apply(ctx, arguments);
      },
      getHeader(){
        ctx.response.get.apply(ctx,arguments);
      }
    });

    if (runNext) {
      await next();
    }
  }
};
