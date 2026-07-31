import { describe, expect, it } from 'vitest';
import { allocateZones, calculateBill, zoneLimits } from '../calc/index.js';
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

describe.each(bills)('EPS račun: $label', ({ input, expected }) => {
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
