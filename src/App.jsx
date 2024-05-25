import React, {useEffect, useState} from 'react'
import './App.css'
import {Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

const months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const years = Array.from({length: 6}, (v, i) => currentYear - i);

function App() {
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
          onChange={(e) => setMonth(e.target.value)}
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
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
    </div>

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
            // inputProps={{ step: "0.01" }}
            variant="outlined"
            value={brojDana}
            onChange={(e) => setBrojDana(e.target.value)}
          />
        </td>
      </tr>
      </tbody>
    </table>

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
        <td>{utrosakPreuzetoVT}</td>
        <td>{utrosakPreuzetoNT}</td>
        <td>{utrosakIsporucenoVT}</td>
        <td>{utrosakIsporucenoNT}</td>
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
        <td>{utrosakUtrosenoVT}</td>
        <td>{utrosakUtrosenoNT}</td>
        <td>{utrosakVisakSledeciVT}</td>
        <td>{utrosakVisakSledeciNT}</td>
      </tr>
      </tbody>
    </table>

    <table border="1">
      <tr>
        <th colSpan="4">OBRAČUN ZA ELEKTRIČNU ENERGIJU</th>
      </tr>
      <tr>
        <th></th>
        <th rowSpan="2">TARIFA</th>
        <th>Utrošeno (kW/kWh)</th>
        <th>Cena po jedinici</th>
        <th>Iznos (dinara)</th>
      </tr>
      <tr>
        <th colSpan="5"></th>
      </tr>
      <tr>
        <th colSpan="5">Troškovi koje nezavisne od potrošnje električne energije</th>
      </tr>
      <tr>
        <td>1.</td>
        <td>Obračunska snaga (kW)</td>
        <td>11.04</td>
        <td>54.258</td>
        <td>599.01</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Trošak garantovanog snabdevača</td>
        <td colSpan="3">160.67</td>
      </tr>
      <tr>
        <th></th>
        <th>Utrošena električna energija</th>
        <td colSpan="3"></td>
      </tr>
      <tr>
        <td></td>
        <td>Zelena zona - Viša tarifa (VT)</td>
        <td>423</td>
        <td>9.1092</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Zelena zona - Niža tarifa (NT)</td>
        <td>362</td>
        <td>2.2773</td>
        <td>824.38</td>
      </tr>
      <tr>
        <td></td>
        <td>Plava zona - Viša tarifa (VT)</td>
        <td></td>
        <td>13.6638</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Plava zona - Niža tarifa (NT)</td>
        <td>61</td>
        <td>3.4160</td>
        <td>208.38</td>
      </tr>
      <tr>
        <td></td>
        <td>Crvena zona - Viša tarifa (VT)</td>
        <td></td>
        <td>27.3276</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Crvena zona - Niža tarifa (NT)</td>
        <td></td>
        <td>6.8319</td>
        <td></td>
      </tr>
      <tr>
        <td>3.</td>
        <th>UKUPNO ZA UTROŠENU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
        <td colSpan="3">1,032.76</td>
      </tr>
      <tr>
        <td></td>
        <th>Preuzeta električna energija</th>
        <td colSpan="3"></td>
      </tr>
      <tr>
        <td></td>
        <td>Zelena zona - Viša tarifa (VT)</td>
        <td>255</td>
        <td>9.1092</td>
        <td>2,322.85</td>
      </tr>
      <tr>
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td>107</td>
        <td>2.2773</td>
        <td>243.67</td>
      </tr>
      <tr>
        <td></td>
        <td>Plava zona - Viša tarifa (VT)</td>
        <td>761</td>
        <td>13.6638</td>
        <td>10,398.15</td>
      </tr>
      <tr>
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td>319</td>
        <td>3.4160</td>
        <td>1,089.7</td>
      </tr>
      <tr>
        <td></td>
        <td>Crvena zona - Viša tarifa (VT)</td>
        <td></td>
        <td>27.3276</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Niža tarifa (NT)</td>
        <td></td>
        <td>6.8319</td>
        <td></td>
      </tr>
      <tr>
        <td>4.</td>
        <th>UKUPNO ZA PREUZETU ELEKTRIČNU ENERGIJU U OBRAČUNSKOM PERIODU</th>
        <td colSpan="3">14,054.37</td>
      </tr>
      <tr>
        <td>5.</td>
        <td>Popust 5% za plaćanje prethodnog računa u roku dospeća</td>
        <td colSpan="3">-50.00</td>
      </tr>
      <tr>
        <td>6.</td>
        <td>Popust za elektronsku dostavu računa</td>
        <td colSpan="3">-50.00</td>
      </tr>
      <tr>
        <td>7.</td>
        <td>Naknada za podsticaj povlašćenih proizvođača el. en.</td>
        <td>1,442</td>
        <td>0.801</td>
        <td>1,155.04</td>
      </tr>
      <tr>
        <td>8.</td>
        <td>Naknada za unapređenje energetske efikasnosti</td>
        <td>423</td>
        <td>0.015</td>
        <td>6.35</td>
      </tr>
      <tr>
        <td>9.</td>
        <td>Naknada za obr. prist. DS za razliku preuzete i utrošene el. en.</td>
        <td>3.879</td>
        <td>0.970</td>
        <td>3,943.97</td>
      </tr>
      <tr>
        <td>10.</td>
        <td>Osnovica za obračun akcize (1+2+3+5+6+7+8+9)</td>
        <td colSpan="3">6,847.80</td>
      </tr>
      <tr>
        <td>11.</td>
        <td>Iznos akcize (stopa 7,5%)</td>
        <td colSpan="3">513.59</td>
      </tr>
      <tr>
        <td>12.</td>
        <td>Osnovica za PDV (9+10)</td>
        <td colSpan="3">7,361.39</td>
      </tr>
      <tr>
        <td>13.</td>
        <td>Iznos PDV (20%)</td>
        <td colSpan="3">1,472.28</td>
      </tr>
      <tr>
        <td>14.</td>
        <td>Umanjenje za energetski ugrožene kupce</td>
        <td colSpan="3">0.00</td>
      </tr>
      <tr>
        <td>15.</td>
        <td>ZADUŽENJE ZA OBRAČUNSKI PERIOD (1+2+3+5+6+7+8+9+11+13+14)</td>
        <td colSpan="3">8,833.66</td>
      </tr>
      <tr>
        <td>16.</td>
        <td>Taksa za javni medijski servis (ne ulazi u osnovicu za PDV po čl. 17,st.4,t.2ЗPDV)</td>
        <td colSpan="3">299.00</td>
      </tr>
      <tr>
        <th colSpan="2">UKUPNO ZADUŽENJE ZA OBRAČUNSKI PERIOD (15+16)</th>
        <td colSpan="3">9,132.66</td>
      </tr>
    </table>

    <table border="1">
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
    </table>

  </>)
}

export default App
