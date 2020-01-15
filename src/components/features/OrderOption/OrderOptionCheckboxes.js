import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './OrderOption.scss';

const newValueSet = (currentValue, id, checked) => {
  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue}) => (
  <div className={styles.checkboxes}>
    {values.map(value => 
      <div key={value.id}>
        <label>
          {`${value.name} (${formatPrice(value.price)})`}
          <input 
            type="checkbox" 
            value={value.id} 
            name={value.name}
            checked={currentValue.includes(value.id)} 
            onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
          />
        </label>
      </div>
    )}
  </div>
);


OrderOptionCheckboxes.propTypes = {
  values: PropTypes.array.isRequired,
  currentValue: PropTypes.array.isRequired,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionCheckboxes;