import {
  CENA_CRVENA_NT,
  CENA_CRVENA_VT,
  CENA_PLAVA_NT,
  CENA_PLAVA_VT,
  CENA_ZELENA_NT,
  CENA_ZELENA_VT,
  KWH_DNEVNO_CRVENA,
  KWH_DNEVNO_PLAVA,
} from './constants.js';
import { round2 } from './money.js';

export function zoneLimits(brojDana) {
  return {
    plava: Math.round(Number(brojDana) * KWH_DNEVNO_PLAVA),
    crvena: Math.round(Number(brojDana) * KWH_DNEVNO_CRVENA),
  };
}

/**
 * Srazmerna raspodela VT/NT po zonama (EPS model).
 * Zelena: NT se zaokružuje naniže (floor), VT dobija ostatak do praga zone.
 */
export function allocateZones(vt, nt, plavaLimit, crvenaLimit) {
  const VT = Number(vt) || 0;
  const NT = Number(nt) || 0;
  const total = VT + NT;

  const empty = {
    zelenaVT: 0,
    zelenaNT: 0,
    plavaVT: 0,
    plavaNT: 0,
    crvenaVT: 0,
    crvenaNT: 0,
  };

  if (total === 0) {
    return empty;
  }

  if (total <= plavaLimit) {
    return {
      ...empty,
      zelenaVT: VT,
      zelenaNT: NT,
    };
  }

  let zelenaNT = Math.min(NT, Math.floor((NT * plavaLimit) / total));
  let zelenaVT = Math.min(VT, plavaLimit - zelenaNT);

  // Ako VT nije dovoljan za ostatak praga, dopuni NT (do raspoloživog)
  if (zelenaVT + zelenaNT < plavaLimit && zelenaNT < NT) {
    zelenaNT = Math.min(NT, plavaLimit - zelenaVT);
  }

  const remVT = VT - zelenaVT;
  const remNT = NT - zelenaNT;

  if (total <= crvenaLimit) {
    return {
      zelenaVT,
      zelenaNT,
      plavaVT: remVT,
      plavaNT: remNT,
      crvenaVT: 0,
      crvenaNT: 0,
    };
  }

  const remTotal = remVT + remNT;
  const plavaCap = crvenaLimit - plavaLimit;

  let plavaNT = remTotal === 0 ? 0 : Math.min(remNT, Math.floor((remNT * plavaCap) / remTotal));
  let plavaVT = remTotal === 0 ? 0 : Math.min(remVT, plavaCap - plavaNT);

  if (plavaVT + plavaNT < plavaCap && plavaNT < remNT) {
    plavaNT = Math.min(remNT, plavaCap - plavaVT);
  }

  return {
    zelenaVT,
    zelenaNT,
    plavaVT,
    plavaNT,
    crvenaVT: remVT - plavaVT,
    crvenaNT: remNT - plavaNT,
  };
}

export function zoneAmounts(zones) {
  const zelenaVTIznos = zones.zelenaVT * CENA_ZELENA_VT;
  const zelenaNTIznos = zones.zelenaNT * CENA_ZELENA_NT;
  const plavaVTIznos = zones.plavaVT * CENA_PLAVA_VT;
  const plavaNTIznos = zones.plavaNT * CENA_PLAVA_NT;
  const crvenaVTIznos = zones.crvenaVT * CENA_CRVENA_VT;
  const crvenaNTIznos = zones.crvenaNT * CENA_CRVENA_NT;

  const ukupno =
    zelenaVTIznos +
    zelenaNTIznos +
    plavaVTIznos +
    plavaNTIznos +
    crvenaVTIznos +
    crvenaNTIznos;

  return {
    zelenaVTIznos: round2(zelenaVTIznos),
    zelenaNTIznos: round2(zelenaNTIznos),
    plavaVTIznos: round2(plavaVTIznos),
    plavaNTIznos: round2(plavaNTIznos),
    crvenaVTIznos: round2(crvenaVTIznos),
    crvenaNTIznos: round2(crvenaNTIznos),
    ukupno: round2(ukupno),
  };
}
