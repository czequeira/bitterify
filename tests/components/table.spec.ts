import { mount } from '../utils';

describe('component-table', () => {
  test('it should mount a table', async () => {
    const mounted = await mount('tests/components/scripts/table.ts');

    expect(mounted.querySelector('table')).toBeTruthy();
    expect(mounted.querySelectorAll('tr').length).toBe(4);
  });
});
