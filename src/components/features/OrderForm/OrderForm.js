import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import PageTitle from '../../common/PageTitle/PageTitle';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import settings from '../../../data/settings';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripDetails) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    ...tripDetails,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({ options, tripCost, setOrderOption, tripDetails}) => {
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
          <Button onClick={() => sendOrder(options, tripCost, tripDetails)}>Order now!</Button>
        </Col>
      </Row>
    </Grid>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  tripDetails: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
};

export default OrderForm;