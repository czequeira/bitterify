import { mount } from '../../utils';

describe('events', () => {
  test('it should change the button text when click', async () => {
    const mounted = await mount('tests/core/scripts/button.ts');

    const button = mounted.querySelector('button');
    button?.click();

    expect(button?.innerText).toBe('clicked');
  });
});
