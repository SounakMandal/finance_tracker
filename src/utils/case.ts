export function convertToCamelCase(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function convertToTitleCase(str: string) {
  return str.replace(/\b\w/g, (word) => {
    return word.toUpperCase();
  });
}
