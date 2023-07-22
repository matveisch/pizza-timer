export function formatNumber(number: number) {
  return `0${number}`.slice(-2);
}

export function getRemaining(time: number) {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}
