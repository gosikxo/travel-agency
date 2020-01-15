import {connect} from 'react-redux';
import OrderForm from './OrderForm';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';

const mapStateToProps = (state) => {
  const options = getOrderOptions(state);

  return {
    options,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setOrderOption: (orderOption) => dispatch(setOrderOption(orderOption)),
});

export default connect(mapStateToProps,mapDispatchToProps)(OrderForm);
