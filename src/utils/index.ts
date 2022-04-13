import { md5 } from './md5';
import { sha1 } from './sha1';

export const encodePassword = (x: string) => {
  const md55 = md5(x);
  return sha1(md55);
};

export const time = () => Date.parse(new Date().toString()) / 1000;
