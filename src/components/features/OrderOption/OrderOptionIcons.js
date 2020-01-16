import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';

const IconOption = ({isActive, icon, price, name, onClick}) => {
  const iconClass = isActive ? styles.icon + ' ' + styles.iconActive : styles.icon;
  return <div 
    onClick={onClick} 
    className={iconClass}
  ><Icon name={icon}/> {name} {formatPrice(price)}</div>;
};

IconOption.propTypes = {
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

const OrderOptionIcons = ({values, currentValue, required, setOptionValue}) => {
  return (
    <div className={styles.component}>
      {
        !required && <IconOption 
          name="None"
          icon="times-circle"
          isActive={currentValue===''} 
          onClick={() => setOptionValue('')} 
        />
      }
      {
        values.map(value => <IconOption 
          {...value} 
          key={value.id}
          onClick={() => setOptionValue(value.id)}
          isActive={currentValue===value.id}
        />)
      }
    </div>
  );
};
  

OrderOptionIcons.propTypes = {
  values: PropTypes.array.isRequired,
  currentValue: PropTypes.string.isRequired,
  required: PropTypes.bool,
  setOptionValue: PropTypes.func.isRequired,
};

export default OrderOptionIcons;