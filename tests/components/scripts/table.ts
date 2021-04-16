import { app, bind, bitterTable, tableColumn } from '../../../src';

const data = bind([
  ['Bartolo', '100'],
  ['Maritza', '20'],
  ['Rozendo', '29'],
]);

const Table = bitterTable(data, [
  tableColumn('name', (d) => d[0]),
  tableColumn('age', (d) => d[1]),
]);

app([Table]);
