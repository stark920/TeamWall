export function currency(num) {
  const n = parseInt(num, 10);
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, '')
        : c
    )}`;
}

export function date(time) {
  const localDate = new Date(time);
  return localDate.toLocaleDateString();
}

export function dateTime(time) {
  const localDate = new Date(time);
  return localDate.toLocaleString();
}

export function toLocaleDate(data) {
  const date = new Date(data);
  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleString();
  }
  return '';
}

export function getPassedDay(data) {
  const date = new Date(data);
  if (date instanceof Date && !isNaN(date)) {
    const oldTime = date.getTime();
    const newTime = Date.now();
    const passedDay = ((newTime - oldTime) / (1000 * 60 * 60 * 24)).toFixed(0);
    return passedDay;
  }
  return '';
}
