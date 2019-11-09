import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Input from '../Input';

let mockInput = {
  prev_out: {
    addr: "3FWg71HWvuZc9k2Fjg6TmKrJZ7iMmgiwzK",
    n: 0,
    script: "a914979d0e8860254d1e264a1e6f0c931203324db27987",
    spent: true,
    tx_index: 497948584,
    type: 0,
    value: 1828097
  },
  script: "1600147b9f0fca12b46430ba3cedd914ae883202ea11ee",
  sequence: 4294967295
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
  render(<Input input={mockInput}/>, div);
  expect(div).toBeTruthy();
});

it('should render the correct output address', () => {
  render(<Input input={mockInput}/>, div);
  const address = div.querySelector('.address').textContent;
  expect(address).toBe('3FWg71HWvuZc9k2Fjg6TmKrJZ7iMmgiwzK');
});

it('should render the correct output value', () => {
  render(<Input input={mockInput}/>, div);
  const value = div.querySelector('.value').textContent;
  expect(value).toBe('1828097');
});
