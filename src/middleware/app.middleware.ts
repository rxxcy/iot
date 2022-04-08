export const logger = (request, res, next) => {
  const start = Date.now();
  const { method, url } = request;
  next();
  console.log(`[ ${method} ] Gwei ${start - Date.now()} ms -> ${url}`);
};
