import React from 'react';
import PropTypes from 'prop-types'; 
import styles from './OrderOption.scss';


const OrderOptionText = ({currentValue, setOptionValue}) => {
  return (
    <div className={styles.number}>
      <input 
        className={styles.inputSmall} 
        onChange={event => setOptionValue(event.currentTarget.value)}
        value={currentValue} 
        type="text" 
      />
    </div>
  );
};

OrderOptionText.propTypes = {
  currentValue: PropTypes.string.isRequired,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionText;