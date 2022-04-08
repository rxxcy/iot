import { customAlphabet } from 'nanoid';

export const uuid = (length = 7): string => {
  const nanoid = customAlphabet(
    '1234567890wertuioasdfhklzxcvbnmWERTUI',
    length,
  );
  return nanoid().toLocaleLowerCase();
};
