import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import BlockList from '../BlockList';

let mockData = [`
  {"op":"utx","x":{"lock_time":598374,"ver":2,"size":247,"inputs":[{"sequence":4294967294,"prev_out":{"spent":true,"tx_index":497992778,"type":0,"addr":"3KTTm1gbpUrEnq9PA8cLoCBdV2enm4Yqp2","value":6798103526,"n":12,"script":"a914c2e201d624a8445ed8840e5d3466c4d6349b57d987"},"script":"1600146d01f959bd9fe7b752a4269c08581b1002ddb82e"}],"time":1570497833,"tx_index":497992910,"vin_sz":1,"hash":"17d08bf0696851e3ab7ab32c09e461454c6ac6046510436beedc9c059ec5870d","vout_sz":2,"relayed_by":"0.0.0.0","out":[{"spent":false,"tx_index":497992910,"type":0,"addr":"33Tfy35sGsArCrokQMSo9DRmZg5R2NBPcF","value":575976,"n":0,"script":"a914136a2f4e1452ec00f7911912726419794a72097d87"},{"spent":false,"tx_index":497992910,"type":0,"addr":"338aV2LQanL3BuWZ2UKziLiBqCGaMcfR4q","value":6797526367,"n":1,"script":"a9140fcdb45d4f6b20d4efefb49d4fa2720091c0342087"}]}}
  `
]

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
  render(<BlockList className="mock-class" transactionStream={mockData}/>, div);
  expect(div).toBeTruthy();
});