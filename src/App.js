import React,{useState,useEffect} from 'react';

import imagenCripto from './cryptomonedas.png'; 
import axios from 'axios';

import FormularioAtr from './componentes/FormularioAtr'
import Cotizacion from './componentes/Cotizacion'

import './index.css'

const App = () => {


  const [moneda,setMoneda] = useState('');
  const [cripto,setCripto] = useState('');
  const [resultado, setResultado] = useState({});

  useEffect(
    () => {
      const cotizarCriptomoneda = async () =>{

        if(moneda==='')return;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

        const resultado = await axios.get(url);
        setResultado(resultado.data.DISPLAY[cripto][moneda]);
      }

      cotizarCriptomoneda();
    },[cripto,moneda]
  )


  return (
    <div className="container">
      <div className="row">
          <div className="one-half column">
            <img src={imagenCripto} alt="Imagen cripto" className="logotipo"/>
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas al instante</h1>
            <FormularioAtr
              setMoneda={setMoneda}
              setCripto={setCripto}
              
            />
            <Cotizacion
              resultado={resultado}
            />
          </div>
      </div>
    </div>
  );
};

export default App;