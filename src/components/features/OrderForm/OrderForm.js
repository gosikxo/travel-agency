import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import PageTitle from '../../common/PageTitle/PageTitle';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';


const OrderForm = ({ options, tripCost, setOrderOption}) => {
  const totalCost = calculateTotal(tripCost, options);
  const totalCostText = formatPrice(totalCost);
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <PageTitle text='Trip options' />
          {pricing.map(optionProps => (
            <Col md={4} key={optionProps.id}><OrderOption {...optionProps} setOrderOption={setOrderOption} currentValue={options[optionProps.id]}></OrderOption></Col>
          ))}
          <OrderSummary options={options} tripCost={totalCostText} />
        </Col>
      </Row>
    </Grid>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
};

export default OrderForm;