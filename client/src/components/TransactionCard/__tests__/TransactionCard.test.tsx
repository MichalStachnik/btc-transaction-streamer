import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TransactionCard from '../TransactionCard';

let mockTransaction =
  '{"op":"utx","x":{"lock_time":0,"ver":1,"size":374,"inputs":[{"sequence":4294967295,"prev_out":{"spent":true,"tx_index":495378695,"type":0,"addr":"1CGTxZoNPtaj2TR4dUYt2B1ykn2fQ9djw2","value":12909020,"n":0,"script":"76a9147b962060ae4cdf0d236f2530e4dbd0fdf362456488ac"},"script":"48304502210095b15635c10e51cad07ff024a7b19054feb4ec1a8b4dc23c0bb0f3e82733dfa9022073dad279124b8d4fefb6fda4b57fe37d0b85f4782c6a86298c4753a6d3912413012103a32572bb679fb0c0ae1b89a187e4379e26e0cf1c38a22db5fd693ab456af5aea"},{"sequence":4294967295,"prev_out":{"spent":true,"tx_index":495613718,"type":0,"addr":"1CGTxZoNPtaj2TR4dUYt2B1ykn2fQ9djw2","value":48637777,"n":0,"script":"76a9147b962060ae4cdf0d236f2530e4dbd0fdf362456488ac"},"script":"483045022100d8ea5461b51e818f23e3bd8249dcb66c561d4a0446cb74c166f32955258097c902204538bbee022b6ebdb1f0289a45cb45a985a991f382f59b09207f3ff80d1b8c2b012103a32572bb679fb0c0ae1b89a187e4379e26e0cf1c38a22db5fd693ab456af5aea"}],"time":1570486934,"tx_index":497952700,"vin_sz":2,"hash":"814b3029bd77083dca0ce61e189a96a00cfa60dc2dddf0c7f2ab42e4a9b51e60","vout_sz":2,"relayed_by":"127.0.0.1","out":[{"spent":false,"tx_index":497952700,"type":0,"addr":"18E486VERcdtjpNhCG4HcgriskfpcmHavQ","value":21545783,"n":0,"script":"76a9144f40e4f58bf996e55021d9c6a623ebfe996192b788ac"},{"spent":false,"tx_index":497952700,"type":0,"addr":"17QqLbTAjD9dYxhM85LhbAWqxo2VkAq9sA","value":40000000,"n":1,"script":"76a9144652ac15f535414bb069afa01cc848c84641334c88ac"}]}}';

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
  render(<TransactionCard block={mockTransaction} />, div);
  expect(div).toBeTruthy();
});

it('should render the correct hash', () => {
  render(<TransactionCard block={mockTransaction} />, div);
  const hash = div.querySelector('.block-hash').textContent;
  expect(hash).toBe(
    '814b3029bd77083dca0ce61e189a96a00cfa60dc2dddf0c7f2ab42e4a9b51e60'
  );
});

it('should render the correct time', () => {
  render(<TransactionCard block={mockTransaction} />, div);
  const time = div.querySelector('.block-time').textContent;
  expect(time).toBe('Mon Oct 07 2019 18:22:14');
});
