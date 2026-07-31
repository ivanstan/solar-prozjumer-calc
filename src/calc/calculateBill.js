import {
  CENA_OBRACUNSKE_SNAGE,
  CO2_KG_PO_KWH,
  NAKNADA_DS_NT,
  NAKNADA_DS_VT,
  NAKNADA_EE,
  NAKNADA_PODSTICAJ,
  POPUST_ELEKTRONSKA_DOSTAVA,
  STOPA_AKCIZE,
  STOPA_PDV,
  TAKSA_MEDIJSKI_SERVIS,
  TROSAK_GARANTOVANOG_SNABDEVACA,
  UGALJ_KG_PO_KWH,
} from './constants.js';
import { round2 } from './money.js';
import { allocateZones, zoneAmounts, zoneLimits } from './zones.js';

function n(value) {
  return Number(value) || 0;
}

/**
 * @param {object} input
 * @param {number} input.obracunskaSnaga
 * @param {number} input.brojDana
 * @param {number} input.proizvedenaElEnergija
 * @param {number} input.preuzetoVT
 * @param {number} input.preuzetoNT
 * @param {number} input.isporucenoVT
 * @param {number} input.isporucenoNT
 * @param {number} input.utrosenoVT
 * @param {number} input.utrosenoNT
 * @param {boolean} [input.elektronskaDostava]
 * @param {number} [input.popustPlacanje] – pozitivna vrednost (npr. 7% sa računa)
 * @param {boolean} [input.taksaMedijskiServis]
 * @param {number} [input.umanjenjeEUK]
 * @param {number} [input.umanjenjeEUKBezPanela]
 */
