import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import BlockList from '../BlockList';


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
  render(<BlockList className="mock-class" toggleLoading={false}/>, div);
  expect(div).toBeTruthy();
});