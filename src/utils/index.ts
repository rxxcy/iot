import { customAlphabet } from 'nanoid';
import { MD5 } from './md5';
import { Sha1 } from './sha1';

export const sha1 = (x: string) => {
  return new Sha1(x).hex_sha1();
};

export const md5 = (x: string) => {
  return new MD5().hex_md5(x);
};

export const encodePassword = (x: string) => {
  const md55 = md5(x);
  return sha1(md55);
};

export const time = () => Date.parse(new Date().toString()) / 1000;

export const uuid = (length = 9): string => {
  const nanoid = customAlphabet('123567890abcdef', length);
  return nanoid().toLocaleLowerCase();
};

export const createTerminalKey = () => {
  const id = uuid();
  return md5(id).substring(7, 23);
};
