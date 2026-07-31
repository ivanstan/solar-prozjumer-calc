/** Zaokruživanje na 2 decimale (half-up), kao na EPS računu. */
export function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}
