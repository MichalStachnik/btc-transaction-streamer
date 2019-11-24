import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Transaction from '../Transaction';

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
  render(<Transaction />, div);
  expect(div).toBeTruthy();
});
