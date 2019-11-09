import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Output from '../Output';

let mockOuput = {
  addr: "1GqhSpGnMtN6FR6ESPbSnbbmv65VJwSbb9",
  n: 0,
  script: "76a914adbf9d62464dc5b6db99618e069ff8bac7074b5f88ac",
  spent: false,
  tx_index: 497946986,
  type: 0,
  value: 561896
}

let div: any = null;
beforeEach(() => {
  div = document.createElement("div");
  document.body.appendChild(div);
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
  div = null;
});

it('renders without crashing', () => {
  render(<Output output={mockOuput}/>, div);
  expect(div).toBeTruthy();
});

it('should render the correct output address', () => {
  render(<Output output={mockOuput}/>, div);
  const address = div.querySelector('.address').textContent;
  expect(address).toBe('1GqhSpGnMtN6FR6ESPbSnbbmv65VJwSbb9');
});

it('should render the correct output value', () => {
  render(<Output output={mockOuput}/>, div);
  const value = div.querySelector('.value').textContent;
  expect(value).toBe('561896');
});
