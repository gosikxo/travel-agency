import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import { parseOptionPrice } from '../../../utils/parseOptionPrice';
import styles from './OrderOption.scss';


const OrderOptionNumber = ({currentValue, limits, price, setOptionValue}) => {
  const { min, max } = limits;
  const optionPrice = parseOptionPrice(price);
  return (
    <div className={styles.number}>
      <input 
        className={styles.inputSmall} 
        onChange={event => setOptionValue(event.currentTarget.value)}
        min={min} 
        max={max} 
        value={currentValue} 
        type="number" 
      />
      {formatPrice(optionPrice.value * currentValue)}
    </div>
  );
};

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number.isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  setOptionValue: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
};

export default OrderOptionNumber;