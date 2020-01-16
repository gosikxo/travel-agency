import DatePicker from 'react-datepicker';
import React from 'react';
import PropTypes from 'prop-types'; 
import styles from './OrderOption.scss';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({currentValue, setOptionValue}) =>  (
  <div className={styles.component}>
    <DatePicker 
      selected={currentValue ? currentValue : new Date()} 
      onChange={date => setOptionValue(date)} 
    />
  </div>
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.date,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionDate;