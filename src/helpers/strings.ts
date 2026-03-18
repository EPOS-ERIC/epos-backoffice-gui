export function formatRangeText(text: string): string {
  const split = text.split(':');
  if (split.length > 0) {
    return split[1];
  }
  return text;
}
