import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import NavItem from '../NavItem';

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
  render(<NavItem name="test name"></NavItem>, div);
  expect(div).toBeTruthy();
});