export function calculateBill(input) {
  const obracunskaSnaga = n(input.obracunskaSnaga);
  const brojDana = n(input.brojDana);
  const proizvedena = n(input.proizvedenaElEnergija);
  const preuzetoVT = n(input.preuzetoVT);
  const preuzetoNT = n(input.preuzetoNT);
  const isporucenoVT = n(input.isporucenoVT);
  const isporucenoNT = n(input.isporucenoNT);
  const utrosenoVT = n(input.utrosenoVT);
  const utrosenoNT = n(input.utrosenoNT);
  const popustPlacanje = Math.abs(n(input.popustPlacanje));
  const umanjenjeEUK = n(input.umanjenjeEUK);
  const umanjenjeEUKBezPanela = n(input.umanjenjeEUKBezPanela);

  const isporucena = isporucenoVT + isporucenoNT;
  const utrosena = utrosenoVT + utrosenoNT;
  const preuzeta = preuzetoVT + preuzetoNT;
  const preuzetaBezSolar = preuzeta + proizvedena - isporucena;
  const vtBezPanela = preuzetoVT + proizvedena - isporucena;
  const ntBezPanela = preuzetoNT;

  const { plava, crvena } = zoneLimits(brojDana);

  const obracunskaSnagaIznos = round2(obracunskaSnaga * CENA_OBRACUNSKE_SNAGE);
  const popustElektronska = input.elektronskaDostava ? POPUST_ELEKTRONSKA_DOSTAVA : 0;
  const taksa = input.taksaMedijskiServis ? TAKSA_MEDIJSKI_SERVIS : 0;

  const utrosenaZones = allocateZones(utrosenoVT, utrosenoNT, plava, crvena);
  const utrosenaIznosi = zoneAmounts(utrosenaZones);

  const preuzetaZones = allocateZones(preuzetoVT, preuzetoNT, plava, crvena);
  const preuzetaIznosi = zoneAmounts(preuzetaZones);

  const bezPanelaZones = allocateZones(vtBezPanela, ntBezPanela, plava, crvena);
  const bezPanelaIznosi = zoneAmounts(bezPanelaZones);

  const naknadaPodsticaj = round2(utrosena * NAKNADA_PODSTICAJ);
  const naknadaEE = round2(utrosena * NAKNADA_EE);
  const naknadaDS = round2(
    (preuzetoVT - utrosenoVT) * NAKNADA_DS_VT + (preuzetoNT - utrosenoNT) * NAKNADA_DS_NT,
  );

  const naknadaPodsticajBez = round2(preuzetaBezSolar * NAKNADA_PODSTICAJ);
  const naknadaEEBez = round2(preuzetaBezSolar * NAKNADA_EE);

  const osnovicaAkcize = round2(
    obracunskaSnagaIznos +
      TROSAK_GARANTOVANOG_SNABDEVACA +
      popustElektronska +
      utrosenaIznosi.ukupno -
      popustPlacanje +
      naknadaPodsticaj +
      naknadaEE +
      naknadaDS,
  );

  const osnovicaAkcizeBez = round2(
    obracunskaSnagaIznos +
      TROSAK_GARANTOVANOG_SNABDEVACA +
      popustElektronska +
      bezPanelaIznosi.ukupno -
      popustPlacanje +
      naknadaPodsticajBez +
      naknadaEEBez,
  );

  const akciza = round2(osnovicaAkcize * STOPA_AKCIZE);
  const akcizaBez = round2(osnovicaAkcizeBez * STOPA_AKCIZE);

  const osnovicaPdv = round2(osnovicaAkcize + akciza);
  const osnovicaPdvBez = round2(osnovicaAkcizeBez + akcizaBez);

  const pdv = round2(osnovicaPdv * STOPA_PDV);
  const pdvBez = round2(osnovicaPdvBez * STOPA_PDV);

  const zaduzenje = round2(osnovicaAkcize + akciza + pdv - umanjenjeEUK);
  const zaduzenjeBez = round2(osnovicaAkcizeBez + akcizaBez + pdvBez - umanjenjeEUKBezPanela);

  const ukupno = round2(zaduzenje + taksa);
  const ukupnoBez = round2(zaduzenjeBez + taksa);

  const ustedaRsd = round2(ukupnoBez - ukupno);
  const ustedaPct = ukupnoBez === 0 ? 0 : round2(100 - (ukupno / ukupnoBez) * 100);

  const direktnoPotroseno = proizvedena - isporucena;
  const direktnoPct = proizvedena === 0 ? 0 : round2((direktnoPotroseno / proizvedena) * 100);

  return {
    limits: { plava, crvena },
    totals: {
      isporucena,
      utrosena,
      preuzeta,
      preuzetaBezSolar,
    },
    withSolar: {
      obracunskaSnagaIznos,
      trosakGarantovanogSnabdevaca: TROSAK_GARANTOVANOG_SNABDEVACA,
      zones: utrosenaZones,
      amounts: utrosenaIznosi,
      preuzetaZones,
      preuzetaAmounts: preuzetaIznosi,
      ukupnoZaUtrošenuEnergiju: utrosenaIznosi.ukupno,
      popustElektronska,
      popustPlacanje,
      naknadaPodsticaj,
      naknadaEE,
      naknadaDS,
      osnovicaAkcize,
      akciza,
      osnovicaPdv,
      pdv,
      umanjenjeEUK,
      zaduzenje,
      taksa,
      ukupno,
    },
    withoutSolar: {
      zones: bezPanelaZones,
      amounts: bezPanelaIznosi,
      ukupnoZaUtrošenuEnergiju: bezPanelaIznosi.ukupno,
      naknadaPodsticaj: naknadaPodsticajBez,
      naknadaEE: naknadaEEBez,
      osnovicaAkcize: osnovicaAkcizeBez,
      akciza: akcizaBez,
      osnovicaPdv: osnovicaPdvBez,
      pdv: pdvBez,
      umanjenjeEUK: umanjenjeEUKBezPanela,
      zaduzenje: zaduzenjeBez,
      ukupno: ukupnoBez,
    },
    savings: {
      rsd: ustedaRsd,
      percent: ustedaPct,
    },
    eco: {
      direktnoPotroseno,
      predatoKaoVisak: isporucena,
      direktnoPotrosenoProcenata: direktnoPct,
      emisijaCO2: round2(proizvedena * CO2_KG_PO_KWH),
      kolicinaUglja: round2(proizvedena * UGALJ_KG_PO_KWH),
    },
  };
}
