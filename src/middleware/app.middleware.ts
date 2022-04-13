export const logger = async (request, res, next) => {
  const start = Date.now();
  const { method, url } = request;
  await next();
  console.log(`[ ${method} ] Gwei ${Date.now() - start} ms -> ${url}`);
};
