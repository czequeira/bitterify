import { mount } from '../utils';

describe('component-text', () => {
  test('it should mount all texts', async () => {
    const mounted = await mount('tests/components/scripts/text.ts');

    expect(mounted.querySelectorAll('p')[1]?.innerText).toBe('p');
    expect(mounted.querySelector('b')?.innerText).toBe('b');
    expect(mounted.querySelector('i')?.innerText).toBe('i');
    expect(mounted.querySelector('h1')?.innerText).toBe('h1');
    expect(mounted.querySelector('h2')?.innerText).toBe('h2');
    expect(mounted.querySelector('h3')?.innerText).toBe('h3');
    expect(mounted.querySelector('h4')?.innerText).toBe('h4');
    expect(mounted.querySelector('h5')?.innerText).toBe('h5');
    expect(mounted.querySelector('h6')?.innerText).toBe('h6');
    expect(mounted.querySelector('em')?.innerText).toBe('em');
    expect(mounted.querySelector('code')?.innerText).toBe('code');
    expect(mounted.querySelector('pre')?.innerText).toBe('pre');
    expect(mounted.querySelector('strong')?.innerText).toBe('strong');
    expect(mounted.querySelector('u')?.innerText).toBe('u');
  });
});
