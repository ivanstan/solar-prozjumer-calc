import React, {useEffect, useState} from 'react'
import './App.css'
import {Button, FormControl, MenuItem, Select, styled, Switch, TextField, Tooltip,} from "@mui/material";
import {tooltipClasses} from '@mui/material/Tooltip';
import Cell, {formatter} from "./components/Cell.jsx";
import If from './components/If.jsx';
import {PieChart} from "@mui/x-charts";
import {reportEmail} from "./email.jsx";
import NegativeNumberInput from "./components/NegativeNumberInput.jsx";
import InfoIcon from '@mui/icons-material/Info';

const emptyItem = " - ";
const months = [emptyItem, "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
const years = [emptyItem, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const emailValid = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const CustomTextField = styled(TextField)(({theme}) => ({
  '& .MuiInputBase-input': {
    padding: '5px', maxWidth: 70, background: '#fff', borderRadius: 30,
  },
}));

const CustomSelect = styled(Select)(({theme}) => ({
  '& .MuiInputBase-input': {
    padding: '5px', maxWidth: 70, background: '#fff', borderRadius: 30,
  },
}));

const HtmlTooltip = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}}/>))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: 670, padding: 20, textAlign: 'center',
  },
}));

const HtmlTooltip2 = styled(({className, ...props}) => (
  <Tooltip {...props} classes={{popper: className}}/>))(({theme}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: 870, padding: 20, textAlign: 'center',
  },
}));

const tdStyle = {
  backgroundColor: "#fcf2f2",
}

const tdStyleOdd = {
  backgroundColor: "#fadcda",
}

const renderNumber = (value) => {

  if (isNaN(value)) {
    return '';
  }

  return value == 0 ? '' : value;
}

