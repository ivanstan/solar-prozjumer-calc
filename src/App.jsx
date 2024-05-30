import React, {useEffect, useState} from 'react'
import './App.css'
import {Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import Cell from "./components/Cell.jsx";

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const years = Array.from({length: 6}, (v, i) => currentYear - i);

const renderNumber = (value) => {
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
  const [brojDana, setBrojDana] = useState(31); // ToDo: mozda u odnosu na mesec

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

  useEffect(() => {
    setUtrosakPreuzetoVT(novoPreuzetoVT - prethodnoPreuzetoVT);
  }, [novoPreuzetoVT, prethodnoPreuzetoVT]);

  useEffect(() => {
    setUtrosakPreuzetoNT(novoPreuzetoNT - prethodnoPreuzetoNT);
  }, [prethodnoPreuzetoNT, novoPreuzetoNT]);

  useEffect(() => {
    setUtrosakIsporucenoVT(novoIsporucenoVT - prethodnoIsporucenoVT);
  }, [prethodnoIsporucenoVT, novoIsporucenoVT]);

  useEffect(() => {
    setUtrosakIsporucenoNT(novoIsporucenoNT - prethodnoIsporucenoNT);
  }, [prethodnoIsporucenoNT, novoIsporucenoNT]);

  useEffect(() => {
    if (utrosakPreuzetoVT < (utrosakIsporucenoVT + utrosakVisakPrethodnoVT)) {
      setUtrosakUtrosenoVT(0);
    } else {
      setUtrosakUtrosenoVT(utrosakPreuzetoVT - utrosakIsporucenoVT - utrosakVisakPrethodnoVT);
    }
  }, [utrosakPreuzetoVT, utrosakIsporucenoVT, utrosakVisakPrethodnoVT]);

  useEffect(() => {
    if (utrosakPreuzetoNT < (utrosakIsporucenoNT + utrosakVisakPrethodnoNT)) {
      setUtrosakUtrosenoNT(0);
    } else {
      setUtrosakUtrosenoNT(utrosakPreuzetoNT - utrosakIsporucenoNT - utrosakVisakPrethodnoNT);
    }
  }, [utrosakPreuzetoNT, utrosakIsporucenoNT, utrosakVisakPrethodnoNT]);


  useEffect(() => {
    if (utrosakPreuzetoVT < (utrosakIsporucenoVT + utrosakVisakPrethodnoVT)) {
      setUtrosakVisakSledeciVT(utrosakIsporucenoVT + utrosakVisakPrethodnoVT - utrosakPreuzetoVT);
    } else {
      setUtrosakVisakSledeciVT(0);
    }
  }, [utrosakPreuzetoVT, utrosakIsporucenoVT, utrosakVisakPrethodnoVT]);

  useEffect(() => {
    if (utrosakPreuzetoNT < (utrosakIsporucenoNT + utrosakVisakPrethodnoNT)) {
      setUtrosakVisakSledeciNT(utrosakIsporucenoNT + utrosakVisakPrethodnoNT - utrosakPreuzetoNT);
    } else {
      setUtrosakVisakSledeciNT(0);
    }
  }, [utrosakPreuzetoNT, utrosakIsporucenoNT, utrosakVisakPrethodnoNT]);

  useEffect(() => {
      setObracunskaSnagaIznos((obracunskaSnaga * cenaPoJedinici).toFixed(2))
  }, [obracunskaSnaga, cenaPoJedinici]);

  useEffect(() => {
    setUtrosenaElektricnaEnergija(utrosakUtrosenoVT + utrosakUtrosenoNT)
  }, [utrosakUtrosenoVT, utrosakUtrosenoNT]);

  const donjaGranicaZelenaTarifa = 0;
  const [donjaGranicaPlavaTarifa, setDonjaGranicaPlavaTarifa] = useState(0);
  const [donjaGranicaCrvenaTarifa, setDonjaGranicaCrvenaTarifa] = useState(0);

  useEffect(() => {
    setDonjaGranicaPlavaTarifa(Math.round(brojDana * 11.667));
  }, [brojDana]);

  useEffect(() => {
    setDonjaGranicaCrvenaTarifa(Math.round(brojDana * 53.333));
  }, [brojDana]);

  console.log('Donja granica za plavu tarifu: ' + donjaGranicaPlavaTarifa);
  console.log('Donja granica za crvenu tarifu: ' + donjaGranicaCrvenaTarifa);

  /**
   * Zelena
   */
  const [utrosenaZelenaTarifaVTUtroseno, setUtrosenaZelenaTarifaVTUtroseno] = useState(0);
  const utrosenaZelenaTarifaVTCenaPoJedinici = 9.1092;
  const [utrosenaZelenaTarifaVTIznos, setUtrosenaZelenaTarifaVTIznos] = useState(0);

  const [utrosenaZelenaTarifaNTUtroseno, setUtrosenaZelenaTarifaNTUtroseno] = useState(0);
  const utrosenaZelenaTarifaNTCenaPoJedinici = 2.2773;
  const [utrosenaZelenaTarifaNTIznos, setUtrosenaZelenaTarifaNTIznos] = useState(0);

  useEffect(() => {
    setUtrosenaZelenaTarifaVTIznos((utrosenaZelenaTarifaVTUtroseno * utrosenaZelenaTarifaVTCenaPoJedinici).toFixed(2))
  }, [utrosenaZelenaTarifaVTUtroseno]);

  useEffect(() => {
    setUtrosenaZelenaTarifaNTIznos((utrosenaZelenaTarifaNTUtroseno * utrosenaZelenaTarifaNTCenaPoJedinici).toFixed(2))
  }, [utrosenaZelenaTarifaNTUtroseno]);

  useEffect(() => {
    if (utrosakUtrosenoVT === 0) {
      setUtrosenaZelenaTarifaVTUtroseno(0);
    } else {
      if (donjaGranicaPlavaTarifa < utrosenaElektricnaEnergija) {
        setUtrosenaZelenaTarifaVTUtroseno(Math.round(utrosakUtrosenoVT * donjaGranicaPlavaTarifa / utrosenaElektricnaEnergija))
      } else {
        setUtrosenaZelenaTarifaVTUtroseno(utrosakUtrosenoVT)
      }
    }
  }, [utrosenaElektricnaEnergija, utrosakUtrosenoVT, donjaGranicaPlavaTarifa]);

  useEffect(() => {
    if (utrosakUtrosenoNT === 0) {
      setUtrosenaZelenaTarifaNTUtroseno(0);
    } else {
      if (donjaGranicaPlavaTarifa < utrosenaElektricnaEnergija) {
        setUtrosenaZelenaTarifaNTUtroseno(Math.round(utrosakUtrosenoNT * donjaGranicaPlavaTarifa / utrosenaElektricnaEnergija))
      } else {
        setUtrosenaZelenaTarifaNTUtroseno(utrosakUtrosenoNT)
      }
    }
  }, [utrosenaElektricnaEnergija, utrosakUtrosenoNT, donjaGranicaPlavaTarifa]);

  /**
   * Plava
   */
  const [utrosenaPlavaTarifaVTUtroseno, setUtrosenaPlavaTarifaVTUtroseno] = useState(0);
  const utrosenaPlavaTarifaVTCenaPoJedinici = 13.6638;
  const [utrosenaPlavaTarifaVTIznos, setUtrosenaPlavaTarifaVTIznos] = useState(0);

  const [utrosenaPlavaTarifaNTUtroseno, setUtrosenaPlavaTarifaNTUtroseno] = useState(0);
  const utrosenaPlavaTarifaNTCenaPoJedinici = 3.4160;
  const [utrosenaPlavaTarifaNTIznos, setUtrosenaPlavaTarifaNTIznos] = useState(0);

  useEffect(() => {
    setUtrosenaPlavaTarifaVTIznos((utrosenaPlavaTarifaVTUtroseno * utrosenaPlavaTarifaVTCenaPoJedinici).toFixed(2))
  }, [utrosenaPlavaTarifaVTUtroseno]);

  useEffect(() => {
    setUtrosenaPlavaTarifaNTIznos((utrosenaPlavaTarifaNTUtroseno * utrosenaPlavaTarifaNTCenaPoJedinici).toFixed(2))
  }, [utrosenaPlavaTarifaNTUtroseno]);

  useEffect(() => {
    if (utrosenaZelenaTarifaVTUtroseno > utrosakUtrosenoVT) {
      setUtrosenaPlavaTarifaVTUtroseno(0);
    } else {
      if (utrosenaZelenaTarifaVTUtroseno < donjaGranicaCrvenaTarifa) {
        setUtrosenaPlavaTarifaVTUtroseno(utrosakUtrosenoVT - utrosenaZelenaTarifaVTUtroseno);
      } else {
        setUtrosenaPlavaTarifaVTUtroseno(Math.round(utrosakUtrosenoVT * donjaGranicaCrvenaTarifa / utrosenaElektricnaEnergija));
      }
    }
  }, [utrosenaElektricnaEnergija, utrosenaZelenaTarifaVTUtroseno, donjaGranicaCrvenaTarifa, utrosakUtrosenoVT]);

  useEffect(() => {
    if (utrosenaZelenaTarifaNTUtroseno > utrosakUtrosenoNT) {
      setUtrosenaPlavaTarifaNTUtroseno(0);
    } else {
      if (utrosenaZelenaTarifaNTUtroseno < donjaGranicaCrvenaTarifa) {
        setUtrosenaPlavaTarifaNTUtroseno(utrosakUtrosenoNT - utrosenaZelenaTarifaNTUtroseno);
      } else {
        setUtrosenaPlavaTarifaNTUtroseno(Math.round(utrosakUtrosenoNT * donjaGranicaCrvenaTarifa / utrosenaElektricnaEnergija));
      }
    }
  }, [utrosenaElektricnaEnergija, utrosenaZelenaTarifaNTUtroseno, donjaGranicaCrvenaTarifa, utrosakUtrosenoNT]);

  /**
   * Crvena
   */
  const [utrosenaCrvenaTarifaVTUtroseno, setUtrosenaCrvenaTarifaVTUtroseno] = useState(0);
  const utrosenaCrvenaTarifaVTCenaPoJedinici = 27.3276;
  const [utrosenaCrvenaTarifaVTIznos, setUtrosenaCrvenaTarifaVTIznos] = useState(0);

  const [utrosenaCrvenaTarifaNTUtroseno, setUtrosenaCrvenaTarifaNTUtroseno] = useState(0);
  const utrosenaCrvenaTarifaNTCenaPoJedinici = 6.8319;
  const [utrosenaCrvenaTarifaNTIznos, setUtrosenaCrvenaTarifaNTIznos] = useState(0);

  useEffect(() => {
    setUtrosenaCrvenaTarifaVTIznos((utrosenaCrvenaTarifaVTUtroseno * utrosenaCrvenaTarifaVTCenaPoJedinici).toFixed(2))
  }, [utrosenaCrvenaTarifaVTUtroseno]);

  useEffect(() => {
    setUtrosenaCrvenaTarifaNTIznos((utrosenaCrvenaTarifaNTUtroseno * utrosenaCrvenaTarifaNTCenaPoJedinici).toFixed(2))
  }, [utrosenaCrvenaTarifaNTUtroseno]);

  useEffect(() => {
    if (utrosenaZelenaTarifaVTUtroseno + utrosenaPlavaTarifaVTUtroseno < utrosakUtrosenoVT) {
      setUtrosenaCrvenaTarifaVTUtroseno(utrosakUtrosenoVT - utrosenaZelenaTarifaVTUtroseno - utrosenaPlavaTarifaVTUtroseno);
    } else {
      setUtrosenaCrvenaTarifaVTUtroseno(0);
    }
  }, [utrosenaZelenaTarifaVTUtroseno, utrosenaPlavaTarifaVTUtroseno, donjaGranicaCrvenaTarifa, utrosakUtrosenoVT]);

  useEffect(() => {
    if (utrosenaZelenaTarifaNTUtroseno + utrosenaPlavaTarifaNTUtroseno < utrosakUtrosenoNT) {
      setUtrosenaCrvenaTarifaNTUtroseno(utrosakUtrosenoNT - utrosenaZelenaTarifaNTUtroseno - utrosenaPlavaTarifaNTUtroseno);
    } else {
      setUtrosenaCrvenaTarifaNTUtroseno(0);
    }
  }, [utrosenaZelenaTarifaNTUtroseno, utrosenaPlavaTarifaNTUtroseno, donjaGranicaCrvenaTarifa, utrosakUtrosenoNT]);

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
            <TextField
              type="number"
              // inputProps={{ step: "0.01" }}
              variant="outlined"
              value={obracunskaSnaga}
              onChange={(e) => setObracunskaSnaga(e.target.value)}
            />kW
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
            />
            0
          </td>
        </tr>
        <tr>
          <th>Isporučena el. energija:</th>
          <td>0 kW/h</td>
        </tr>
        <tr>
          <th>Broj dana:</th>
          <td>
            <TextField
              type="number"
              inputProps={{ max: 31, min: 1 }}
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
        <td rowSpan={2}>1,032.76</td>
        <td colSpan={3}>Bez solarnih panela</td>
      </tr>
      <tr>
        <th>Utrošeno (kW/kWh)</th>
        <th>Cena po jedinici</th>
        <th>Iznos (dinara)</th>
      </tr>
      <tr>
        <th colSpan={3}>Preuzeta električna energija</th>
        <td align="right">1,442</td>
        <td></td>
        <td></td>
        <td align="right">2,442</td>
        <td></td>
        <td></td>
      </tr>
      <tr className="green">
        <td></td>
        <td rowSpan={2}>Zelena zona</td>
        <td>Viša tarifa (VT)</td>
        <td align="right">255</td>
        <td align="right">9.1092</td>
        <td align="right">2,322.85</td>
        <td align="right">299</td>
        <td align="right">9.1092</td>
        <td align="right">2,723.65</td>
      </tr>
      <tr className="green">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td align="right">107</td>
        <td align="right">2.2773</td>
        <td align="right">243.67</td>
        <td align="right">63</td>
        <td align="right">2.2773</td>
        <td align="right">143.47</td>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr className="blue">
        <td></td>
        <td rowSpan={2}>Plava zona</td>
        <td>Viša tarifa (VT)</td>
        <td align="right">761</td>
        <td align="right">13.6638</td>
        <td align="right">10,398.15</td>
        <td align="right">1066</td>
        <td align="right">13.6638</td>
        <td align="right">14,565.61</td>
      </tr>
      <tr className="blue">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td align="right">319</td>
        <td align="right">3.4160</td>
        <td align="right">1,089.7</td>
        <td align="right">225</td>
        <td align="right">3.4160</td>
        <td align="right">768.60</td>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr className="red">
        <td></td>
        <td rowSpan={2}>Crvena zona</td>
        <td>Viša tarifa (VT)</td>
        <td></td>
        <td align="right">27.3276</td>
        <td></td>
        <td align="right">651</td>
        <td align="right">27.3276</td>
        <td align="right">17,790.27</td>
      </tr>
      <tr className="red">
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td></td>
        <td align="right">6.8319</td>
        <td></td>
        <td align="right">138</td>
        <td align="right">6.8319</td>
        <td align="right">942.80</td>
      </tr>
      <tr>
        <td colSpan={9}>&nbsp;</td>
      </tr>
      <tr>
        <td>4.</td>
        <th colSpan={2}>UKUPNO ZA PREUZETU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
        <td></td>
        <td></td>
        <td align="right">14,054.37</td>
        <td></td>
        <td></td>
        <td align="right">36,934.40</td>
      </tr>
      <tr>
        <td>5.</td>
        <td colSpan={2} align="left">Popust 5% za plaćanje prethodnog računa u roku dospeća</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>6.</td>
        <td colSpan={2} align="left">Popust za elektronsku dostavu računa</td>
        <td></td>
        <td></td>
        <td align="right">-50.00</td>
        <td></td>
        <td></td>
        <td align="right">-50</td>
      </tr>
      <tr>
        <td>7.</td>
        <td colSpan={2} align="left">Naknada za podsticaj povlašćenih proizvođača el. en.</td>
        <td align="right">1,442</td>
        <td align="right">0.801</td>
        <td align="right">1,155.04</td>
        <td align="right">2,442</td>
        <td align="right">0.801</td>
        <td align="right">1,956.04</td>
      </tr>
      <tr>
        <td>8.</td>
        <td colSpan={2} align="left">Naknada za unapređenje energetske efikasnosti</td>
        <td align="right">423</td>
        <td align="right">0.015</td>
        <td align="right">6.35</td>
        <td align="right">2,442</td>
        <td align="right">0.015</td>
        <td align="right">36.63</td>
      </tr>
      <tr>
        <td>9.</td>
        <td colSpan={2} align="left">Naknada za obr. prist. DS za razliku preuzete i utrošene el. en.</td>
        <td align="right">3.879</td>
        <td align="right">0.970</td>
        <td align="right">3,943.97</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>10.</td>
        <td colSpan={2} align="left">Osnovica za obračun akcize (1+2+3+5+6+7+8+9)</td>
        <td></td>
        <td></td>
        <td>6,847.80</td>
        <td></td>
        <td></td>
        <td>39,636.75</td>
      </tr>
      <tr>
        <td>11.</td>
        <td colSpan={2} align="left">Iznos akcize (stopa 7,5%)</td>
        <td></td>
        <td></td>
        <td align="right">513.59</td>
        <td></td>
        <td></td>
        <td align="right">2,972.76</td>
      </tr>
      <tr>
        <td>12.</td>
        <td colSpan={2} align="left">Osnovica za PDV (9+10)</td>
        <td></td>
        <td></td>
        <td align="right">7,361.39</td>
        <td></td>
        <td></td>
        <td align="right">42,609.51</td>
      </tr>
      <tr>
        <td>13.</td>
        <td colSpan={2} align="left">Iznos PDV (20%)</td>
        <td></td>
        <td></td>
        <td align="right">1,472.28</td>
        <td></td>
        <td></td>
        <td align="right">8,521.90</td>
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
        <td align="right">8,833.66</td>
        <td></td>
        <td></td>
        <td align="right">51,131.41</td>
      </tr>
      <tr>
        <td>16.</td>
        <td colSpan={2} align="left">
          Taksa za javni medijski servis (ne ulazi u osnovicu za PDV po čl. 17,st.4,t.2ЗPDV)
        </td>
        <td></td>
        <td></td>
        <td align="right">299.00</td>
        <td></td>
        <td></td>
        <td align="right">299.00</td>
      </tr>
      <tr>
        <th colSpan={3} align="left">UKUPNO ZADUŽENJE ZA OBRAČUNSKI PERIOD (15+16)</th>
        <td></td>
        <td></td>
        <td align="right">9,132.66</td>
        <td></td>
        <td></td>
        <td align="right">51,430.41</td>
      </tr>
      </tbody>
    </table>

    <table border="1">
      <tbody>
      <tr>
        <th>UŠTEDA U DINARIMA</th>
        <td>42,297.75</td>
        <td>RSD</td>
      </tr>
      <tr>
        <th>UŠTEDA U PROCENTIMA</th>
        <td>82.24</td>
        <td>%</td>
      </tr>
      <tr>
        <th colSpan="3"></th>
      </tr>
      <tr>
        <th>UKUPNO PROIZVEDENA EL. ENERGIJA</th>
        <td>1,000</td>
        <td>kWh</td>
      </tr>
      <tr>
        <th>PREDATO KAO VIŠAK</th>
        <td>331</td>
        <td>kWh</td>
      </tr>
      <tr>
        <th>DIREKTNO POTROŠENO</th>
        <td>669</td>
        <td>kWh</td>
      </tr>
      <tr>
        <th>PROCENAT DIREKTNE POTROŠNJE</th>
        <td>66.90</td>
        <td>%</td>
      </tr>
      <tr>
        <th>UGALJ C</th>
        <td colSpan="2"></td>
      </tr>
      <tr>
        <th>CO2</th>
        <td colSpan="2"></td>
      </tr>
      <tr>
        <th>drveće</th>
        <td colSpan="2"></td>
      </tr>
      </tbody>
    </table>

  </>)
}

export default App
