function n(value) {
  return Number(value) || 0;
}

function netujTarifu(preuzeto, isporuceno, visakPrethodno) {
  const raspolozivo = isporuceno + visakPrethodno;

  return {
    utroseno: Math.max(0, preuzeto - raspolozivo),
    visakSledeci: Math.max(0, raspolozivo - preuzeto),
  };
}

/**
 * Neto merenje po EPS modelu: VT i NT se netiraju odvojeno i višak
 * iz jedne tarife se ne preliva u drugu.
 *
 * @param {object} input
 * @param {number} input.preuzetoVT
 * @param {number} input.preuzetoNT
 * @param {number} input.isporucenoVT
 * @param {number} input.isporucenoNT
 * @param {number} [input.visakPrethodnoVT]
 * @param {number} [input.visakPrethodnoNT]
 */
export function netUtrosak(input) {
  const vt = netujTarifu(n(input.preuzetoVT), n(input.isporucenoVT), n(input.visakPrethodnoVT));
  const nt = netujTarifu(n(input.preuzetoNT), n(input.isporucenoNT), n(input.visakPrethodnoNT));

  return {
    utrosenoVT: vt.utroseno,
    utrosenoNT: nt.utroseno,
    visakSledeciVT: vt.visakSledeci,
    visakSledeciNT: nt.visakSledeci,
  };
}
