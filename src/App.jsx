import React, {useEffect, useState} from 'react'
import './App.css'
import {Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import Cell from "./components/Cell.jsx";

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const years = Array.from({length: 6}, (v, i) => currentYear - i);

const renderNumber = (value) => {

  if (isNaN(value)) {
    return '';
  }

  return value == 0 ? '' : value;
}

function App() {
  const cenaPoJedinici = 54.258;
  const trosakGarantovanogSnabdevacaIznos = 160.67;

  const [month, setMonth] = useState(months[currentMonth])
  const [year, setYear] = useState(currentYear);
  const [elektronskaDostava, setElektronskaDostava] = useState(true);
  const [popustPlacanje, setPopustPlacanje] = useState(true);
  const [taksaMedijskiServis, setTaksaMedijskiServis] = useState(true);

  const [obracunskaSnaga, setObracunskaSnaga] = useState(11.04);
  const [proizvedenaElEnergija, setProizvedenaElEnergija] = useState(1000);
  const [isporucenaElEnergija, setIsporucenaElEnergija] = useState(0);
  const [brojDana, setBrojDana] = useState(2);

  const [prethodnoPreuzetoVT, setPrethodnoPreuzetoVT] = useState(10554);
  const [prethodnoPreuzetoNT, setPrethodnoPreuzetoNT] = useState(9492);
  const [prethodnoIsporucenoVT, setPrethodnoIsporucenoVT] = useState(10522);
  const [prethodnoIsporucenoNT, setPrethodnoIsporucenoNT] = useState(56);

  const [novoPreuzetoVT, setNovoPreuzetoVT] = useState(11570);
  const [novoPreuzetoNT, setNovoPreuzetoNT] = useState(9918);
  const [novoIsporucenoVT, setNovoIsporucenoVT] = useState(10853);
  const [novoIsporucenoNT, setNovoIsporucenoNT] = useState(59);

  const [utrosakPreuzetoVT, setUtrosakPreuzetoVT] = useState(0);
  const [utrosakPreuzetoNT, setUtrosakPreuzetoNT] = useState(0);
  const [utrosakIsporucenoVT, setUtrosakIsporucenoVT] = useState(0);
  const [utrosakIsporucenoNT, setUtrosakIsporucenoNT] = useState(0);
  const [utrosakVisakPrethodnoVT, setUtrosakVisakPrethodnoVT] = useState(784);
  const [utrosakVisakPrethodnoNT, setUtrosakVisakPrethodnoNT] = useState(0);

  const [utrosakUtrosenoVT, setUtrosakUtrosenoVT] = useState(0);
  const [utrosakUtrosenoNT, setUtrosakUtrosenoNT] = useState(0);
  const [utrosakVisakSledeciVT, setUtrosakVisakSledeciVT] = useState(0);
  const [utrosakVisakSledeciNT, setUtrosakVisakSledeciNT] = useState(0);

  const [umanjenjeUgrozeniSaSolar, setUmanjenjeUgrozeniSaSolar] = useState(0);
  const [umanjenjeUgrozeniBezSolra, setUmanjenjeUgrozeniBezSolra] = useState(0);

  const [obracunskaSnagaIznos, setObracunskaSnagaIznos] = useState(0);
  const [utrosenaElektricnaEnergija, setUtrosenaElektricnaEnergija] = useState(0);

  const [donjaGranicaPlavaTarifa, setDonjaGranicaPlavaTarifa] = useState(0);
  const [donjaGranicaCrvenaTarifa, setDonjaGranicaCrvenaTarifa] = useState(0);

  /**
   * Utrošena električna energija
   */

    // Zelena
  const [utrosenaZelenaTarifaVTUtroseno, setUtrosenaZelenaTarifaVTUtroseno] = useState(0);
  const utrosenaZelenaTarifaVTCenaPoJedinici = 9.1092;
  const [utrosenaZelenaTarifaVTIznos, setUtrosenaZelenaTarifaVTIznos] = useState(0);

  const [utrosenaZelenaTarifaNTUtroseno, setUtrosenaZelenaTarifaNTUtroseno] = useState(0);
  const utrosenaZelenaTarifaNTCenaPoJedinici = 2.2773;
  const [utrosenaZelenaTarifaNTIznos, setUtrosenaZelenaTarifaNTIznos] = useState(0);

  // Plava
  const [utrosenaPlavaTarifaVTUtroseno, setUtrosenaPlavaTarifaVTUtroseno] = useState(0);
  const utrosenaPlavaTarifaVTCenaPoJedinici = 13.6638;
  const [utrosenaPlavaTarifaVTIznos, setUtrosenaPlavaTarifaVTIznos] = useState(0);

  const [utrosenaPlavaTarifaNTUtroseno, setUtrosenaPlavaTarifaNTUtroseno] = useState(0);
  const utrosenaPlavaTarifaNTCenaPoJedinici = 3.4160;
  const [utrosenaPlavaTarifaNTIznos, setUtrosenaPlavaTarifaNTIznos] = useState(0);

  // Crvena
  const [utrosenaCrvenaTarifaVTUtroseno, setUtrosenaCrvenaTarifaVTUtroseno] = useState(0);
  const utrosenaCrvenaTarifaVTCenaPoJedinici = 27.3276;
  const [utrosenaCrvenaTarifaVTIznos, setUtrosenaCrvenaTarifaVTIznos] = useState(0);

  const [utrosenaCrvenaTarifaNTUtroseno, setUtrosenaCrvenaTarifaNTUtroseno] = useState(0);
  const utrosenaCrvenaTarifaNTCenaPoJedinici = 6.8319;
  const [utrosenaCrvenaTarifaNTIznos, setUtrosenaCrvenaTarifaNTIznos] = useState(0);

  const [ukupnoZaElEnergijuUObracunskomPeriodu, setUkupnoZaElEnergijuUObracunskomPeriodu] = useState(0);
  const [preuzetaElektricnaEnergija, setPreuzetaElektricnaEnergija] = useState(0);
  const [preuzetaElektricnaEnergijaBezSolar, setPreuzetaElektricnaEnergijaBezSolar] = useState(0);

  /**
   * UKUPNO ZA UTROŠENU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU
   * Sa solarnim panelima
   */
    // Zelena
  const [periodZelenaVTUtroseno, setPeriodZelenaVTUtroseno] = useState(0);
  const [periodZelenaVTIznos, setPeriodZelenaVTIznos] = useState(0);
  const [periodZelenaNTUtroseno, setPeriodZelenaNTUtroseno] = useState(0);
  const [periodZelenaNTIznos, setPeriodZelenaNTIznos] = useState(0);

  // Plava
  const [periodPlavaVTUtroseno, setPeriodPlavaVTUtroseno] = useState(0);
  const [periodPlavaVTIznos, setPeriodPlavaVTIznos] = useState(0);
  const [periodPlavaNTUtroseno, setPeriodPlavaNTUtroseno] = useState(0);
  const [periodPlavaNTIznos, setPeriodPlavaNTIznos] = useState(0);

  // Crvena
  const [periodCrvenaVTUtroseno, setPeriodCrvenaVTUtroseno] = useState(0);
  const [periodCrvenaVTIznos, setPeriodCrvenaVTIznos] = useState(0);
  const [periodCrvenaNTUtroseno, setPeriodCrvenaNTUtroseno] = useState(0);
  const [periodCrvenaNTIznos, setPeriodCrvenaNTIznos] = useState(0);

  /**
   * UKUPNO ZA UTROŠENU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU
   * Bez solarnih panela
   */
    // Zelena
  const [periodZelenaVTUtrosenoBezPanela, setPeriodZelenaVTUtrosenoBezPanela] = useState(0);
  const [periodZelenaVTIznosBezPanela, setPeriodZelenaVTIznosBezPanela] = useState(0);
  const [periodZelenaNTUtrosenoBezPanela, setPeriodZelenaNTUtrosenoBezPanela] = useState(0);
  const [periodZelenaNTIznosBezPanela, setPeriodZelenaNTIznosBezPanela] = useState(0);

  // Plava
  const [periodPlavaVTUtrosenoBezPanela, setPeriodPlavaVTUtrosenoBezPanela] = useState(0);
  const [periodPlavaVTIznosBezPanela, setPeriodPlavaVTIznosBezPanela] = useState(0);
  const [periodPlavaNTUtrosenoBezPanela, setPeriodPlavaNTUtrosenoBezPanela] = useState(0);
  const [periodPlavaNTIznosBezPanela, setPeriodPlavaNTIznosBezPanela] = useState(0);

  // Crvena
  const [periodCrvenaVTUtrosenoBezPanela, setPeriodCrvenaVTUtrosenoBezPanela] = useState(0);
  const [periodCrvenaVTIznosBezPanela, setPeriodCrvenaVTIznosBezPanela] = useState(0);
  const [periodCrvenaNTUtrosenoBezPanela, setPeriodCrvenaNTUtrosenoBezPanela] = useState(0);
  const [periodCrvenaNTIznosBezPanela, setPeriodCrvenaNTIznosBezPanela] = useState(0);

  const [periodUkupnoPreuzetoIznos, setPeriodUkupnoPreuzetoIznos] = useState(0);
  const [periodUkupnoPreuztoIznosBezPanela, setPeriodUkupnoPreuztoIznosBezPanela] = useState(0);

  const [popustZaElektronskuDostavu, setPopustZaElektronskuDostavu] = useState(0);

  const [popustZaPlacanjePrethodnogRacuna, setPopustZaPlacanjePrethodnogRacuna] = useState(0);
  const [popustZaPlacanjePrethodnogRacunaBezPanela, setPopustZaPlacanjePrethodnogRacunaBezPanela] = useState(0);

  const naknadaZaPodsticajPovlascenihProizvodjaca = 0.801;
  const naknadaZaUnapredjenjeEnergetskeEfikasnosti = 0.015;
  const naknadaZaObracunRazlikuPreuzeteUtrosene1 = 3.879;
  const naknadaZaObracunRazlikuPreuzeteUtrosene2 = 0.970;

  const [naknadaZaPodsticajPovlascenihProizvodjacaIznos, setNaknadaZaPodsticajPovlascenihProizvodjacaIznos] = useState(0);
  const [naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela, setNaknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela] = useState(0);
  const [naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos, setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznos] = useState(0);
  const [naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela, setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela] = useState(0);

  const [naknadaZaObracunRazlikuPreuzeteUtroseneIznos, setNaknadaZaObracunRazlikuPreuzeteUtroseneIznos] = useState(0);
  const [osnovicaZaObracunAkcize, setOsnovicaZaObracunAkcize] = useState(0);
  const [osnovicaZaObracunAkcizeBezPanela, setOsnovicaZaObracunAkcizeBezPanela] = useState(0);

  const [iznosAkcize, setIznosAkcize] = useState(0);
  const [iznosAkcizeBezPanela, setIznosAkcizeBezPanela] = useState(0);

  const [osnovicaZaPdv, setOsnovicaZaPdv] = useState(0);
  const [osnovicaZaPdvBezPanela, setOsnovicaZaPdvBezPanela] = useState(0);
  const [iznosPdv, setIznosPdv] = useState(0);
  const [iznosPdvBezPanela, setIznosPdvBezPanela] = useState(0);

  const [taksaZaMedijskiServis, setTaksaZaMedijskiServis] = useState(299);
  const [zaduzenjeZaObracunskiPeriod, setZaduzenjeZaObracunskiPeriod] = useState(0);
  const [zaduzenjeZaObracunskiPeriodBezPanela, setZaduzenjeZaObracunskiPeriodBezPanela] = useState(0);

  const [ukupnoZaduzenje, setUkupnoZaduzenje] = useState(0);
  const [ukupnoZaduzenjeBezPanela, setUkupnoZaduzenjeBezPanela] = useState(0);

  const [ustedaUDinarima, setUstedaUDinarima] = useState(0);
  const [ustedaUProcentima, setUstedaUProcentima] = useState(0);

  const [direktnoPotroseno, setDirektnoPotroseno] = useState(0);
  const [direktnoPotrosenoProcenata, setDirektnoPotrosenoProcenata] = useState(0);

  const [emisijaCO2, setEmisijaCO2] = useState(0);
  const [kolicinaUglja, setKolicinaUglja] = useState(0);

  useEffect(() => {
    calculate();
  }, [
    month,
    year,
    elektronskaDostava,
    popustPlacanje,
    taksaMedijskiServis,
    obracunskaSnaga,
    proizvedenaElEnergija,
    brojDana,
    prethodnoPreuzetoVT,
    prethodnoPreuzetoNT,
    prethodnoIsporucenoVT,
    prethodnoIsporucenoNT,
    novoPreuzetoVT,
    novoPreuzetoNT,
    novoIsporucenoVT,
    novoIsporucenoNT,
    utrosakVisakPrethodnoVT,
    utrosakVisakPrethodnoNT,
    umanjenjeUgrozeniSaSolar,
    umanjenjeUgrozeniBezSolra
  ]);

  useEffect(() => {
    calculate()
  }, []);

  const calculate = () => {
    let _utrosakPreuzetoVT = novoPreuzetoVT - prethodnoPreuzetoVT;
    setUtrosakPreuzetoVT(_utrosakPreuzetoVT);
    let _utrosakPreuzetoNT = novoPreuzetoNT - prethodnoPreuzetoNT;
    setUtrosakPreuzetoNT(_utrosakPreuzetoNT);
    let _utrosakIsporucenoVT = novoIsporucenoVT - prethodnoIsporucenoVT;
    setUtrosakIsporucenoVT(_utrosakIsporucenoVT);
    let _utrosakIsporucenoNT = novoIsporucenoNT - prethodnoIsporucenoNT;
    setUtrosakIsporucenoNT(_utrosakIsporucenoNT);
    let _isporucenaElEnergija = utrosakIsporucenoVT + utrosakIsporucenoNT;
    setIsporucenaElEnergija(_isporucenaElEnergija)

    let _utrosakUtrosenoVT = 0
    if (_utrosakPreuzetoVT < (_utrosakIsporucenoVT + utrosakVisakPrethodnoVT)) {
      _utrosakUtrosenoVT = 0
      setUtrosakUtrosenoVT(_utrosakUtrosenoVT);
    } else {
      _utrosakUtrosenoVT = _utrosakPreuzetoVT - _utrosakIsporucenoVT - utrosakVisakPrethodnoVT;
      setUtrosakUtrosenoVT(_utrosakUtrosenoVT);
    }

    let _utrosakUtrosenoNT = 0
    if (utrosakPreuzetoNT < (utrosakIsporucenoNT + utrosakVisakPrethodnoNT)) {
      _utrosakUtrosenoNT = 0
      setUtrosakUtrosenoNT(_utrosakUtrosenoNT);
    } else {
      _utrosakUtrosenoNT = utrosakPreuzetoNT - utrosakIsporucenoNT - utrosakVisakPrethodnoNT;
      setUtrosakUtrosenoNT(_utrosakUtrosenoNT);
    }

    let _utrosakVisakSledeciVT = 0;
    if (_utrosakPreuzetoVT < _utrosakIsporucenoVT + utrosakVisakPrethodnoVT) {
      _utrosakVisakSledeciVT = _utrosakIsporucenoVT + utrosakVisakPrethodnoVT - _utrosakPreuzetoVT
    } else {
      _utrosakVisakSledeciVT = 0;
    }

    setUtrosakVisakSledeciVT(_utrosakVisakSledeciVT);

    let _utrosakVisakSledeciNT = 0;
    if (_utrosakPreuzetoNT < _utrosakIsporucenoNT + utrosakVisakPrethodnoNT) {
      _utrosakVisakSledeciNT = _utrosakIsporucenoNT + utrosakVisakPrethodnoNT - _utrosakPreuzetoNT
    } else {
      _utrosakVisakSledeciNT = 0;
    }

    setUtrosakVisakSledeciNT(_utrosakVisakSledeciNT);

    let _obracunskaSnagaIznos = (obracunskaSnaga * cenaPoJedinici);
    setObracunskaSnagaIznos(_obracunskaSnagaIznos.toFixed(2))

    let _utrosenaElektricnaEnergija = _utrosakUtrosenoVT + _utrosakUtrosenoNT;
    setUtrosenaElektricnaEnergija(_utrosenaElektricnaEnergija);

    let _donjaGranicaPlavaTarifa = Math.round(brojDana * 11.667);
    setDonjaGranicaPlavaTarifa(_donjaGranicaPlavaTarifa);
    let _donjaGranicaCrvenaTarifa = Math.round(brojDana * 53.333);
    setDonjaGranicaCrvenaTarifa(_donjaGranicaCrvenaTarifa);

    /**
     * Zelena
     */
    let _utrosenaZelenaTarifaVTUtroseno = 0;
    if (_utrosakUtrosenoVT === 0) {
      _utrosenaZelenaTarifaVTUtroseno = 0
      setUtrosenaZelenaTarifaVTUtroseno(_utrosenaZelenaTarifaVTUtroseno);
    } else {
      if (_donjaGranicaPlavaTarifa < _utrosenaElektricnaEnergija) {
        _utrosenaZelenaTarifaVTUtroseno = Math.round(_utrosakUtrosenoVT * _donjaGranicaPlavaTarifa / _utrosenaElektricnaEnergija);
        setUtrosenaZelenaTarifaVTUtroseno(_utrosenaZelenaTarifaVTUtroseno)
      } else {
        _utrosenaZelenaTarifaVTUtroseno = _utrosakUtrosenoVT;
        setUtrosenaZelenaTarifaVTUtroseno(_utrosenaZelenaTarifaVTUtroseno)
      }
    }

    let _utrosenaZelenaTarifaNTUtroseno = 0;
    if (_utrosakUtrosenoNT === 0) {
      _utrosenaZelenaTarifaNTUtroseno = 0
      setUtrosenaZelenaTarifaNTUtroseno(_utrosenaZelenaTarifaNTUtroseno);
    } else {
      if (_donjaGranicaPlavaTarifa < _utrosenaElektricnaEnergija) {
        _utrosenaZelenaTarifaNTUtroseno = Math.round(_utrosakUtrosenoNT * _donjaGranicaPlavaTarifa / _utrosenaElektricnaEnergija);
        setUtrosenaZelenaTarifaNTUtroseno(_utrosenaZelenaTarifaNTUtroseno)
      } else {
        _utrosenaZelenaTarifaNTUtroseno = _utrosakUtrosenoNT;
        setUtrosenaZelenaTarifaNTUtroseno(_utrosenaZelenaTarifaNTUtroseno)
      }
    }

    let _utrosenaZelenaTarifaVTIznos = _utrosenaZelenaTarifaVTUtroseno * utrosenaZelenaTarifaVTCenaPoJedinici
    setUtrosenaZelenaTarifaVTIznos(_utrosenaZelenaTarifaVTIznos.toFixed(2));

    let _utrosenaZelenaTarifaNTIznos = _utrosenaZelenaTarifaNTUtroseno * utrosenaZelenaTarifaNTCenaPoJedinici
    setUtrosenaZelenaTarifaNTIznos(_utrosenaZelenaTarifaNTIznos.toFixed(2));

    /**
     * Plava
     */
    let _utrosenaPlavaTarifaVTUtroseno = 0;
    if (_utrosenaZelenaTarifaVTUtroseno > _utrosakUtrosenoVT) {
      _utrosenaPlavaTarifaVTUtroseno = 0
      setUtrosenaPlavaTarifaVTUtroseno(_utrosenaPlavaTarifaVTUtroseno);
    } else {
      if (_utrosenaZelenaTarifaVTUtroseno < _donjaGranicaCrvenaTarifa) {
        _utrosenaPlavaTarifaVTUtroseno = _utrosakUtrosenoVT - _utrosenaZelenaTarifaVTUtroseno
        setUtrosenaPlavaTarifaVTUtroseno(_utrosenaPlavaTarifaVTUtroseno);
      } else {
        _utrosenaPlavaTarifaVTUtroseno = Math.round((_utrosakUtrosenoVT * _donjaGranicaCrvenaTarifa / _utrosenaElektricnaEnergija) - _utrosenaZelenaTarifaVTUtroseno);
        setUtrosenaPlavaTarifaVTUtroseno(_utrosenaPlavaTarifaVTUtroseno);
      }
    }

    let _utrosenaPlavaTarifaNTUtroseno = 0;
    if (_utrosenaZelenaTarifaNTUtroseno > _utrosakUtrosenoNT) {
      _utrosenaPlavaTarifaNTUtroseno = 0
      setUtrosenaPlavaTarifaNTUtroseno(_utrosenaPlavaTarifaNTUtroseno);
    } else {
      if (_utrosenaZelenaTarifaNTUtroseno < _donjaGranicaCrvenaTarifa) {
        _utrosenaPlavaTarifaNTUtroseno = _donjaGranicaCrvenaTarifa - _utrosenaZelenaTarifaNTUtroseno
        setUtrosenaPlavaTarifaNTUtroseno(_utrosenaPlavaTarifaNTUtroseno);
      } else {
        _utrosenaPlavaTarifaNTUtroseno = Math.round((_utrosakUtrosenoNT * _donjaGranicaCrvenaTarifa / _utrosenaElektricnaEnergija) - _utrosenaZelenaTarifaNTUtroseno);
        setUtrosenaPlavaTarifaNTUtroseno(_utrosenaPlavaTarifaNTUtroseno);
      }
    }

    let _utrosenaPlavaTarifaVTIznos = _utrosenaPlavaTarifaVTUtroseno * utrosenaPlavaTarifaVTCenaPoJedinici
    setUtrosenaPlavaTarifaVTIznos(_utrosenaPlavaTarifaVTIznos.toFixed(2))

    let _utrosenaPlavaTarifaNTIznos = _utrosenaPlavaTarifaNTUtroseno * utrosenaPlavaTarifaNTCenaPoJedinici
    setUtrosenaPlavaTarifaNTIznos(_utrosenaPlavaTarifaNTIznos.toFixed(2))

    /**
     * Crvena
     */
    let _utrosenaCrvenaTarifaVTUtroseno = 0;
    if (_utrosenaZelenaTarifaVTUtroseno + _utrosenaPlavaTarifaVTUtroseno < _utrosakUtrosenoVT) {
      _utrosenaCrvenaTarifaVTUtroseno = _utrosakUtrosenoVT - _utrosenaZelenaTarifaVTUtroseno - _utrosenaPlavaTarifaVTUtroseno;
      setUtrosenaCrvenaTarifaVTUtroseno(_utrosenaCrvenaTarifaVTUtroseno);
    } else {
      _utrosenaCrvenaTarifaVTUtroseno = 0
      setUtrosenaCrvenaTarifaVTUtroseno(_utrosenaCrvenaTarifaVTUtroseno);
    }

    let _utrosenaCrvenaTarifaNTUtroseno = 0;
    if (_utrosenaZelenaTarifaNTUtroseno + _utrosenaPlavaTarifaNTUtroseno < _utrosakUtrosenoNT) {
      _utrosenaCrvenaTarifaNTUtroseno = _utrosakUtrosenoNT - _utrosenaZelenaTarifaNTUtroseno - _utrosenaPlavaTarifaNTUtroseno;
      setUtrosenaCrvenaTarifaNTUtroseno(_utrosenaCrvenaTarifaNTUtroseno);
    } else {
      _utrosenaCrvenaTarifaNTUtroseno = 0;
      setUtrosenaCrvenaTarifaNTUtroseno(_utrosenaCrvenaTarifaNTUtroseno);
    }

    let _utrosenaCrvenaTarifaVTIznos = _utrosenaCrvenaTarifaVTUtroseno * utrosenaCrvenaTarifaVTCenaPoJedinici
    setUtrosenaCrvenaTarifaVTIznos(_utrosenaCrvenaTarifaVTIznos.toFixed(2))
    let _utrosenaCrvenaTarifaNTIznos = _utrosenaCrvenaTarifaNTUtroseno * utrosenaCrvenaTarifaNTCenaPoJedinici
    setUtrosenaCrvenaTarifaNTIznos(_utrosenaCrvenaTarifaNTIznos.toFixed(2))

    let _ukupnoZaElEnergijuUObracunskomPeriodu = _utrosenaZelenaTarifaVTIznos + _utrosenaZelenaTarifaNTIznos + _utrosenaPlavaTarifaVTIznos + _utrosenaPlavaTarifaNTIznos + _utrosenaCrvenaTarifaVTIznos + _utrosenaCrvenaTarifaNTIznos;
    setUkupnoZaElEnergijuUObracunskomPeriodu(_ukupnoZaElEnergijuUObracunskomPeriodu.toFixed(2));

    let _preuzetaElektricnaEnergija = _utrosakPreuzetoVT + _utrosakPreuzetoNT;
    setPreuzetaElektricnaEnergija(_preuzetaElektricnaEnergija)

    let _preuzetaElektricnaEnergijaBezSolar = _preuzetaElektricnaEnergija + proizvedenaElEnergija - _isporucenaElEnergija;
    setPreuzetaElektricnaEnergijaBezSolar(_preuzetaElektricnaEnergijaBezSolar);

    /**
     * Zelena
     */
    let _periodZelenaVTUtroseno = 0;
    if (_donjaGranicaPlavaTarifa < _preuzetaElektricnaEnergija) {
      _periodZelenaVTUtroseno = Math.round(_utrosakPreuzetoVT * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergija);
    } else {
      _periodZelenaVTUtroseno = _utrosakPreuzetoVT;
    }

    let _periodZelenaVTIznos = _periodZelenaVTUtroseno * utrosenaZelenaTarifaVTCenaPoJedinici;
    setPeriodZelenaVTUtroseno(_periodZelenaVTUtroseno.toFixed(0));
    setPeriodZelenaVTIznos(_periodZelenaVTIznos.toFixed(2));

    let _periodZelenaNTUtroseno = 0;
    if (_donjaGranicaPlavaTarifa < _preuzetaElektricnaEnergija) {
      _periodZelenaNTUtroseno = Math.round(_utrosakPreuzetoNT * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergija);
    } else {
      _periodZelenaNTUtroseno = _utrosakPreuzetoNT;
    }

    let _periodZelenaNTIznos = _periodZelenaNTUtroseno * utrosenaZelenaTarifaNTCenaPoJedinici;
    setPeriodZelenaNTUtroseno(_periodZelenaNTUtroseno.toFixed(0));
    setPeriodZelenaNTIznos(_periodZelenaNTIznos.toFixed(2));

    /**
     * Plava
     */
    let _periodPlavaVTUtroseno = 0;
    if (_periodZelenaVTUtroseno > _utrosakPreuzetoVT || (_utrosakPreuzetoVT - _periodZelenaVTUtroseno === 0)) {
      _periodPlavaVTUtroseno = 0
    } else {
      if (_preuzetaElektricnaEnergija < _donjaGranicaCrvenaTarifa) {
        _periodPlavaVTUtroseno = Math.round(_utrosakPreuzetoVT - _periodZelenaVTUtroseno)
      } else {
        _periodPlavaVTUtroseno = Math.round(_utrosakPreuzetoVT * _donjaGranicaCrvenaTarifa / _preuzetaElektricnaEnergija - _periodZelenaVTUtroseno);
      }
    }

    let _periodPlavaVTIznos = _periodPlavaVTUtroseno * utrosenaPlavaTarifaVTCenaPoJedinici;
    setPeriodPlavaVTUtroseno(_periodPlavaVTUtroseno.toFixed(0));
    setPeriodPlavaVTIznos(_periodPlavaVTIznos.toFixed(2));

    let _periodPlavaNTUtroseno = 0;
    if (_periodZelenaNTUtroseno > _utrosakPreuzetoNT || (_utrosakPreuzetoNT - _periodZelenaNTUtroseno === 0)) {
      _periodPlavaNTUtroseno = 0
    } else {
      if (_preuzetaElektricnaEnergija < _donjaGranicaCrvenaTarifa) {
        _periodPlavaNTUtroseno = Math.round(_utrosakPreuzetoNT - _periodZelenaNTUtroseno)
      } else {
        _periodPlavaNTUtroseno = Math.round(_utrosakPreuzetoNT * _donjaGranicaCrvenaTarifa / _preuzetaElektricnaEnergija - _periodZelenaNTUtroseno);
      }
    }

    let _periodPlavaNTIznos = _periodPlavaNTUtroseno * utrosenaPlavaTarifaNTCenaPoJedinici;
    setPeriodPlavaNTUtroseno(_periodPlavaNTUtroseno.toFixed(0));
    setPeriodPlavaNTIznos(_periodPlavaNTIznos.toFixed(2));

    /**
     * Crvena
     */
    let _periodCrvenaVTUtroseno = 0;
    if (_periodZelenaVTUtroseno + _periodPlavaVTUtroseno >= _utrosakPreuzetoVT) {
      _periodCrvenaVTUtroseno = 0;
    } else {
      _periodCrvenaVTUtroseno = Math.round(_utrosakPreuzetoVT - _periodZelenaVTUtroseno - _periodPlavaVTUtroseno);
    }

    let _periodCrvenaVTIznos = _periodCrvenaVTUtroseno * utrosenaCrvenaTarifaVTCenaPoJedinici;
    setPeriodCrvenaVTUtroseno(_periodCrvenaVTUtroseno.toFixed(0));
    setPeriodCrvenaVTIznos(_periodCrvenaVTIznos.toFixed(2));

    let _periodCrvenaNTUtroseno = 0;
    if (_periodZelenaNTUtroseno + _periodPlavaNTUtroseno >= _utrosakPreuzetoNT) {
      _periodCrvenaNTUtroseno = 0;
    } else {
      _periodCrvenaNTUtroseno = Math.round(_utrosakPreuzetoNT - _periodZelenaNTUtroseno - _periodPlavaNTUtroseno);
    }

    let _periodCrvenaNTIznos = _periodCrvenaNTUtroseno * utrosenaCrvenaTarifaNTCenaPoJedinici;
    setPeriodCrvenaNTUtroseno(_periodCrvenaNTUtroseno.toFixed(0));
    setPeriodCrvenaNTIznos(_periodCrvenaNTIznos.toFixed(2));

    /**
     * Bez solarnih celija
     */
      // Zelena
    let _periodZelenaVTUtrosenoBezPanela = 0;
    if (_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija + _utrosakPreuzetoNT === 0) {
      _periodZelenaVTUtrosenoBezPanela = 0;
    } else {
      if (_donjaGranicaPlavaTarifa < _preuzetaElektricnaEnergijaBezSolar) {
        _periodZelenaVTUtrosenoBezPanela = Math.round((_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija) * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergijaBezSolar);
      } else {
        _periodZelenaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija);
      }
    }
    setPeriodZelenaVTUtrosenoBezPanela(_periodZelenaVTUtrosenoBezPanela.toFixed(0));

    let _periodZelenaVTIznosBezPanela = _periodZelenaVTUtrosenoBezPanela * utrosenaZelenaTarifaVTCenaPoJedinici;
    setPeriodZelenaVTIznosBezPanela(_periodZelenaVTIznosBezPanela.toFixed(2));

    let _periodZelenaNTUtrosenoBezPanela = 0;
    if (_donjaGranicaPlavaTarifa < _preuzetaElektricnaEnergijaBezSolar) {
      _periodZelenaNTUtrosenoBezPanela = Math.round(_utrosakPreuzetoNT * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergijaBezSolar);
    } else {
      _periodZelenaNTUtrosenoBezPanela = 0;
    }

    setPeriodZelenaNTUtrosenoBezPanela(_periodZelenaNTUtrosenoBezPanela.toFixed(0));

    let _periodZelenaNTIznosBezPanela = _periodZelenaNTUtrosenoBezPanela * utrosenaZelenaTarifaNTCenaPoJedinici;
    setPeriodZelenaNTIznosBezPanela(_periodZelenaNTIznosBezPanela.toFixed(2));

    // Plava
    let _periodPlavaVTUtrosenoBezPanela = 0;
    if (_periodZelenaVTUtrosenoBezPanela >= _utrosakPreuzetoVT + _utrosakIsporucenoVT) {
      _periodPlavaVTUtrosenoBezPanela = 0;
    } else {
      if (_preuzetaElektricnaEnergijaBezSolar < _donjaGranicaCrvenaTarifa) {
        _periodPlavaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija - _periodZelenaVTUtrosenoBezPanela);
      } else {
        _periodPlavaVTUtrosenoBezPanela = Math.round((_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija) * _donjaGranicaCrvenaTarifa / _preuzetaElektricnaEnergijaBezSolar - _periodZelenaVTUtrosenoBezPanela);
      }
    }
    setPeriodPlavaVTUtrosenoBezPanela(_periodPlavaVTUtrosenoBezPanela.toFixed(0));

    let _periodPlavaVTIznosBezPanela = _periodPlavaVTUtrosenoBezPanela * utrosenaPlavaTarifaVTCenaPoJedinici;
    setPeriodPlavaVTIznosBezPanela(_periodPlavaVTIznosBezPanela.toFixed(2));

    let _periodPlavaNTUtrosenoBezPanela = 0;
    if (_periodZelenaNTUtrosenoBezPanela >= _utrosakPreuzetoNT) {
      _periodPlavaNTUtrosenoBezPanela = 0;
    } else {
      if (_preuzetaElektricnaEnergijaBezSolar < _donjaGranicaCrvenaTarifa) {
        _periodPlavaNTUtrosenoBezPanela = Math.round(_utrosakPreuzetoNT - _periodZelenaNTUtrosenoBezPanela);
      } else {
        _periodPlavaNTUtrosenoBezPanela = Math.round(_utrosakPreuzetoNT * _donjaGranicaCrvenaTarifa / _preuzetaElektricnaEnergijaBezSolar - _periodZelenaNTUtrosenoBezPanela);
      }
    }
    setPeriodPlavaNTUtrosenoBezPanela(_periodPlavaNTUtrosenoBezPanela.toFixed(0));

    let _periodPlavaNTIznosBezPanela = _periodPlavaNTUtrosenoBezPanela * utrosenaPlavaTarifaNTCenaPoJedinici;
    setPeriodPlavaNTIznosBezPanela(_periodPlavaNTIznosBezPanela.toFixed(2));

    // Crvena
    let _periodCrvenaVTUtrosenoBezPanela = 0;
    if (_periodZelenaVTUtrosenoBezPanela + _periodPlavaVTUtrosenoBezPanela >= _utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija) {
      _periodCrvenaVTUtrosenoBezPanela = 0;
    } else {
      _periodCrvenaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - isporucenaElEnergija - _periodZelenaVTUtrosenoBezPanela - _periodPlavaVTUtrosenoBezPanela);
    }
    setPeriodCrvenaVTUtrosenoBezPanela(_periodCrvenaVTUtrosenoBezPanela.toFixed(0));

    let _periodCrvenaVTIznosBezPanela = _periodCrvenaVTUtrosenoBezPanela * utrosenaCrvenaTarifaVTCenaPoJedinici;
    setPeriodCrvenaVTIznosBezPanela(_periodCrvenaVTIznosBezPanela.toFixed(2));

    let _periodCrvenaNTUtrosenoBezPanela = 0;
    if (_periodZelenaNTUtrosenoBezPanela + _periodPlavaNTUtrosenoBezPanela >= _utrosakPreuzetoNT) {
      _periodCrvenaNTUtrosenoBezPanela = 0;
    } else {
      _periodCrvenaNTUtrosenoBezPanela = Math.round(_utrosakPreuzetoNT - _periodZelenaNTUtrosenoBezPanela - _periodPlavaNTUtrosenoBezPanela);
    }
    setPeriodCrvenaNTUtrosenoBezPanela(_periodCrvenaNTUtrosenoBezPanela.toFixed(0));

    let _periodCrvenaNTIznosBezPanela = _periodCrvenaNTUtrosenoBezPanela * utrosenaCrvenaTarifaNTCenaPoJedinici;
    setPeriodCrvenaNTIznosBezPanela(_periodCrvenaNTIznosBezPanela.toFixed(2));

    let _periodUkupnoPreuzetoIznos = _periodZelenaVTIznos + _periodZelenaNTIznos + _periodPlavaVTIznos + _periodPlavaNTIznos + _periodCrvenaVTIznos + _periodCrvenaNTIznos;
    setPeriodUkupnoPreuzetoIznos(_periodUkupnoPreuzetoIznos.toFixed(2));

    let _periodUkupnoPreuztoBezPanelaIznos = _periodZelenaVTIznosBezPanela + _periodZelenaNTIznosBezPanela + _periodPlavaVTIznosBezPanela + _periodPlavaNTIznosBezPanela + _periodCrvenaVTIznosBezPanela + _periodCrvenaNTIznosBezPanela;
    setPeriodUkupnoPreuztoIznosBezPanela(_periodUkupnoPreuztoBezPanelaIznos.toFixed(2));

    let _popustElektronskaDostava = 0;
    if (elektronskaDostava) {
      _popustElektronskaDostava = -50;
    }

    setPopustZaElektronskuDostavu(_popustElektronskaDostava);

    let _naknadaZaPodsticajPovlascenihProizvodjacaIznos = _preuzetaElektricnaEnergija * naknadaZaPodsticajPovlascenihProizvodjaca;
    setNaknadaZaPodsticajPovlascenihProizvodjacaIznos(_naknadaZaPodsticajPovlascenihProizvodjacaIznos.toFixed(2));

    let _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos = _utrosenaElektricnaEnergija * naknadaZaUnapredjenjeEnergetskeEfikasnosti;
    setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznos(_naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos.toFixed(2));

    let _naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela = _preuzetaElektricnaEnergijaBezSolar * naknadaZaPodsticajPovlascenihProizvodjaca;
    setNaknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela(_naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela.toFixed(2));
    let _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela = _preuzetaElektricnaEnergijaBezSolar * naknadaZaUnapredjenjeEnergetskeEfikasnosti;
    setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela(_naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela.toFixed(2));

    let _naknadaZaObracunRazlikuPreuzeteUtroseneIznos = (_utrosakPreuzetoVT - _utrosakUtrosenoVT) * naknadaZaObracunRazlikuPreuzeteUtrosene1 + (_utrosakPreuzetoNT - _utrosakUtrosenoNT) * naknadaZaObracunRazlikuPreuzeteUtrosene2;
    setNaknadaZaObracunRazlikuPreuzeteUtroseneIznos(_naknadaZaObracunRazlikuPreuzeteUtroseneIznos.toFixed(2));

    let _osnovicaZaObracunAkcize = _obracunskaSnagaIznos + trosakGarantovanogSnabdevacaIznos + _popustElektronskaDostava + _ukupnoZaElEnergijuUObracunskomPeriodu + popustZaPlacanjePrethodnogRacuna + _naknadaZaPodsticajPovlascenihProizvodjacaIznos + _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos + _naknadaZaObracunRazlikuPreuzeteUtroseneIznos;
    setOsnovicaZaObracunAkcize(_osnovicaZaObracunAkcize.toFixed(2));

    let _osnovicaZaObracunAkcizeBezPanela = _obracunskaSnagaIznos + trosakGarantovanogSnabdevacaIznos + _periodUkupnoPreuztoBezPanelaIznos + popustZaPlacanjePrethodnogRacunaBezPanela + _popustElektronskaDostava + _naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela + _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela;
    setOsnovicaZaObracunAkcizeBezPanela(_osnovicaZaObracunAkcizeBezPanela.toFixed(2));

    let _iznosAkcize = _osnovicaZaObracunAkcize * 0.075;
    setIznosAkcize(_iznosAkcize.toFixed(2))

    let _iznostAkcizeBezPanela = _osnovicaZaObracunAkcizeBezPanela * 0.075;
    setIznosAkcizeBezPanela(_iznostAkcizeBezPanela.toFixed(2))

    let _osnovicaZaPdv = _osnovicaZaObracunAkcize + _iznosAkcize;
    setOsnovicaZaPdv(_osnovicaZaPdv.toFixed(2));

    let _osnovicaZaPdvBezPanela = _osnovicaZaObracunAkcizeBezPanela + _iznostAkcizeBezPanela;
    setOsnovicaZaPdvBezPanela(_osnovicaZaPdvBezPanela.toFixed(2));

    let _iznosPdv = _osnovicaZaPdv * 0.2;
    setIznosPdv(_iznosPdv.toFixed(2));

    let _iznosPdvBezPanela = _osnovicaZaPdvBezPanela * 0.2;
    setIznosPdvBezPanela(_iznosPdvBezPanela.toFixed(2));

    let _zaduzenjeZaObracunskiPeriod = _osnovicaZaObracunAkcize + _iznosPdv + _iznosAkcize;
    setZaduzenjeZaObracunskiPeriod(_zaduzenjeZaObracunskiPeriod.toFixed(2));

    let zaduzenjeZaObracunskiPeriodBezPanela = _osnovicaZaObracunAkcizeBezPanela + _iznosPdvBezPanela + _iznostAkcizeBezPanela;
    setZaduzenjeZaObracunskiPeriodBezPanela(zaduzenjeZaObracunskiPeriodBezPanela.toFixed(2));

    let _ukupnoZaduzenje = _zaduzenjeZaObracunskiPeriod + taksaZaMedijskiServis;
    setUkupnoZaduzenje(_ukupnoZaduzenje.toFixed(2));

    let _ukupnoZaduzenjeBezPanela = zaduzenjeZaObracunskiPeriodBezPanela + taksaZaMedijskiServis;
    setUkupnoZaduzenjeBezPanela(_ukupnoZaduzenjeBezPanela.toFixed(2));

    let _usetedaUDinarima = _ukupnoZaduzenjeBezPanela - _ukupnoZaduzenje;
    setUstedaUDinarima(_usetedaUDinarima.toFixed(2));

    let _ustedaUProcentima = 100 - (_ukupnoZaduzenje / _ukupnoZaduzenjeBezPanela * 100);
    setUstedaUProcentima(_ustedaUProcentima.toFixed(2));

    let _direktnoPotroseno = proizvedenaElEnergija - utrosakIsporucenoVT;
    setDirektnoPotroseno(_direktnoPotroseno);

    let _procenatDirektnePotrosnje = _direktnoPotroseno / proizvedenaElEnergija * 100;
    setDirektnoPotrosenoProcenata(_procenatDirektnePotrosnje.toFixed(2));

    let _emisijaCO2 = proizvedenaElEnergija * 1.03 ;
    setEmisijaCO2(_emisijaCO2);

    let _kolicinaUglja = proizvedenaElEnergija * 0.8;
    setKolicinaUglja(_kolicinaUglja);
  }

  return (<>
    <Typography>KALKULATOR UŠTEDE SOLARNE ELEKTANE ZA KUPCE-PROZIVOĐAČE KOJI SU NA DVOTARIFNOM MERENJU</Typography>

    <div>
      <span>za mesec</span>

      <FormControl>
        <InputLabel id="input-month">Mesec</InputLabel>
        <Select
          labelId="input-month"
          value={month}
          label="Mesec"
          onChange={(e) => {
            setMonth(e.target.value)
          }}
        >
          {months.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="input-year">Godina</InputLabel>
        <Select
          labelId="input-year"
          value={year}
          label="Godina"
          onChange={(e) => {
            setYear(e.target.value)
          }}
        >
          {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <table border="1">
        <tbody>
        <tr>
          <th>Obračunska snaga:</th>
          <td>
            <Select
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={obracunskaSnaga}
              onChange={(e) => setObracunskaSnaga(e.target.value)}
            >
              <MenuItem value={6.90}>6.90</MenuItem>
              <MenuItem value={11.04}>11.04</MenuItem>
              <MenuItem value={13.80}>13.80</MenuItem>
              <MenuItem value={17.25}>17.25</MenuItem>
              <MenuItem value={22.07}>22.07</MenuItem>
              <MenuItem value={24.15}>24.15</MenuItem>
              <MenuItem value={27.60}>27.60</MenuItem>
              <MenuItem value={34.50}>34.50</MenuItem>
              <MenuItem value={43.47}>43.47</MenuItem>
            </Select>
            kW
          </td>
        </tr>
        <tr>
          <th>Proizvedena el. energija:</th>
          <td>
            <TextField
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={proizvedenaElEnergija}
              onChange={(e) => setProizvedenaElEnergija(e.target.value)}
            /> kWh
          </td>
        </tr>
        <tr>
          <th>Isporučena el. energija:</th>
          <td>{isporucenaElEnergija} kWh</td>
        </tr>
        <tr>
          <th>Broj dana:</th>
          <td>
            <TextField
              type="number"
              inputProps={{max: 31, min: 1}}
              variant="outlined"
              value={brojDana}
              onChange={(e) => {
                if (e.target.value === '' || (e.target.value >= 1 && e.target.value <= 31)) {
                  setBrojDana(e.target.value)
                }
              }}
            />
          </td>
        </tr>
        </tbody>
      </table>
      <table border="1">
        <tbody>
        <tr>
          <th>Popust za elektronsku dostavu računa</th>
          <td>
            <Checkbox checked={elektronskaDostava} onChange={(e) => setElektronskaDostava(e.target.checked)}/>
          </td>
        </tr>
        <tr>
          <th>Popust 5% za plaćanje prethodnog računa u roku dospeća</th>
          <td>
            <Checkbox checked={popustPlacanje} onChange={(e) => setPopustPlacanje(e.target.checked)}/>
          </td>
        </tr>
        <tr>
          <th>Taksa za javni medijski servis</th>
          <td>
            <Checkbox checked={taksaMedijskiServis} onChange={(e) => setTaksaMedijskiServis(e.target.checked)}/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <table>
      <tbody>
      <tr>
        <th rowSpan="2">STANJE ZA OBRAČUN</th>
        <th colSpan="2">Preuzeta el. energija</th>
        <th colSpan="2">Isporučena el. energija</th>
        <th colSpan="2">Višak el. en. iz preth. obr.</th>
        <th colSpan="2">Utrošena el. energija</th>
        <th colSpan="2">Višak el. en. Za sledeći obr.</th>
      </tr>
      <tr>
        <th>VT</th>
        <th>NT</th>
        <th>VT</th>
        <th>NT</th>
        <th>VT</th>
        <th>NT</th>
        <th>VT</th>
        <th>NT</th>
        <th>VT</th>
        <th>NT</th>
      </tr>
      <tr>
        <td>Prethodno</td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={prethodnoPreuzetoVT}
            onChange={(e) => setPrethodnoPreuzetoVT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={prethodnoPreuzetoNT}
            onChange={(e) => setPrethodnoPreuzetoNT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={prethodnoIsporucenoVT}
            onChange={(e) => setPrethodnoIsporucenoVT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={prethodnoIsporucenoNT}
            onChange={(e) => setPrethodnoIsporucenoNT(e.target.value)}
          />
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Novo</td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={novoPreuzetoVT}
            onChange={(e) => setNovoPreuzetoVT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={novoPreuzetoNT}
            onChange={(e) => setNovoPreuzetoNT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={novoIsporucenoVT}
            onChange={(e) => setNovoIsporucenoVT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={novoIsporucenoNT}
            onChange={(e) => setNovoIsporucenoNT(e.target.value)}
          />
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Utrošak</td>
        <Cell>{utrosakPreuzetoVT}</Cell>
        <Cell>{utrosakPreuzetoNT}</Cell>
        <Cell>{utrosakIsporucenoVT}</Cell>
        <Cell>{utrosakIsporucenoNT}</Cell>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={utrosakVisakPrethodnoVT}
            onChange={(e) => setUtrosakVisakPrethodnoVT(e.target.value)}
          />
        </td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={utrosakVisakPrethodnoNT}
            onChange={(e) => setUtrosakVisakPrethodnoNT(e.target.value)}
          />
        </td>
        <Cell>{utrosakUtrosenoVT}</Cell>
        <Cell>{utrosakUtrosenoNT}</Cell>
        <Cell>{utrosakVisakSledeciVT}</Cell>
        <Cell>{utrosakVisakSledeciNT}</Cell>
      </tr>
      </tbody>
    </table>

    <Button onClick={() => {
      calculate()
      calculate()
      calculate()
      calculate()
      calculate()
    }}>Izracunaj</Button>

    <table border="1">
      <tbody>
      <tr>
        <th colSpan={6}>OBRAČUN ZA ELEKTRIČNU ENERGIJU</th>
      </tr>
      <tr>
        <td></td>
        <td colSpan={2}>TARIFA</td>
        <td>Utrošeno (kW/kWh)</td>
        <td>Cena po jedinici</td>
        <td>Iznos (dinara)</td>
      </tr>
      <tr>
        <td colSpan={6}>Troškovi koje nezavisne od potrošnje električne energije</td>
      </tr>
      <tr>
        <td>1.</td>
        <td colSpan={2} align="left">Obračunska snaga (kW)</td>
        <Cell align="right">{obracunskaSnaga}</Cell>
        <td align="right">{cenaPoJedinici}</td>
        <Cell align="right">{obracunskaSnagaIznos}</Cell>
      </tr>
      <tr>
        <td>2.</td>
        <td colSpan={2} align="left">Trošak garantovanog snabdevača</td>
        <td></td>
        <td></td>
        <td align="right">{trosakGarantovanogSnabdevacaIznos}</td>
      </tr>
      <tr>
        <th colSpan={3}>Utrošena električna energija</th>
        <Cell align="right">{utrosenaElektricnaEnergija}</Cell>
        <td></td>
        <td></td>
      </tr>
      <tr className="green">
        <td rowSpan={2} colSpan={2}>Zelena zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{renderNumber(utrosenaZelenaTarifaVTUtroseno)}</Cell>
        <td align="right">{utrosenaZelenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaZelenaTarifaVTIznos)}</Cell>
      </tr>
      <tr className="green">
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{renderNumber(utrosenaZelenaTarifaNTUtroseno)}</Cell>
        <td align="right">{utrosenaZelenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaZelenaTarifaNTIznos)}</Cell>
      </tr>
      <tr>
        <td colSpan={6}>&nbsp;</td>
      </tr>
      <tr className="blue">
        <td rowSpan={2} colSpan={2}>Plava zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{renderNumber(utrosenaPlavaTarifaVTUtroseno)}</Cell>
        <td align="right">{utrosenaPlavaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaPlavaTarifaVTIznos)}</Cell>
      </tr>
      <tr className="blue">
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{renderNumber(utrosenaPlavaTarifaNTUtroseno)}</Cell>
        <td align="right">{utrosenaPlavaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaPlavaTarifaNTIznos)}</Cell>
      </tr>
      <tr>
        <td colSpan={6}>&nbsp;</td>
      </tr>
      <tr className="red">
        <td rowSpan={2} colSpan={2}>Crvena zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{renderNumber(utrosenaCrvenaTarifaVTUtroseno)}</Cell>
        <td align="right">{utrosenaCrvenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaCrvenaTarifaVTIznos)}</Cell>
      </tr>
      <tr className="red">
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{renderNumber(utrosenaCrvenaTarifaNTUtroseno)}</Cell>
        <td align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{renderNumber(utrosenaCrvenaTarifaNTIznos)}</Cell>
      </tr>
      <tr>
        <td rowSpan={2}>3.</td>
        <th rowSpan={2} colSpan={2}>UKUPNO ZA UTROŠENU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
        <td rowSpan={2}></td>
        <td rowSpan={2}></td>
        <Cell rowSpan={2}>{ukupnoZaElEnergijuUObracunskomPeriodu}</Cell>
        <td colSpan={3}>Bez solarnih panela</td>
      </tr>
      <tr>
        <th>Utrošeno (kW/kWh)</th>
        <th>Cena po jedinici</th>
        <th>Iznos (dinara)</th>
      </tr>
      <tr>
        <th colSpan={3}>Preuzeta električna energija</th>
        <Cell align="right">{preuzetaElektricnaEnergija}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
        <td></td>
        <td></td>
      </tr>
      <tr className="green">
        <td></td>
        <td rowSpan={2}>Zelena zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{periodZelenaVTUtroseno}</Cell>
        <td align="right">{utrosenaZelenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodZelenaVTIznos}</Cell>
        <Cell align="right">{periodZelenaVTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaZelenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodZelenaVTIznosBezPanela}</Cell>
      </tr>
      <tr className="green">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{periodZelenaNTUtroseno}</Cell>
        <td align="right">{utrosenaZelenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodZelenaNTIznos}</Cell>
        <Cell align="right">{periodZelenaNTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaZelenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodZelenaNTIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr className="blue">
        <td></td>
        <td rowSpan={2}>Plava zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{periodPlavaVTUtroseno}</Cell>
        <td align="right">{utrosenaPlavaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodPlavaVTIznos}</Cell>
        <Cell align="right">{periodPlavaVTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaPlavaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodPlavaVTIznosBezPanela}</Cell>
      </tr>
      <tr className="blue">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{periodPlavaNTUtroseno}</Cell>
        <td align="right">{utrosenaPlavaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodPlavaNTIznos}</Cell>
        <Cell align="right">{periodPlavaNTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaPlavaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodPlavaNTIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr className="red">
        <td></td>
        <td rowSpan={2}>Crvena zona</td>
        <td>Viša tarifa (VT)</td>
        <Cell align="right">{periodCrvenaVTUtroseno}</Cell>
        <td align="right">{utrosenaCrvenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodCrvenaVTIznos}</Cell>
        <Cell align="right">{periodCrvenaVTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaCrvenaTarifaVTCenaPoJedinici}</td>
        <Cell align="right">{periodCrvenaVTIznosBezPanela}</Cell>
      </tr>
      <tr className="red">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <Cell align="right">{periodCrvenaNTUtroseno}</Cell>
        <td align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodCrvenaNTIznos}</Cell>
        <Cell align="right">{periodCrvenaNTUtrosenoBezPanela}</Cell>
        <td align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
        <Cell align="right">{periodCrvenaNTIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr>
        <td>4.</td>
        <th colSpan={2}>UKUPNO ZA PREUZETU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
        <td></td>
        <td></td>
        <Cell align="right">{periodUkupnoPreuzetoIznos}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{periodUkupnoPreuztoIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td>5.</td>
        <td colSpan={2} align="left">Popust 5% za plaćanje prethodnog računa u roku dospeća</td>
        <td></td>
        <td></td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={popustZaPlacanjePrethodnogRacuna}
            onChange={(e) => setPopustZaPlacanjePrethodnogRacuna(e.target.value)}
          />
        </td>
        <td></td>
        <td></td>
        <td>
          <TextField
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={popustZaPlacanjePrethodnogRacunaBezPanela}
            onChange={(e) => setPopustZaPlacanjePrethodnogRacunaBezPanela(e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td>6.</td>
        <td colSpan={2} align="left">Popust za elektronsku dostavu računa</td>
        <td></td>
        <td></td>
        <Cell align="right">{popustZaElektronskuDostavu}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{popustZaElektronskuDostavu}</Cell>
      </tr>
      <tr>
        <td>7.</td>
        <td colSpan={2} align="left">Naknada za podsticaj povlašćenih proizvođača el. en.</td>
        <Cell align="right">{preuzetaElektricnaEnergija}</Cell>
        <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjaca}</Cell>
        <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjacaIznos}</Cell>
        <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
        <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjaca}</Cell>
        <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td>8.</td>
        <td colSpan={2} align="left">Naknada za unapređenje energetske efikasnosti</td>
        <Cell align="right">{utrosenaElektricnaEnergija}</Cell>
        <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnosti}</Cell>
        <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos}</Cell>
        <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
        <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnosti}</Cell>
        <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela}</Cell>
      </tr>
      <tr>
        <td>9.</td>
        <td colSpan={2} align="left">Naknada za obr. prist. DS za razliku preuzete i utrošene el. en.</td>
        <Cell align="right">{naknadaZaObracunRazlikuPreuzeteUtrosene1}</Cell>
        <Cell align="right">{naknadaZaObracunRazlikuPreuzeteUtrosene2}</Cell>
        <Cell align="right">{naknadaZaObracunRazlikuPreuzeteUtroseneIznos}</Cell>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>10.</td>
        <td colSpan={2} align="left">Osnovica za obračun akcize (1+2+3+5+6+7+8+9)</td>
        <td></td>
        <td></td>
        <Cell align="right">{osnovicaZaObracunAkcize}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{osnovicaZaObracunAkcizeBezPanela}</Cell>
      </tr>
      <tr>
        <td>11.</td>
        <td colSpan={2} align="left">Iznos akcize (stopa 7,5%)</td>
        <td></td>
        <td></td>
        <Cell align="right">{iznosAkcize}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{iznosAkcizeBezPanela}</Cell>
      </tr>
      <tr>
        <td>12.</td>
        <td colSpan={2} align="left">Osnovica za PDV (9+10)</td>
        <td></td>
        <td></td>
        <Cell align="right">{osnovicaZaPdv}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{osnovicaZaPdvBezPanela}</Cell>
      </tr>
      <tr>
        <td>13.</td>
        <td colSpan={2} align="left">Iznos PDV (20%)</td>
        <td></td>
        <td></td>
        <Cell align="right">{iznosPdv}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{iznosPdvBezPanela}</Cell>
      </tr>
      <tr>
        <td>14.</td>
        <td colSpan={2} align="left">Umanjenje za energetski ugrožene kupce</td>
        <td></td>
        <td></td>
        <td>
          <TextField
            style={{maxWidth: 100}}
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={umanjenjeUgrozeniBezSolra}
            onChange={(e) => setUmanjenjeUgrozeniBezSolra(e.target.value)}
          />
        </td>
        <td></td>
        <td></td>
        <td>
          <TextField
            style={{maxWidth: 100}}
            type="number"
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={umanjenjeUgrozeniSaSolar}
            onChange={(e) => setUmanjenjeUgrozeniSaSolar(e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td>15.</td>
        <td colSpan={2} align="left">ZADUŽENJE ZA OBRAČUNSKI PERIOD (1+2+3+5+6+7+8+9+11+13+14)</td>
        <td></td>
        <td></td>
        <Cell align="right">{zaduzenjeZaObracunskiPeriod}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{zaduzenjeZaObracunskiPeriodBezPanela}</Cell>
      </tr>
      <tr>
        <td>16.</td>
        <td colSpan={2} align="left">
          Taksa za javni medijski servis (ne ulazi u osnovicu za PDV po čl. 17,st.4,t.2ЗPDV)
        </td>
        <td></td>
        <td></td>
        <Cell align="right">{taksaZaMedijskiServis}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{taksaZaMedijskiServis}</Cell>
      </tr>
      <tr>
        <th colSpan={3} align="left">UKUPNO ZADUŽENJE ZA OBRAČUNSKI PERIOD (15+16)</th>
        <td></td>
        <td></td>
        <Cell align="right">{ukupnoZaduzenje}</Cell>
        <td></td>
        <td></td>
        <Cell align="right">{ukupnoZaduzenjeBezPanela}</Cell>
      </tr>
      </tbody>
    </table>

    <table border="1">
      <tbody>
      <tr>
        <th>UŠTEDA U DINARIMA</th>
        <Cell>{ustedaUDinarima}</Cell>
        <td>RSD</td>
      </tr>
      <tr>
        <th>UŠTEDA U PROCENTIMA</th>
        <Cell>{ustedaUProcentima}</Cell>
        <td>%</td>
      </tr>
      <tr>
        <th>UKUPNO PROIZVEDENA EL. ENERGIJA</th>
        <Cell>{proizvedenaElEnergija}</Cell>
        <td>kWh</td>
      </tr>
      <tr>
        <th>PREDATO KAO VIŠAK</th>
        <Cell>{utrosakIsporucenoVT}</Cell>
        <td>kWh</td>
      </tr>
      <tr>
        <th>DIREKTNO POTROŠENO</th>
        <td>{direktnoPotroseno}</td>
        <td>kWh</td>
      </tr>
      <tr>
        <th>PROCENAT DIREKTNE POTROŠNJE</th>
        <td>{direktnoPotrosenoProcenata}</td>
        <td>%</td>
      </tr>
      <tr>
        <th>Emisija CO2</th>
        <td colSpan="2">{emisijaCO2} kg CO<sub>2</sub>/KWh</td>
      </tr>
      <tr>
        <th>Količina uglja</th>
        <td colSpan="2">{kolicinaUglja} kg/kWh</td>
      </tr>
      </tbody>
    </table>

  </>)
}

export default App
