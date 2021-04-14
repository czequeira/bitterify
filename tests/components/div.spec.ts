import { mount } from '../utils';

let mounted: Document;

describe('component-div', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/div.ts');
  });

  test('it should mount a div', () => {
    expect(mounted.querySelectorAll('div').length).toBeGreaterThan(1);
  });

  test('it should mount all divs', () => {
    const divs = mounted.querySelectorAll('div');

    expect(divs.length).toBe(4);
    expect(divs[3].textContent).toBe('div 3');
    expect(divs[1].textContent).toBe('div 1div 3');
  });

  test('it should mount the section and article', () => {
    expect(mounted.querySelector('section')).toBeTruthy();
    expect(mounted.querySelector('article')).toBeTruthy();
  });
});
