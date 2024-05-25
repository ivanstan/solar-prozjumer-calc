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
        <th colSpan="2">Obračunska snaga:</th>
        <td colSpan="10">11.04 kW</td>
      </tr>
      <tr>
        <th colSpan="2">Proizvedena el. energija:</th>
        <td colSpan="10">1,000 0</td>
      </tr>
      <tr>
        <th colSpan="2">Isporučena el. energija:</th>
        <td colSpan="10">0 kW/h</td>
      </tr>
      <tr>
        <th colSpan="2">Broj dana:</th>
        <td colSpan="10">31</td>
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
        <th>DIRETNO POTROŠENO</th>
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
