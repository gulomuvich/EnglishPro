import uz from '../locales/uz.json';
import en from '../locales/en.json';

const dictionaries = { uz, en };

export function translate(keyPath, lang = 'uz') {
  const dict = dictionaries[lang] || dictionaries.uz;
  const keys = keyPath.split('.');
  let current = dict;

  for (const k of keys) {
    if (current && current[k] !== undefined) {
      current = current[k];
    } else {
      // fallback to uzbek or the key itself
      return keyPath;
    }
  }

  return current;
}
