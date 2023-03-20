export const kebabToCamel = (str: string): string =>
  str.replace(/-./g, m => m.toUpperCase()[1]);

export const camelToKebab = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
