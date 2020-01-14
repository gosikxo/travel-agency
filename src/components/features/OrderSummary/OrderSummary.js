import React from 'react';
import styles from './OrderSummary.scss';
import PropTypes from 'prop-types';

const OrderSummary = ({tripCost}) => (
  <h2 className={styles.component}>Total: <strong>{tripCost}</strong></h2>
);

OrderSummary.propTypes = {
  tripCost: PropTypes.string.isRequired,
};

export default OrderSummary;