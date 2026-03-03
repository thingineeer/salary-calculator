export function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

export function parseFormattedNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}
