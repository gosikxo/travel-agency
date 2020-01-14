import React from 'react';
import {Row, Col, Grid} from 'react-flexbox-grid';
import PageTitle from '../../common/PageTitle/PageTitle';
import PropTypes from 'prop-types';
import OrderSummary from '../OrderSummary/OrderSummary';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';


const OrderForm = ({options, tripCost}) => {
  const totalCost = calculateTotal(tripCost, options);
  const totalCostText = formatPrice(totalCost);
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <PageTitle text='Trip options' />
          <OrderSummary options={options} tripCost={totalCostText} />
        </Col>
      </Row>
    </Grid>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
};

export default OrderForm;