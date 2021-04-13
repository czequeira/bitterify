import { mount } from '../utils';

let mounted: Document;

describe('component-input', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/input.ts');
  });

  test('it shoul show the placeholder', () => {
    expect(mounted.querySelector('input')?.placeholder).toBe('placeholder');
  });

  test('it should mount a input and bind to a p', () => {
    const input = mounted.querySelector('input');
    expect(input?.value).toBe('not changed');

    if (input) {
      input.value = 'changed';
      input.dispatchEvent(new Event('input'));
    }

    expect(mounted.querySelector('p')?.innerText).toBe('changed');
  });
});
