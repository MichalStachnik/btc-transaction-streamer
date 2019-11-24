import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import SearchInput from '../SearchInput';

let div: any = null;
beforeEach(() => {
  div = document.createElement('div');
  document.body.appendChild(div);
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
  div = null;
});

it('renders without crashing', () => {
  render(<SearchInput />, div);
  expect(div).toBeTruthy();
});

it('should render the correct output address', () => {
  render(<SearchInput />, div);
  const address = div.querySelector('.address').textContent;
  expect(address).toBe('3FWg71HWvuZc9k2Fjg6TmKrJZ7iMmgiwzK');
});
