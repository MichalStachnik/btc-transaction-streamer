import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';



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
  render(
    <BrowserRouter>
      <Header isLoading={false}/>
    </BrowserRouter>,
    div);
  expect(div).toBeTruthy();
});
