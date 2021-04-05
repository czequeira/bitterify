import { mount } from '../utils';

let mounted: Document;

describe('component-button', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/button.ts');
  });

  test('it should mount a button', () => {
    expect(mounted.querySelector('button')).toBeDefined();
  });

  test('it should change button text at click', () => {
    const button = mounted.querySelector('button');
    expect(button?.innerText).toBe('before click');
    button?.click();
    expect(button?.innerText).toBe('after click');
  });
});
