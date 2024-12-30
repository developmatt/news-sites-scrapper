export const compactText = (text: string) => {
  return text.replace(/\s+/g, ' ')
    .replace(/[\r\n]+/gm, " ")
    .trim();
}