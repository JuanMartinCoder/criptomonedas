import React from 'react';

const Criptomoneda = ({criptomoneda}) => {
    return (
        <option value={criptomoneda.CoinInfo.Name}>{criptomoneda.CoinInfo.FullName}</option>
    );
};

export default Criptomoneda;