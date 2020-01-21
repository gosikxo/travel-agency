import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  const defaultProps = {
    'id': 'accommodation',
    'name': 'Accommodation',
    'type': 'icons',
    'required': true,
    'defaultValue': 'hotel',
    'values': [
      {'id': 'hotel', 'icon': 'h-square', 'name': 'Hotel room', 'price': 0},
      {'id': 'suite', 'icon': 'building', 'name': 'Suite', 'price': 500},
      {'id': 'house', 'icon': 'home', 'name': 'House', 'price': 1000},
    ],
    setOrderOption: () => {},
    currentValue: 'hotel',
  };

  it('should render without crashing', () => {
    const component = shallow(<OrderOption {...defaultProps}/>);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render name', () => {
    const name = 'nice title';
    const component = shallow(<OrderOption {...defaultProps} name={name} />);
    expect(component.find('h3').text()).toEqual(name);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};
  
const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {currentValue: ''},
};
  
const testValue = mockProps.values[1].id;
const testValueNumber = 3;
  
for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
      
    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });
  
    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
          
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
          
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
          
        break;
      }

      case 'icons': {
        it('contains icons', () => {
          const icons = renderedSubcomponent.find('IconOption');
          expect(icons.at(0).props().name).toEqual('None');
          expect(icons.at(1).props().name).toEqual(mockProps.values[0].name);
          expect(icons.at(2).props().name).toEqual(mockProps.values[1].name);
        });

        it('should run setOrderOption function on icon click', () => {
          const specificId = mockProps.values[0].id;
          const icon = renderedSubcomponent.find(`IconOption[id="${specificId}"]`);
          icon.simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: specificId });
        });
        break;
      }

      case 'checkboxes': {
        it('contains options', () => {
          const inputs = renderedSubcomponent.find('input');
          expect(inputs.length).toEqual(mockProps.values.length);
          expect(inputs.at(0).props().value).toEqual(mockProps.values[0].id);
          expect(inputs.at(1).props().value).toEqual(mockProps.values[1].id);
        });

        it('should run setOrderOption function on input checked', () => {
          const input = renderedSubcomponent.find(`input[value="aaa"]`);
          input.simulate('change', { currentTarget: { checked: false }});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [] });

          const input2 = renderedSubcomponent.find(`input[value="xyz"]`);
          input2.simulate('change', { currentTarget: { checked: true }});
          expect(mockSetOrderOption).toBeCalledTimes(2);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: ['aaa', 'xyz'] });
        });
        break;
      }

      case 'number': {
        it('renders input with currentValue', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toEqual(1);
          expect(input.props().value).toEqual(mockPropsForType['number'].currentValue);
        });

        it('should run setOrderOption function on input change', () => {
          const input = renderedSubcomponent.find('input');
          input.simulate('change',{ currentTarget: { value: testValueNumber }});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      
      case 'text': {
        it('renders input with currentValue', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.length).toEqual(1);
          expect(input.props().value).toEqual(mockProps.currentValue);
        });

        it('should run setOrderOption function on input change', () => {
          const input = renderedSubcomponent.find('input');
          const testValue = 'cool job';
          input.simulate('change',{ currentTarget: { value: testValue }});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        const datePickerName = 't';
        it('renders DatePicker', () => {
          const datePicker = renderedSubcomponent.find(datePickerName);
          expect(datePicker).toBeTruthy();
          expect(datePicker.length).toEqual(1);
        });

        it('should run setOrderOption function on DatePicker change', () => {
          const datePicker = renderedSubcomponent.find(datePickerName);
          datePicker.simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}