function App() {
  const cenaPoJedinici = 54.258;
  const trosakGarantovanogSnabdevacaIznos = 160.67;

  const [calculated, setCalculated] = useState(false);
  const [month, setMonth] = useState(emptyItem)
  const [year, setYear] = useState(emptyItem);
  const [elektronskaDostava, setElektronskaDostava] = useState(false);
  const [popustPlacanje, setPopustPlacanje] = useState(false);
  const [taksaMedijskiServis, setTaksaMedijskiServis] = useState(false);
  const [umanjenjeZaUgrozene, setUmanjenjeZaUgrozene] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const [obracunskaSnaga, setObracunskaSnaga] = useState(emptyItem);
  const [proizvedenaElEnergija, setProizvedenaElEnergija] = useState('');
  const [isporucenaElEnergija, setIsporucenaElEnergija] = useState(0);
  const [brojDana, setBrojDana] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const [prethodnoPreuzetoVT, setPrethodnoPreuzetoVT] = useState(10554);
  // const [prethodnoPreuzetoNT, setPrethodnoPreuzetoNT] = useState(9492);
  // const [prethodnoIsporucenoVT, setPrethodnoIsporucenoVT] = useState(10522);
  // const [prethodnoIsporucenoNT, setPrethodnoIsporucenoNT] = useState(56);
  //
  // const [novoPreuzetoVT, setNovoPreuzetoVT] = useState(11570);
  // const [novoPreuzetoNT, setNovoPreuzetoNT] = useState(9918);
  // const [novoIsporucenoVT, setNovoIsporucenoVT] = useState(10853);
  // const [novoIsporucenoNT, setNovoIsporucenoNT] = useState(59);
  //
  // const [utrosakPreuzetoVT, setUtrosakPreuzetoVT] = useState(308);
  // const [utrosakPreuzetoNT, setUtrosakPreuzetoNT] = useState(123);
  // const [utrosakIsporucenoVT, setUtrosakIsporucenoVT] = useState(839);
  // const [utrosakIsporucenoNT, setUtrosakIsporucenoNT] = useState(5);
  // const [utrosakVisakPrethodnoVT, setUtrosakVisakPrethodnoVT] = useState(1216);
  // const [utrosakVisakPrethodnoNT, setUtrosakVisakPrethodnoNT] = useState(0);
  // const [utrosakUtrosenoVT, setUtrosakUtrosenoVT] = useState(0);
  // const [utrosakUtrosenoNT, setUtrosakUtrosenoNT] = useState(118);
  // const [utrosakVisakSledeciVT, setUtrosakVisakSledeciVT] = useState(1747);
  // const [utrosakVisakSledeciNT, setUtrosakVisakSledeciNT] = useState(0);

  const [utrosakPreuzetoVT, setUtrosakPreuzetoVT] = useState('');
  const [utrosakPreuzetoNT, setUtrosakPreuzetoNT] = useState('');
  const [utrosakIsporucenoVT, setUtrosakIsporucenoVT] = useState('');
  const [utrosakIsporucenoNT, setUtrosakIsporucenoNT] = useState('');
  const [utrosakVisakPrethodnoVT, setUtrosakVisakPrethodnoVT] = useState('');
  const [utrosakVisakPrethodnoNT, setUtrosakVisakPrethodnoNT] = useState('');
  const [utrosakUtrosenoVT, setUtrosakUtrosenoVT] = useState('');
  const [utrosakUtrosenoNT, setUtrosakUtrosenoNT] = useState('');
  const [utrosakVisakSledeciVT, setUtrosakVisakSledeciVT] = useState('');
  const [utrosakVisakSledeciNT, setUtrosakVisakSledeciNT] = useState('');

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

  const [predatoKaoVisak, setPredatoKaoVisak] = useState(0);
  const [direktnoPotroseno, setDirektnoPotroseno] = useState(0);
  const [direktnoPotrosenoProcenata, setDirektnoPotrosenoProcenata] = useState(0);

  const [emisijaCO2, setEmisijaCO2] = useState(0);
  const [kolicinaUglja, setKolicinaUglja] = useState(0);

  const [newsletterChecked, setNewsletterChecked] = useState(false);

  const fixCharts = () => {
    // const svgs = document.querySelectorAll('.charts svg');
    //
    // svgs.forEach((svg) => {
    //   const nestedGroup = svg.querySelector('g g');
    //
    //   if (nestedGroup && nestedGroup.hasAttribute('transform')) {
    //     // Get the current transform attribute value (e.g., "translate(50, 100)")
    //     const transform = nestedGroup.getAttribute('transform');
    //
    //     // Extract horizontal and vertical translate values using regex
    //     const match = /translate\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/.exec(transform);
    //
    //     if (match) {
    //       const [, , vertical] = match;
    //
    //       // Get the width of the <g> element using getBBox()
    //       const bbox = nestedGroup.getBBox();
    //       const halfWidth = (bbox.width / 2) + 20; // Calculate half the width
    //
    //       // Set the new transform with the horizontal translation as half the width
    //       const newTransform = `translate(${halfWidth}, ${vertical})`;
    //
    //       // Update the transform attribute with the new value
    //       nestedGroup.setAttribute('transform', newTransform);
    //     }
    //   }
    // });
  };

  useEffect(() => {
    const _taksa = taksaMedijskiServis ? 349 : 0;

    setTaksaZaMedijskiServis(_taksa);
  }, [taksaMedijskiServis]);

  useEffect(() => {
    if (elektronskaDostava === false) {
      setPopustZaPlacanjePrethodnogRacuna(0);
      setPopustZaPlacanjePrethodnogRacunaBezPanela(0);
    }
  }, [elektronskaDostava]);

  useEffect(() => {
    if (popustPlacanje === false) {
      setPopustZaPlacanjePrethodnogRacuna(0);
      setPopustZaPlacanjePrethodnogRacunaBezPanela(0);
    }
  }, [popustPlacanje]);

  const calculate = () => {
    let _utrosakPreuzetoVT = utrosakPreuzetoVT;
    setUtrosakPreuzetoVT(_utrosakPreuzetoVT);
    let _utrosakPreuzetoNT = utrosakPreuzetoNT;
    setUtrosakPreuzetoNT(_utrosakPreuzetoNT);
    let _utrosakIsporucenoVT = utrosakIsporucenoVT;
    setUtrosakIsporucenoVT(_utrosakIsporucenoVT);
    let _utrosakIsporucenoNT = utrosakIsporucenoNT;
    setUtrosakIsporucenoNT(_utrosakIsporucenoNT);
    let _isporucenaElEnergija = utrosakIsporucenoNT + utrosakIsporucenoVT;
    setIsporucenaElEnergija(_isporucenaElEnergija)
    let _utrosakUtrosenoVT = utrosakUtrosenoVT
    if (_utrosakPreuzetoVT < (_utrosakIsporucenoVT + utrosakVisakPrethodnoVT)) {
      _utrosakUtrosenoVT = 0
      // setUtrosakUtrosenoVT(_utrosakUtrosenoVT);
    } else {
      _utrosakUtrosenoVT = _utrosakPreuzetoVT - _utrosakIsporucenoVT - utrosakVisakPrethodnoVT;
      // setUtrosakUtrosenoVT(_utrosakUtrosenoVT);
    }

    let _utrosakUtrosenoNT = utrosakUtrosenoNT
    if (_utrosakPreuzetoNT < (_utrosakIsporucenoNT + utrosakVisakPrethodnoNT)) {
      _utrosakUtrosenoNT = 0
      // setUtrosakUtrosenoNT(_utrosakUtrosenoNT);
    } else {
      _utrosakUtrosenoNT = _utrosakPreuzetoNT - _utrosakIsporucenoNT - utrosakVisakPrethodnoNT;
      // setUtrosakUtrosenoNT(_utrosakUtrosenoNT);
    }

    let _utrosakVisakSledeciVT = utrosakVisakSledeciVT;
    if (_utrosakPreuzetoVT < _utrosakIsporucenoVT + utrosakVisakPrethodnoVT) {
      _utrosakVisakSledeciVT = _utrosakIsporucenoVT + utrosakVisakPrethodnoVT - _utrosakPreuzetoVT
    } else {
      _utrosakVisakSledeciVT = 0;
    }

    // setUtrosakVisakSledeciVT(_utrosakVisakSledeciVT);

    let _utrosakVisakSledeciNT = utrosakVisakSledeciNT;
    if (_utrosakPreuzetoNT < _utrosakIsporucenoNT + utrosakVisakPrethodnoNT) {
      _utrosakVisakSledeciNT = _utrosakIsporucenoNT + utrosakVisakPrethodnoNT - _utrosakPreuzetoNT
    } else {
      _utrosakVisakSledeciNT = 0;
    }

    // setUtrosakVisakSledeciNT(_utrosakVisakSledeciNT);

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
    } else {
      if (_donjaGranicaPlavaTarifa < _utrosenaElektricnaEnergija) {
        _utrosenaZelenaTarifaVTUtroseno = Math.round(_utrosakUtrosenoVT * _donjaGranicaPlavaTarifa / _utrosenaElektricnaEnergija);
      } else {
        _utrosenaZelenaTarifaVTUtroseno = _utrosakUtrosenoVT;
      }
    }

    setUtrosenaZelenaTarifaVTUtroseno(_utrosenaZelenaTarifaVTUtroseno)

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
        _utrosenaPlavaTarifaNTUtroseno = _utrosenaElektricnaEnergija - _utrosenaZelenaTarifaNTUtroseno
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
      _periodZelenaVTUtroseno = Math.floor(_utrosakPreuzetoVT * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergija);
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
        _periodZelenaVTUtrosenoBezPanela = Math.round((_utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija) * _donjaGranicaPlavaTarifa / _preuzetaElektricnaEnergijaBezSolar);
      } else {
        _periodZelenaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija);
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
        _periodPlavaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija - _periodZelenaVTUtrosenoBezPanela);
      } else {
        _periodPlavaVTUtrosenoBezPanela = Math.round((_utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija) * _donjaGranicaCrvenaTarifa / _preuzetaElektricnaEnergijaBezSolar - _periodZelenaVTUtrosenoBezPanela);
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
    if (_periodZelenaVTUtrosenoBezPanela + _periodPlavaVTUtrosenoBezPanela >= _utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija) {
      _periodCrvenaVTUtrosenoBezPanela = 0;
    } else {
      _periodCrvenaVTUtrosenoBezPanela = Math.round(_utrosakPreuzetoVT + proizvedenaElEnergija - _isporucenaElEnergija - _periodZelenaVTUtrosenoBezPanela - _periodPlavaVTUtrosenoBezPanela);
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

    let _naknadaZaPodsticajPovlascenihProizvodjacaIznos = _utrosenaElektricnaEnergija * naknadaZaPodsticajPovlascenihProizvodjaca;
    setNaknadaZaPodsticajPovlascenihProizvodjacaIznos(_naknadaZaPodsticajPovlascenihProizvodjacaIznos.toFixed(2));

    let _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos = _utrosenaElektricnaEnergija * naknadaZaUnapredjenjeEnergetskeEfikasnosti;
    setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznos(_naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos.toFixed(2));

    let _naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela = _preuzetaElektricnaEnergijaBezSolar * naknadaZaPodsticajPovlascenihProizvodjaca;
    setNaknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela(_naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela.toFixed(2));
    let _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela = _preuzetaElektricnaEnergijaBezSolar * naknadaZaUnapredjenjeEnergetskeEfikasnosti;
    setNaknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela(_naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela.toFixed(2));

    let _naknadaZaObracunRazlikuPreuzeteUtroseneIznos = (_utrosakPreuzetoVT - _utrosakUtrosenoVT) * naknadaZaObracunRazlikuPreuzeteUtrosene1 + (_utrosakPreuzetoNT - _utrosakUtrosenoNT) * naknadaZaObracunRazlikuPreuzeteUtrosene2;
    setNaknadaZaObracunRazlikuPreuzeteUtroseneIznos(_naknadaZaObracunRazlikuPreuzeteUtroseneIznos.toFixed(2));

    let _osnovicaZaObracunAkcize = _obracunskaSnagaIznos + trosakGarantovanogSnabdevacaIznos + _popustElektronskaDostava + _ukupnoZaElEnergijuUObracunskomPeriodu - popustZaPlacanjePrethodnogRacuna + _naknadaZaPodsticajPovlascenihProizvodjacaIznos + _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos + _naknadaZaObracunRazlikuPreuzeteUtroseneIznos;
    setOsnovicaZaObracunAkcize(_osnovicaZaObracunAkcize.toFixed(2));

    let _osnovicaZaObracunAkcizeBezPanela = _obracunskaSnagaIznos + trosakGarantovanogSnabdevacaIznos + _periodUkupnoPreuztoBezPanelaIznos - popustZaPlacanjePrethodnogRacuna + _popustElektronskaDostava + _naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela + _naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela;
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

    let _zaduzenjeZaObracunskiPeriod = _osnovicaZaObracunAkcize + _iznosPdv + _iznosAkcize - umanjenjeUgrozeniSaSolar;
    setZaduzenjeZaObracunskiPeriod(_zaduzenjeZaObracunskiPeriod.toFixed(2));

    let zaduzenjeZaObracunskiPeriodBezPanela = _osnovicaZaObracunAkcizeBezPanela + _iznosPdvBezPanela + _iznostAkcizeBezPanela - umanjenjeUgrozeniBezSolra;
    setZaduzenjeZaObracunskiPeriodBezPanela(zaduzenjeZaObracunskiPeriodBezPanela.toFixed(2));

    let _ukupnoZaduzenje = _zaduzenjeZaObracunskiPeriod + taksaZaMedijskiServis;
    setUkupnoZaduzenje(_ukupnoZaduzenje.toFixed(2));

    let _ukupnoZaduzenjeBezPanela = zaduzenjeZaObracunskiPeriodBezPanela + taksaZaMedijskiServis;
    setUkupnoZaduzenjeBezPanela(_ukupnoZaduzenjeBezPanela.toFixed(2));

    let _usetedaUDinarima = _ukupnoZaduzenjeBezPanela - _ukupnoZaduzenje;
    setUstedaUDinarima(_usetedaUDinarima.toFixed(2));

    let _ustedaUProcentima = 100 - (_ukupnoZaduzenje / _ukupnoZaduzenjeBezPanela * 100);
    setUstedaUProcentima(_ustedaUProcentima.toFixed(2));

    let _direktnoPotroseno = proizvedenaElEnergija - _isporucenaElEnergija;
    setDirektnoPotroseno(_direktnoPotroseno);

    let _predatoKaoVisak = _isporucenaElEnergija;
    setPredatoKaoVisak(_predatoKaoVisak);

    let _procenatDirektnePotrosnje = _direktnoPotroseno / proizvedenaElEnergija * 100;
    setDirektnoPotrosenoProcenata(_procenatDirektnePotrosnje.toFixed(2));

    let _emisijaCO2 = proizvedenaElEnergija * 1.03;
    setEmisijaCO2(_emisijaCO2);

    let _kolicinaUglja = proizvedenaElEnergija * 0.8;
    setKolicinaUglja(_kolicinaUglja);

    fixCharts();
  }

  const isValid = () => {

    if (brojDana === '') {
      setErrorMessage('Broj dana obračunskog perioda je obavezno polje.')

      return false;
    }

    if (proizvedenaElEnergija === '') {
      setErrorMessage('Proizvedena električna energija je obavezno polje.')

      return false;
    }

    if (obracunskaSnaga === emptyItem) {
      setErrorMessage('Obračunska snaga je obavezno polje.')

      return false;
    }

    if (month === emptyItem) {
      setErrorMessage('Mesec je obavezno polje.')

      return false;
    }

    if (year === emptyItem) {
      setErrorMessage('Godina je obavezno polje.')

      return false;
    }

    if (utrosakPreuzetoVT === '') {
      setErrorMessage('Preuzeta električna energija VT je obavezno polje.')

      return false;
    }

    if (utrosakPreuzetoNT === '') {
      setErrorMessage('Preuzeta električna energija NT je obavezno polje.')

      return false;
    }

    if (utrosakIsporucenoVT === '') {
      setErrorMessage('Isporučena električna energija VT je obavezno polje.')

      return false;
    }

    if (utrosakIsporucenoNT === '') {
      setErrorMessage('Isporučena električna energija NT je obavezno polje.')

      return false;
    }

    if (utrosakVisakPrethodnoVT === '') {
      setErrorMessage('Višak električne energije iz prethodnih obr. VT je obavezno polje.')

      return false;
    }

    if (utrosakVisakPrethodnoNT === '') {
      setErrorMessage('Višak električne energije iz prethodnih obr. NT je obavezno polje.')

      return false;
    }

    if (utrosakUtrosenoVT === '') {
      setErrorMessage('Utrošena električne energija VT je obavezno polje.')

      return false;
    }

    if (utrosakUtrosenoNT === '') {
      setErrorMessage('Utrošena električne energija NT je obavezno polje.')

      return false;
    }

    if (utrosakVisakSledeciVT === '') {
      setErrorMessage('Višak električne energije za sledeći obračun VT je obavezno polje.')

      return false;
    }

    if (utrosakVisakSledeciNT === '') {
      setErrorMessage('Višak električne energije za sledeći obračun NT je obavezno polje.')

      return false;
    }

    return true
  }

  const onCalculateClick = () => {
    setErrorMessage('')

    if (isValid()) {
      calculate();
      setCalculated(true);
    }

  }

  const onEmailSend = async () => {
    setEmailSent(true);

    const elements = document.getElementsByClassName('email');
    let body = '';
    for (var i = 0; i < elements.length; i++) {
      body += elements[i].innerHTML
    }

    console.log(reportEmail(body))

    const url = "https://solar.sumeiklima.org/sr/solar/email";
    try {
      const response = await fetch(url, {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify({
          to: email,
          body: reportEmail(body),
          newsletter: newsletterChecked,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  const calculateDisabled = () => {
    let values = [utrosakPreuzetoVT, utrosakPreuzetoNT, utrosakIsporucenoVT, utrosakIsporucenoNT, utrosakVisakPrethodnoVT, utrosakVisakPrethodnoNT, utrosakUtrosenoVT, utrosakUtrosenoNT, utrosakVisakSledeciVT, utrosakVisakSledeciNT, proizvedenaElEnergija, brojDana, umanjenjeUgrozeniSaSolar, popustZaPlacanjePrethodnogRacuna, brojDana]

    return values.some(value => Number.isNaN(value));
  }

  return (<>
    <h1 style={{marginBottom: 40}}>Kalkulator uštede za prozjumerska domaćinstva sa solarnim elektranama na dvotarifnom
      merenju</h1>

    <div style={{marginBottom: 40}}>
      <p>Kalkulator uštede je namenjen <b>“KUPCIMA-
        PROIZVOĐAČIMA”</b>&nbsp;iz kategorije&nbsp;<b>“DOMAĆINSTVA”</b>,<br/>
        kako bi mogli da izračunaju uštedu u trošku za električnu energiju na mesečnom nivou.
      </p>
      <p>Kalkulator je informativnog karaktera i postoji mogućnost da će u pojedinim
        slučajevima<br/>
        imati minimalna odstupanja koja ne utiču značajno na proračun uštede.</p>

      <p style={{color: '#e61d1d'}}>Zahvaljujemo se Milošu Đukanoviću koji nam je pružio izuzetnu pomoć u izradi web
        verzije kalkulatora.</p>
    </div>

    <div className="row gy-5" style={{marginBottom: 20, fontSize: 14}}>
      <div className="col-md-4">
        <div style={{border: '5px solid #e61d1d', borderRadius: 30, padding: '30px', display: 'flex'}}>
          <span style={{flexGrow: 1, textAlign: 'left', alignItems: 'baseline'}}>Za mesec</span>
          <FormControl sx={{marginX: 1}}>
            <CustomSelect
              labelId="input-month"
              sx={{minWidth: 70}}
              value={month}
              onChange={(e) => {
                setMonth(e.target.value)
              }}
            >
              {months.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
            </CustomSelect>
          </FormControl>
          <FormControl>
            <CustomSelect
              labelId="input-year"
              sx={{minWidth: 70}}
              value={year}
              onChange={(e) => {
                setYear(e.target.value)
              }}
            >
              {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </CustomSelect>
          </FormControl>
        </div>
      </div>
    </div>

    <div className="row gy-5" style={{marginBottom: 20, fontSize: 14}}>
      <div className="col-md-4">
        <div className="red-box">
          <div className="flex content-between" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>
              Obračunska snaga
              <HtmlTooltip
                enterTouchDelay={0}
                title={<React.Fragment>
                  Unesite vrednost koja se nalazi na drugoj strani računa, kao stavka 1 u okviru kalkulacije računa.
                  <img src={'obracunska-snaga.jpg'} style={{margin: '10px auto 0', display: 'block'}}/>
                </React.Fragment>}
              >
              <span style={{display: 'inline-block', verticalAlign: "middle", marginLeft: 5}}>
                <InfoIcon/>
              </span>
              </HtmlTooltip>
            </p>
            <CustomSelect
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={obracunskaSnaga}
              sx={{minWidth: 70}}
              onChange={(e) => setObracunskaSnaga(e.target.value)}
            >
              <MenuItem value={emptyItem}>{emptyItem}</MenuItem>
              <MenuItem value={6.90}>6.90</MenuItem>
              <MenuItem value={11.04}>11.04</MenuItem>
              <MenuItem value={13.80}>13.80</MenuItem>
              <MenuItem value={17.25}>17.25</MenuItem>
              <MenuItem value={22.07}>22.07</MenuItem>
              <MenuItem value={24.15}>24.15</MenuItem>
              <MenuItem value={27.60}>27.60</MenuItem>
              <MenuItem value={34.50}>34.50</MenuItem>
              <MenuItem value={43.47}>43.47</MenuItem>
            </CustomSelect>
            <span style={{marginLeft: 5, width: 30, textAlign: 'left'}}>kW</span>
          </div>
          <div className="flex content-between" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>
              Broj dana obračunskog perioda
              <HtmlTooltip
                enterTouchDelay={0}
                title={<React.Fragment>
                  Unesite vrednost koja se nalazi na prvoj strani računa, u gornjem levom uglu.
                  <img src={'broj-dana.jpg'} style={{margin: '10px auto 0', display: 'block'}}/>
                </React.Fragment>}
              >
              <span style={{display: 'inline-block', verticalAlign: "middle", marginLeft: 5}}>
                <InfoIcon/>
              </span>
              </HtmlTooltip>
            </p>
            <CustomTextField
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
            <span style={{marginLeft: 5, width: 30, textAlign: 'left'}}></span>
          </div>
          <div className="flex content-between" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>
              Proizvedena električna energija
              <Tooltip
                enterTouchDelay={0}
                title="Unesite ukupnu proizvodnju solarne elektrane za željeni mesec sa invertera ili iz aplikacije. Obratite pažnju da unesete proizvodnju sa identičnim datumima kao što je period obračuna na računu."
              >
              <span style={{display: 'inline-block', verticalAlign: "middle", marginLeft: 5}}>
                <InfoIcon/>
              </span>
              </Tooltip>
            </p>
            <CustomTextField
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={proizvedenaElEnergija}
              onChange={(e) => setProizvedenaElEnergija(parseFloat(e.target.value))}
            />
            <span style={{marginLeft: 5, width: 30, textAlign: 'left'}}>kWh</span>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="red-box">
          <div className="flex">
            <p style={{textAlign: 'left', flexGrow: 1}}>
              Stanje za obračun
              <HtmlTooltip2
                enterTouchDelay={0}
                title={<React.Fragment>
                  Unesite količine električne energije iz tabele koja se nalazi na vrhu druge strane računa. Unose se
                  ISKLJUČIVO vrednosti iz reda UTROŠAK.
                  <img src={'stanje-za-obračun.jpg'} style={{margin: '10px auto 0', display: 'block'}}/>
                </React.Fragment>}
              >
              <span style={{display: 'inline-block', verticalAlign: "middle", marginLeft: 5}}>
                <InfoIcon/>
              </span>
              </HtmlTooltip2>
            </p>
            <p className="bold" style={{width: 90}}>VT</p>
            <p className="bold" style={{width: 90}}>NT</p>
          </div>
          <div className="flex" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>Preuzeta el. energija</p>
            <CustomTextField
              style={{marginRight: 10, width: 70}}
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakPreuzetoVT}
              onChange={(e) => setUtrosakPreuzetoVT(parseFloat(e.target.value))}
            />
            <CustomTextField
              type="number"
              // inputProps={{ step: "0.01" }}
              style={{width: 70}}
              variant="outlined"
              value={utrosakPreuzetoNT}
              onChange={(e) => setUtrosakPreuzetoNT(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>Isporučena el. energija</p>
            <CustomTextField
              style={{marginRight: 10, width: 70}}
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakIsporucenoVT}
              onChange={(e) => setUtrosakIsporucenoVT(parseFloat(e.target.value))}
            />
            <CustomTextField
              type="number"
              style={{width: 70}}
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakIsporucenoNT}
              onChange={(e) => setUtrosakIsporucenoNT(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>Višak el. en. iz preth. obr.</p>
            <CustomTextField
              style={{marginRight: 10, width: 70}}
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakVisakPrethodnoVT}
              onChange={(e) => setUtrosakVisakPrethodnoVT(parseFloat(e.target.value))}
            />
            <CustomTextField
              type="number"
              style={{width: 70}}
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakVisakPrethodnoNT}
              onChange={(e) => setUtrosakVisakPrethodnoNT(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>Utrošena el. energija</p>
            <CustomTextField
              style={{marginRight: 10, width: 70}}
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakUtrosenoVT}
              onChange={(e) => setUtrosakUtrosenoVT(parseFloat(e.target.value))}
            />
            <CustomTextField
              type="number"
              style={{width: 70}}
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakUtrosenoNT}
              onChange={(e) => setUtrosakUtrosenoNT(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex" style={{alignItems: 'baseline'}}>
            <p style={{flexGrow: 1, textAlign: 'left'}}>Višak el. en. za sledeći obr.</p>
            <CustomTextField
              style={{marginRight: 10, width: 70}}
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakVisakSledeciVT}
              onChange={(e) => setUtrosakVisakSledeciVT(parseFloat(e.target.value))}
            />
            <CustomTextField
              type="number"
              style={{width: 70}}
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={utrosakVisakSledeciNT}
              onChange={(e) => setUtrosakVisakSledeciNT(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="red-box" style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
          <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <span>Popust za elektronsku dostavu računa</span>
            <Switch checked={elektronskaDostava} onChange={(e) => setElektronskaDostava(e.target.checked)}/>
          </div>
          <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <span>
            Popust 5% za plaćanje prethodnog računa u roku dospeća
            <HtmlTooltip
              enterTouchDelay={0}
              title={<React.Fragment>
                Unesite vrednost koja se nalazi na drugoj strani računa, kao stavka 5 u okviru kalkulacije računa.
                <img src={'popust-5-posto.jpg'} style={{margin: '10px auto 0', display: 'block'}}/>
              </React.Fragment>}
            >
              <span style={{display: 'inline-block', verticalAlign: "middle", marginLeft: 5}}>
                <InfoIcon/>
              </span>
            </HtmlTooltip>
          </span>
            <Switch checked={popustPlacanje} onChange={(e) => setPopustPlacanje(e.target.checked)}/>
          </div>
          <div className="flex content-end">
            <If condition={popustPlacanje}>
              <NegativeNumberInput
                value={popustZaPlacanjePrethodnogRacuna}
                onChange={value => setPopustZaPlacanjePrethodnogRacuna(value)}
              />
            </If>
          </div>
          <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <span>Taksa za javni medijski servis</span>
            <Switch checked={taksaMedijskiServis} onChange={(e) => setTaksaMedijskiServis(e.target.checked)}/>
          </div>

          <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <span>Umanjenje za energetski ugrožene kupce</span>
            <Switch checked={umanjenjeZaUgrozene} onChange={(e) => setUmanjenjeZaUgrozene(e.target.checked)}/>
          </div>
          <div className="flex content-end">
            <If condition={umanjenjeZaUgrozene}>
              <NegativeNumberInput
                value={umanjenjeUgrozeniSaSolar}
                onChange={value => setUmanjenjeUgrozeniSaSolar(value)}
              />
            </If>
          </div>
        </div>
      </div>
    </div>

    {/*<div style={{display: 'flex', marginBottom: 10}} className="frame email">*/}
    {/*  <table style={{borderRight: 'none'}}>*/}
    {/*    <thead>*/}
    {/*    <tr>*/}
    {/*      <td>&nbsp;</td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <td>&nbsp;</td>*/}
    {/*    </tr>*/}
    {/*    </thead>*/}
    {/*    <tbody>*/}
    {/*    <tr>*/}
    {/*      <th>Obračunska snaga:</th>*/}
    {/*      <td>*/}
    {/*        {obracunskaSnaga}*/}
    {/*      </td>*/}
    {/*      <td>*/}
    {/*        kW*/}
    {/*      </td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <th>Proizvedena el. energija:</th>*/}
    {/*      <td>*/}
    {/*        {proizvedenaElEnergija}*/}
    {/*      </td>*/}
    {/*      <td>*/}
    {/*        kWh*/}
    {/*      </td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <th>Isporučena el. energija:</th>*/}
    {/*      <td>{isporucenaElEnergija}</td>*/}
    {/*      <td>kWh</td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <th>Broj dana:</th>*/}
    {/*      <td>*/}
    {/*        {brojDana}*/}
    {/*      </td>*/}
    {/*    </tr>*/}
    {/*    </tbody>*/}
    {/*  </table>*/}
    {/*  <table>*/}
    {/*    <tbody>*/}
    {/*    <tr>*/}
    {/*      <th>STANJE ZA OBRAČUN</th>*/}
    {/*      <th colSpan="2" className="primary">Preuzeta el. energija</th>*/}
    {/*      <th colSpan="2">Isporučena el. energija</th>*/}
    {/*      <th colSpan="2" className="primary">Višak el. en. iz preth. obr.</th>*/}
    {/*      <th colSpan="2">Utrošena el. energija</th>*/}
    {/*      <th colSpan="2" className="primary">Višak el. en. Za sledeći obr.</th>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <th className="primary"></th>*/}
    {/*      <th className="primary">VT</th>*/}
    {/*      <th className="primary">NT</th>*/}
    {/*      <th className="primary">VT</th>*/}
    {/*      <th className="primary">NT</th>*/}
    {/*      <th className="primary">VT</th>*/}
    {/*      <th className="primary">NT</th>*/}
    {/*      <th className="primary">VT</th>*/}
    {/*      <th className="primary">NT</th>*/}
    {/*      <th className="primary">VT</th>*/}
    {/*      <th className="primary">NT</th>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <td>Prethodno</td>*/}
    {/*      <Cell style={tdStyle}>*/}
    {/*        {prethodnoPreuzetoVT}*/}
    {/*      </Cell>*/}
    {/*      <Cell>*/}
    {/*        {prethodnoPreuzetoNT}*/}
    {/*      </Cell>*/}
    {/*      <Cell style={tdStyle}>*/}
    {/*        {prethodnoIsporucenoVT}*/}
    {/*      </Cell>*/}
    {/*      <Cell>*/}
    {/*        {prethodnoIsporucenoNT}*/}
    {/*      </Cell>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <td>Novo</td>*/}
    {/*      <Cell style={tdStyle}>*/}
    {/*        {novoPreuzetoVT}*/}
    {/*      </Cell>*/}
    {/*      <Cell>*/}
    {/*        {novoPreuzetoNT}*/}
    {/*      </Cell>*/}
    {/*      <Cell style={tdStyle}>*/}
    {/*        {novoIsporucenoVT}*/}
    {/*      </Cell>*/}
    {/*      <Cell>*/}
    {/*        {novoIsporucenoNT}*/}
    {/*      </Cell>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*      <td style={tdStyle}></td>*/}
    {/*      <td></td>*/}
    {/*    </tr>*/}
    {/*    <tr>*/}
    {/*      <td>Utrošak</td>*/}
    {/*      <Cell style={tdStyle}>{utrosakPreuzetoVT}</Cell>*/}
    {/*      <Cell>{utrosakPreuzetoNT}</Cell>*/}
    {/*      <Cell style={tdStyle}>{utrosakIsporucenoVT}</Cell>*/}
    {/*      <Cell>{utrosakIsporucenoNT}</Cell>*/}
    {/*      <Cell style={tdStyle}>*/}
    {/*        {utrosakVisakPrethodnoVT}*/}
    {/*      </Cell>*/}
    {/*      <Cell>*/}
    {/*        {utrosakVisakPrethodnoNT}*/}
    {/*      </Cell>*/}
    {/*      <Cell style={tdStyle}>{utrosakUtrosenoVT}</Cell>*/}
    {/*      <Cell>{utrosakUtrosenoNT}</Cell>*/}
    {/*      <Cell style={tdStyle}>{utrosakVisakSledeciVT}</Cell>*/}
    {/*      <Cell showZero={true}>{utrosakVisakSledeciNT}</Cell>*/}
    {/*    </tr>*/}
    {/*    </tbody>*/}
    {/*  </table>*/}
    {/*</div>*/}

    <div>
      <p style={{color: '#e61d1d', fontWeight: "bold"}}>{errorMessage}</p>
      <Button onClick={onCalculateClick} style={{margin: 20}} variant="contained"
              sx={{borderRadius: 30, padding: 2, minWidth: 340}} disabled={calculateDisabled()}>Izračunaj
        uštedu</Button>
    </div>

    <If condition={calculated}>

      <div style={{display: 'flex', marginTop: 30}} className="charts">
        <div style={{marginBottom: 30, width: '50%'}} className="email">
          <PieChart
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            margin={{top: 0, bottom: 10, left: 0, right: 0}}
            series={[{
              innerRadius: 40,
              data: [
                {
                  id: 0,
                  color: 'transparent',
                  value: 0,
                  label: 'Ukupna proizvedena el. energija ' + proizvedenaElEnergija + ' kWh'
                },
                {
                  id: 1,
                  color: '#e61d1d',
                  value: utrosakIsporucenoVT,
                  label: 'Predato kao višak: ' + predatoKaoVisak + ' kWh (' + formatter.format(100 - direktnoPotrosenoProcenata) + '%)'
                }, {
                  id: 2,
                  color: '#fadcda',
                  value: direktnoPotroseno,
                  label: 'Direktno potrošeno: ' + direktnoPotroseno + ' kWh (' + formatter.format(direktnoPotrosenoProcenata) + '%)'
                },
              ], valueFormatter: () => '',
            },]}
            height={150}
          />

          <div style={{textAlign: 'left', marginLeft: '25%'}}>
            <p style={{margin: 0}}>
              Ukupna proizvedena el. energija <strong>{proizvedenaElEnergija} kWh</strong>
            </p>
            <p style={{margin: 0}}>
              <span
                style={{display: 'inline-block', width: 15, height: 15, background: '#e61d1d', marginRight: 5}}></span>
              Predato kao višak: <strong>{predatoKaoVisak} kWh
              ({formatter.format(100 - direktnoPotrosenoProcenata)}%)</strong>
            </p>
            <p style={{margin: 0}}>
              <span
                style={{display: 'inline-block', width: 15, height: 15, background: '#fadcda', marginRight: 5}}></span>
              Direktno potrošeno: <strong>{direktnoPotroseno} kWh
              ({formatter.format(direktnoPotrosenoProcenata)}%)</strong>
            </p>
          </div>

        </div>

        <div style={{
          marginBottom: 30,
          width: '50%',
          textAlign: 'left',
          display: 'flex', flexDirection: 'column', justifyContent: 'end'
        }} className="email">
          {/*<PieChart*/}
          {/*  slotProps={{*/}
          {/*    legend: {*/}
          {/*      direction: 'column', // Vertical legend*/}
          {/*      position: {vertical: 'bottom', horizontal: 'middle'}, // Legend on the right side*/}
          {/*      padding: 0.5, // Compact padding*/}
          {/*      itemGap: 4, // Minimized space between legend items*/}
          {/*      textStyle: {fontSize: 12}, // Smaller text for compactness*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  margin={{ top: 0, bottom: 80, left: 0, right: 0 }}*/}
          {/*  series={[{*/}
          {/*    innerRadius: 40,*/}
          {/*    data: [{*/}
          {/*      id: 0,*/}
          {/*      color: '#e61d1d',*/}
          {/*      value: ustedaUProcentima,*/}
          {/*      label: 'Ušteda sa solarnim panelima ' + ustedaUDinarima + ' RSD (' + parseInt(ustedaUProcentima) + '%)'*/}
          {/*    }, {*/}
          {/*      id: 1,*/}
          {/*      color: '#fadcda',*/}
          {/*      value: 100 - ustedaUProcentima,*/}
          {/*      label: 'Iznos bez solarnih panela: ' + (ukupnoZaduzenjeBezPanela) + ' RSD (100%)'*/}
          {/*    },], valueFormatter: () => '',*/}
          {/*  },]}*/}
          {/*  height={230}*/}
          {/*/>*/}
          <p style={{margin: 0}}>Iznos bez solarnih
            panela: <strong>{formatter.format(ukupnoZaduzenjeBezPanela)} RSD</strong></p>
          <p style={{margin: 0}}>Iznos sa solarnim panelima: <strong>{formatter.format(ukupnoZaduzenje)} RSD</strong>
          </p>
          <p style={{margin: 0}}>Ušteda sa solarnim panelima <strong>{formatter.format(ustedaUDinarima)} RSD
            ({parseInt(ustedaUProcentima)}%)</strong></p>
        </div>
      </div>

      <div className="frame email">
        <table>
          <tbody>
          <tr>
            <th colSpan={6} className="primary" style={{borderRadius: '30px 30px 0 0', height: 40}}>OBRAČUN ZA
              ELEKTRIČNU ENERGIJU
            </th>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td className="bold">Utrošeno (kW/kWh)</td>
            <td className="bold">Cena po jedinici</td>
            <td className="bold">Iznos (dinara)</td>
          </tr>
          <tr className="secondary bold">
            <td colSpan={6} style={{textAlign: 'left'}}>Troškovi koje nezavise od potrošnje električne energije</td>
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
          <tr className="secondary">
            <th colSpan={3} style={{textAlign: 'left'}}>Utrošena električna energija</th>
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
            <td rowSpan={2} colSpan={2} style={{borderLeft: 'none'}}>Plava zona</td>
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
          <tr>
            <td style={{backgroundColor: '#fcf2f2'}}>Niža tarifa (NT)</td>
            <Cell style={{backgroundColor: '#fcf2f2'}}
                  align="right">{renderNumber(utrosenaCrvenaTarifaNTUtroseno)}</Cell>
            <td style={{backgroundColor: '#fcf2f2'}} align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
            <Cell style={{backgroundColor: '#fcf2f2'}} align="right">{renderNumber(utrosenaCrvenaTarifaNTIznos)}</Cell>
            <td colSpan={3} align="center" style={{
              fontWeight: "bold", backgroundColor: '#3e3e3e', color: '#ffffff', borderRadius: '30px 30px 0 0'
            }}>Bez solarnih panela
            </td>
          </tr>
          <tr>
            <td style={{backgroundColor: '#e61d1d', color: '#ffffff'}} rowSpan={2}>3.</td>
            <th style={{backgroundColor: '#e61d1d', color: '#ffffff'}} rowSpan={2} colSpan={2}>UKUPNO ZA UTROŠENU
              ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU
            </th>
            <td style={{backgroundColor: '#e61d1d', color: '#ffffff'}} rowSpan={2}></td>
            <td style={{backgroundColor: '#e61d1d', color: '#ffffff'}} rowSpan={2}></td>
            <Cell style={{backgroundColor: '#e61d1d', color: '#ffffff'}}
                  rowSpan={2}>{ukupnoZaElEnergijuUObracunskomPeriodu}</Cell>
            <td style={{backgroundColor: '#3e3e3e', color: '#ffffff', fontWeight: 'bold'}}>Utrošeno (kW/kWh)</td>
            <td style={{backgroundColor: '#3e3e3e', color: '#ffffff', fontWeight: 'bold'}}>Cena po jedinici</td>
            <td style={{backgroundColor: '#3e3e3e', color: '#ffffff', fontWeight: 'bold'}}>Iznos (dinara)</td>
          </tr>
          <tr className="primary"></tr>
          <tr className="secondary">
            <th colSpan={3}>Preuzeta električna energija</th>
            <Cell align="right">{preuzetaElektricnaEnergija}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
            <td></td>
            <td></td>
          </tr>
          <tr className="green">
            <td className="no-border" style={{borderTop: '1px solid #fff'}}/>
            <td rowSpan={2} style={{borderLeft: 'none'}}>Zelena zona</td>
            <td>Viša tarifa (VT)</td>
            <Cell align="right">{periodZelenaVTUtroseno}</Cell>
            <td align="right">{utrosenaZelenaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodZelenaVTIznos}</Cell>
            <Cell align="right">{periodZelenaVTUtrosenoBezPanela}</Cell>
            <td align="right">{utrosenaZelenaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodZelenaVTIznosBezPanela}</Cell>
          </tr>
          <tr className="green">
            <td className="no-border"/>
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
            <td className="no-border"></td>
            <td rowSpan={2} style={{borderLeft: 'none'}}>Plava zona</td>
            <td>Viša tarifa (VT)</td>
            <Cell align="right">{periodPlavaVTUtroseno}</Cell>
            <td align="right">{utrosenaPlavaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodPlavaVTIznos}</Cell>
            <Cell align="right">{periodPlavaVTUtrosenoBezPanela}</Cell>
            <td align="right">{utrosenaPlavaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodPlavaVTIznosBezPanela}</Cell>
          </tr>
          <tr className="blue">
            <td className="no-border"></td>
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
            <td className="no-border"></td>
            <td rowSpan={2} style={{borderLeft: 'none'}}>Crvena zona</td>
            <td>Viša tarifa (VT)</td>
            <Cell align="right">{periodCrvenaVTUtroseno}</Cell>
            <td align="right">{utrosenaCrvenaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodCrvenaVTIznos}</Cell>
            <Cell align="right">{periodCrvenaVTUtrosenoBezPanela}</Cell>
            <td align="right">{utrosenaCrvenaTarifaVTCenaPoJedinici}</td>
            <Cell align="right">{periodCrvenaVTIznosBezPanela}</Cell>
          </tr>
          <tr className="red">
            <td className="no-border"></td>
            <td>Niža tarifa (NT)</td>
            <Cell align="right">{periodCrvenaNTUtroseno}</Cell>
            <td align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
            <Cell align="right">{periodCrvenaNTIznos}</Cell>
            <Cell align="right">{periodCrvenaNTUtrosenoBezPanela}</Cell>
            <td align="right">{utrosenaCrvenaTarifaNTCenaPoJedinici}</td>
            <Cell align="right">{periodCrvenaNTIznosBezPanela}</Cell>
          </tr>
          <tr className="primary">
            <td>4.</td>
            <th colSpan={2}>UKUPNO ZA PREUZETU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
            <td></td>
            <td></td>
            <Cell align="right">{periodUkupnoPreuzetoIznos}</Cell>
            <td style={{background: '#3e3e3e'}}></td>
            <td style={{background: '#3e3e3e'}}></td>
            <Cell style={{background: '#3e3e3e'}} align="right">{periodUkupnoPreuztoIznosBezPanela}</Cell>
          </tr>
          <tr style={tdStyle}>
            <td>5.</td>
            <td colSpan={2} align="left">Popust 5% za plaćanje prethodnog računa u roku dospeća</td>
            <td></td>
            <td></td>
            <td align="right">
              <If condition={popustPlacanje}>
                -{popustZaPlacanjePrethodnogRacuna}
              </If>
            </td>
            <td></td>
            <td></td>
            <td align="right">
              {/*<If condition={popustPlacanje}>*/}
              {/*  <CustomTextField*/}
              {/*    type="number"*/}
              {/*    // inputProps={{ step: "0.01" }}*/}
              {/*    variant="outlined"*/}
              {/*    value={popustZaPlacanjePrethodnogRacunaBezPanela}*/}
              {/*    onChange={(e) => setPopustZaPlacanjePrethodnogRacunaBezPanela(parseFloat(e.target.value))}*/}
              {/*  />*/}
              {/*</If>*/}
              <If condition={popustPlacanje}>
                -{popustZaPlacanjePrethodnogRacuna}
              </If>
            </td>
          </tr>
          <tr className="secondary">
            <td>6.</td>
            <td colSpan={2} align="left">Popust za elektronsku dostavu računa</td>
            <td></td>
            <td></td>
            <Cell align="right">{popustZaElektronskuDostavu}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{popustZaElektronskuDostavu}</Cell>
          </tr>
          <tr style={tdStyle}>
            <td>7.</td>
            <td colSpan={2} align="left">Naknada za podsticaj povlašćenih proizvođača el. en.</td>
            <Cell align="right">{utrosenaElektricnaEnergija}</Cell>
            <td align="right">{naknadaZaPodsticajPovlascenihProizvodjaca}</td>
            <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjacaIznos}</Cell>
            <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
            <td align="right">{naknadaZaPodsticajPovlascenihProizvodjaca}</td>
            <Cell align="right">{naknadaZaPodsticajPovlascenihProizvodjacaIznosBezPanela}</Cell>
          </tr>
          <tr className="secondary">
            <td>8.</td>
            <td colSpan={2} align="left">Naknada za unapređenje energetske efikasnosti</td>
            <Cell align="right">{utrosenaElektricnaEnergija}</Cell>
            <td align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnosti}</td>
            <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnostiIznos}</Cell>
            <Cell align="right">{preuzetaElektricnaEnergijaBezSolar}</Cell>
            <td align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnosti}</td>
            <Cell align="right">{naknadaZaUnapredjenjeEnergetskeEfikasnostiIznosBezPanela}</Cell>
          </tr>
          <tr style={tdStyle}>
            <td>9.</td>
            <td colSpan={2} align="left">Naknada za obr. prist. DS za razliku preuzete i utrošene el. en.</td>
            <td align="right"></td>
            <td align="right"></td>
            <Cell align="right">{naknadaZaObracunRazlikuPreuzeteUtroseneIznos}</Cell>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="secondary">
            <td>10.</td>
            <td colSpan={2} align="left">Osnovica za obračun akcize (1+2+3+5+6+7+8+9)</td>
            <td></td>
            <td></td>
            <Cell align="right">{osnovicaZaObracunAkcize}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{osnovicaZaObracunAkcizeBezPanela}</Cell>
          </tr>
          <tr style={tdStyle}>
            <td>11.</td>
            <td colSpan={2} align="left">Iznos akcize (stopa 7,5%)</td>
            <td></td>
            <td></td>
            <Cell align="right">{iznosAkcize}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{iznosAkcizeBezPanela}</Cell>
          </tr>
          <tr className="secondary">
            <td>12.</td>
            <td colSpan={2} align="left">Osnovica za PDV (9+10)</td>
            <td></td>
            <td></td>
            <Cell align="right">{osnovicaZaPdv}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{osnovicaZaPdvBezPanela}</Cell>
          </tr>
          <tr style={tdStyle}>
            <td>13.</td>
            <td colSpan={2} align="left">Iznos PDV (20%)</td>
            <td></td>
            <td></td>
            <Cell align="right">{iznosPdv}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{iznosPdvBezPanela}</Cell>
          </tr>
          <tr className="secondary">
            <td>14.</td>
            <td colSpan={2} align="left">Umanjenje za energetski ugrožene kupce</td>
            <td></td>
            <td></td>
            <td align="right">
              -{umanjenjeUgrozeniSaSolar}
            </td>
            <td></td>
            <td></td>
            <td align="right">
              -{umanjenjeUgrozeniSaSolar}
            </td>
          </tr>
          <tr style={tdStyle}>
            <td>15.</td>
            <td colSpan={2} align="left">
              <strong>ZADUŽENJE ZA OBRAČUNSKI PERIOD</strong> (1+2+3+5+6+7+8+9+11+13+14)
            </td>
            <td></td>
            <td></td>
            <Cell align="right">{zaduzenjeZaObracunskiPeriod}</Cell>
            <td></td>
            <td></td>
            <Cell align="right">{zaduzenjeZaObracunskiPeriodBezPanela}</Cell>
          </tr>
          <tr className="secondary">
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
          <tr style={{height: 50}}>
            <td colSpan={3} align="left" className="primary" style={{borderRadius: '0 0 0 30px', paddingLeft: 20}}>
              <strong>UKUPNO ZADUŽENJE ZA OBRAČUNSKI PERIOD</strong> (15+16)
            </td>
            <td className="primary"></td>
            <td className="primary"></td>
            <Cell align="right" style={{
              fontWeight: 'bold', backgroundColor: '#e61d1d', color: '#ffffff', borderRadius: '0 0 30px 0'
            }}>{ukupnoZaduzenje}</Cell>
            <td style={{borderRadius: '0 0 0 30px', backgroundColor: '#3e3e3e'}}></td>
            <td className="primary" style={{background: '#3e3e3e'}}></td>
            <Cell align="right" style={{
              fontWeight: 'bold',
              backgroundColor: '#3e3e3e',
              color: '#ffffff',
              borderRadius: '0 0 30px 0',
              paddingRight: 20
            }}>{ukupnoZaduzenjeBezPanela}</Cell>
          </tr>
          </tbody>
        </table>
      </div>

      <div className="email">
        <div className="flex" style={{justifyContent: 'center'}}>
          <div className="flex coal-box"
               style={{
                 flexDirection: 'column', padding: '20px 20px', margin: '0 15px', alignItems: 'center', minWidth: 400
               }}>
            <img src={'https://prozjumer.ivanstanojevic.me/co2.svg'} alt="CO2" width={70} style={{marginRight: 10}}/>
            <p>
              Sopstvenom proizvodnjom<br/>
              električne energije ste smanjili<br/>
              emisiju ugljen-disoksida za<br/>
              proizvodnju struje za oko:
            </p>
            <p style={{fontWeight: "bold", fontSize: 24}}>{emisijaCO2} kg/CO<sub>2</sub>e</p>
          </div>

          <div className="flex coal-box"
               style={{
                 flexDirection: 'column', padding: '20px 20px', margin: '0 15px', alignItems: 'center', minWidth: 400
               }}>
            <img src={'https://prozjumer.ivanstanojevic.me/coal.svg'} alt="Coal" width={60}
                 style={{margin: '7px 10px'}}/>
            <p>
              Sopstvenom proizvodnjom<br/>
              električne energije smanjili ste<br/>
              količinu potrošenog uglja<br/>
              u termoelektranama za oko:
            </p>
            <p style={{fontWeight: "bold", fontSize: 24}}>{Math.round(kolicinaUglja)} kg</p>
          </div>
        </div>
      </div>

      <div className="frame" style={{padding: 20, marginTop: 20}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <span style={{marginRight: 20, alignSelf: 'center'}}>Pošaljite ovaj izveštaj na svoju email adresu</span>
          <TextField style={{minWidth: 400}} variant="outlined" type="email" value={email}
                     onChange={(e) => setEmail(e.target.value)}/>
          <Button disabled={!emailValid(email)} style={{marginLeft: 10, borderRadius: 30}} variant="contained"
                  onClick={onEmailSend}>Pošalji</Button>
        </div>

        <div>
          Želim da se prijavim na newsletter<Switch checked={newsletterChecked}
                                                    onChange={(e) => setNewsletterChecked(e.target.checked)}/>
        </div>

        <If condition={emailSent}>
          <p style={{color: '#e61d1d', fontWeight: "bold"}}>Izveštaj je uspešno poslat na vašu e-mail adresu.</p>
        </If>
      </div>

    </If>
  </>)
}

export default App
