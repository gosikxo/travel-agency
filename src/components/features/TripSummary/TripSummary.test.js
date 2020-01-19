import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  const defaultProps = {
    id: '',
    image: '', 
    name: '', 
    cost: '',
    days: 1,

  };
  it('should render without crashing', () => {
    const id = 'abc';
    const component = shallow(<TripSummary {...defaultProps} id={id}/>);
    expect(component.exists(`Link[to="/trip/${id}"]`)).toEqual(true);
  });

  it('should render image with proper src and alt', () => {
    const image = 'nice_image';
    const name = 'nice image';
    const component = shallow(<TripSummary 
      {...defaultProps}
      image={image}
      name={name}
    />);

    expect(component.exists(`img[src="${image}"][alt="${name}"]`)).toEqual(true);
  });

  it('should render name, cost and days', () => {
    const name = 'nice image';
    const cost = '$10';
    const days = 5;
    const component = shallow(<TripSummary 
      {...defaultProps}
      name={name}
      cost={cost}
      days={days}
    />);
    expect(component.find('.title').text()).toEqual(name);
    expect(component.find('.details').text().includes(`${days} days`)).toEqual(true);
    expect(component.find('.details').text().includes(`from ${cost}`)).toEqual(true);
  });

  

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
});