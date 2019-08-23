import React, {useEffect,useState} from 'react';

import axios from 'axios';

import Criptomoneda from './Criptomoneda'
import Error from './Error'

const FormularioAtr = (props) => {

    const {setCripto,setMoneda} = props;

    const [criptomonedas , setCriptomonedas] = useState([]);
    const [monedaCotizar, setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error , setError] = useState(false);

    useEffect(()=>{
        
        
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data);
            
        }

        consultarApi();

    },[])

    const cotizarMoneda = e => {
        e.preventDefault();

        if(monedaCotizar==='' || criptoCotizar===''){
            setError(true);
            return;
        }
        setCripto(criptoCotizar);
        setMoneda(monedaCotizar);
        setError(false);
        
    }

    const componentexd = (error) ? <Error mensaje="Ambos campos obligatorios"/> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componentexd}
            <div className="row">
                <label htmlFor="">Elegi tu moneda</label>
                <select name="" id="" className="u-full-width"
                    onChange={e => setMonedaCotizar(e.target.value)}
                >
                    <option value="">- Elige tu moneda</option>
                    <option value="USD">Dolar estadounidense</option>
                    <option value="ARS">Peso argentino</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div className="row">
                <label htmlFor="">Elegi la criptomoneda</label>
                <select name="" id="" className="u-full-width"
                    onChange={e => setCriptoCotizar(e.target.value)}
                >
                    <option value="">- Elige tu Criptomoneda</option>
                    {criptomonedas.map(criptomoneda => (
                        <Criptomoneda
                            criptomoneda={criptomoneda}
                            key={criptomoneda.CoinInfo.Id}
                        />
                    ))
                    
                    }
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Cotizar"/>
        </form>
    );
};

export default FormularioAtr;