export const logger = async (request, res, next) => {
  const start = Date.now();
  const { method, url } = request;
  await next();
  console.log(`[ ${method} ] Gwei ${start - Date.now()} ms -> ${url}`);
};
