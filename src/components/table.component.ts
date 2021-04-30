import { createComponent } from '../core';
import { Bind, Component } from '../core/classes';
import { BitterifyError } from '../core/errors';
import { Child } from '../core/types';

interface ITableColumn {
  header: string;
  body: (arg: any) => Child;
}

export function tableColumn(
  header: string,
  body: (arg: any) => Child,
): ITableColumn {
  return { header, body };
}

function createBody(bind: Bind, tableColumns: ITableColumn[]): Component {
  if (!Array.isArray(bind.value))
    throw new BitterifyError('the bind must be an array');

  return createComponent(
    'tbody',
    undefined,
    bind.value.map((i) =>
      createComponent(
        'tr',
        undefined,
        tableColumns.map((k) => createComponent('td', undefined, [k.body(i)])),
      ),
    ),
  );
}

export function table(bind: Bind, tableColumns: ITableColumn[]): Component {
  const thead = createComponent('thead', undefined, [
    createComponent(
      'tr',
      undefined,
      tableColumns.map((i) => createComponent('th', i.header)),
    ),
  ]);
  let tbody = createBody(bind, tableColumns);
  const table = createComponent('table', undefined, [thead, tbody]);

  bind.subscribeCallback('id', (data) => {
    tbody = createBody(data, tableColumns);
    table.setChilds([thead, tbody]);
  });

  return table;
}
