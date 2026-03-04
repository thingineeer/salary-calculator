export function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

export function parseFormattedNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

/**
 * 콤마 포맷팅 후 커서 위치를 올바르게 계산합니다.
 * 포맷 전 커서 앞의 숫자 개수를 세고, 포맷 후 같은 개수의 숫자가 나오는 위치를 찾습니다.
 */
export function getAdjustedCursorPosition(
  oldValue: string,
  newValue: string,
  oldCursorPos: number
): number {
  const digitsBeforeCursor = oldValue
    .slice(0, oldCursorPos)
    .replace(/[^0-9]/g, '').length;

  let digitCount = 0;
  for (let i = 0; i < newValue.length; i++) {
    if (/[0-9]/.test(newValue[i])) {
      digitCount++;
    }
    if (digitCount === digitsBeforeCursor) {
      return i + 1;
    }
  }
  return newValue.length;
}
