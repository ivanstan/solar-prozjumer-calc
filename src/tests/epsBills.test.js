import { describe, expect, it } from 'vitest';
import { allocateZones, calculateBill, netUtrosak, zoneLimits } from '../calc/index.js';
import { bills } from './fixtures/epsBills.js';

describe('zoneLimits', () => {
  it('računa EPS pragove zona po broju dana', () => {
    expect(zoneLimits(30)).toEqual({ plava: 350, crvena: 1200 });
    expect(zoneLimits(31)).toEqual({ plava: 362, crvena: 1240 });
    expect(zoneLimits(28)).toEqual({ plava: 327, crvena: 1120 });
  });
});

describe('allocateZones (EPS srazmerni model)', () => {
  it('februar: VT ceil/NT floor raspodela zelene zone', () => {
    const { plava, crvena } = zoneLimits(28);
    expect(allocateZones(8, 811, plava, crvena)).toEqual({
      zelenaVT: 4,
      zelenaNT: 323,
      plavaVT: 4,
      plavaNT: 488,
      crvenaVT: 0,
      crvenaNT: 0,
    });
  });

  it('sve u zelenoj zoni ostaje zeleno', () => {
    const { plava, crvena } = zoneLimits(31);
    expect(allocateZones(0, 183, plava, crvena)).toEqual({
      zelenaVT: 0,
      zelenaNT: 183,
      plavaVT: 0,
      plavaNT: 0,
      crvenaVT: 0,
      crvenaNT: 0,
    });
  });
});

describe('netUtrosak (neto merenje po tarifi)', () => {
  it('ne preliva višak iz VT u NT', () => {
    const result = netUtrosak({
      preuzetoVT: 224,
      preuzetoNT: 187,
      isporucenoVT: 934,
      isporucenoNT: 4,
      visakPrethodnoVT: 352,
      visakPrethodnoNT: 0,
    });

    expect(result.utrosenoNT).toBe(183);
    expect(result.visakSledeciVT).toBe(1062);
  });

  it('veća preuzeta energija povećava utrošenu u istoj tarifi', () => {
    const result = netUtrosak({
      preuzetoVT: 6000,
      preuzetoNT: 187,
      isporucenoVT: 934,
      isporucenoNT: 4,
      visakPrethodnoVT: 352,
      visakPrethodnoNT: 0,
    });

    expect(result).toEqual({
      utrosenoVT: 4714,
      utrosenoNT: 183,
      visakSledeciVT: 0,
      visakSledeciNT: 0,
    });
  });
});

describe('calculateBill – ručno pregaženje utrošene energije', () => {
  const osnova = {
    obracunskaSnaga: 11.04,
    brojDana: 31,
    proizvedenaElEnergija: 1180,
    preuzetoVT: 6000,
    preuzetoNT: 187,
    isporucenoVT: 934,
    isporucenoNT: 4,
    visakPrethodnoVT: 352,
    visakPrethodnoNT: 0,
  };

  it('koristi netiranu vrednost kada utrošena nije zadata', () => {
    const { totals } = calculateBill(osnova);

    expect(totals.utrosenoVT).toBe(4714);
    expect(totals.utrosena).toBe(4897);
  });

  it('poštuje ručno unetu utrošenu energiju', () => {
    const { totals } = calculateBill({ ...osnova, utrosenoVT: 100, utrosenoNT: 50 });

    expect(totals.utrosenoVT).toBe(100);
    expect(totals.utrosena).toBe(150);
  });

  it('prazan unos ne gazi netiranje', () => {
    const { totals } = calculateBill({ ...osnova, utrosenoVT: '', utrosenoNT: null });

    expect(totals.utrosenoVT).toBe(4714);
    expect(totals.utrosenoNT).toBe(183);
  });

  it('nula je validno pregaženje, ne prazna vrednost', () => {
    const { totals } = calculateBill({ ...osnova, utrosenoVT: 0, utrosenoNT: 0 });

    expect(totals.utrosena).toBe(0);
  });
});

describe.each(bills)('EPS račun: $label', ({ input, expected }) => {
  it('netira utrošenu energiju kao na računu', () => {
    const { totals } = calculateBill(input);

    expect({
      utrosenoVT: totals.utrosenoVT,
      utrosenoNT: totals.utrosenoNT,
      visakSledeciVT: totals.visakSledeciVT,
      visakSledeciNT: totals.visakSledeciNT,
    }).toEqual(expected.utroseno);
  });

  it('poklapa se sa stavkama na računu (sa panelima)', () => {
    const { withSolar } = calculateBill(input);

    expect(withSolar.zones).toEqual(expected.zones);
    expect(withSolar.ukupnoZaUtrošenuEnergiju).toBe(expected.ukupnoZaUtrošenuEnergiju);
    expect(withSolar.naknadaPodsticaj).toBe(expected.naknadaPodsticaj);
    expect(withSolar.naknadaEE).toBe(expected.naknadaEE);
    expect(withSolar.naknadaDS).toBe(expected.naknadaDS);
    expect(withSolar.osnovicaAkcize).toBe(expected.osnovicaAkcize);
    expect(withSolar.akciza).toBe(expected.akciza);
    expect(withSolar.osnovicaPdv).toBe(expected.osnovicaPdv);
    expect(withSolar.pdv).toBe(expected.pdv);
    expect(withSolar.zaduzenje).toBe(expected.zaduzenje);
    expect(withSolar.ukupno).toBe(expected.ukupno);
    expect(withSolar.obracunskaSnagaIznos).toBe(672.28);
    expect(withSolar.taksa).toBe(349);
  });

  it('bez panela daje veći ili jednak iznos kada ima proizvodnje', () => {
    const result = calculateBill(input);
    if (input.proizvedenaElEnergija > 0) {
      expect(result.withoutSolar.ukupno).toBeGreaterThan(result.withSolar.ukupno);
      expect(result.savings.rsd).toBeGreaterThan(0);
    }
  });
});
