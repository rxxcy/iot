export const httpLogger = async (req: any, res: any, next: () => void) => {
  const start = Date.now();
  const { method, url } = req;
  await next();
  console.log(`[ ${method} ] Gwei ${Date.now() - start} ms -> ${url}`);
};
