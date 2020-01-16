import React from 'react';
import PropTypes from 'prop-types'; 
import styles from './OrderOption.scss';


const OrderOptionNumber = ({currentValue, limits, setOptionValue}) => {
  const { min, max } = limits;
  return (
    <div className={styles.component}>
      <input 
        className={styles.inputSmall} 
        onChange={event => setOptionValue(Number.parseInt(event.currentTarget.value))}
        min={min} 
        max={max} 
        value={currentValue} 
        type="number" 
      />
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