import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TransactionCardList from '../TransactionCardList';

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
  render(
    <TransactionCardList className="mock-class" toggleLoading={false} />,
    div
  );
  expect(div).toBeTruthy();
});
