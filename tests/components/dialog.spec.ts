import { mount } from '../utils';

let mounted: Document;

describe('component-dialog', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/dialog.ts');
  });

  test('it should mount a dialog not visible', () => {
    expect(mounted.querySelector('dialog')?.open).toBe(false);
    // The jsdom browser does not support dialog element!
  });
});
