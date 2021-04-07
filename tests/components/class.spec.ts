import { mount } from '../utils';

let mounted: Document;

describe('component-class', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/class.ts');
  });

  test('it should add the example class to the elements', () => {
    expect(mounted.getElementsByClassName('example').length).toBe(2);
  });

  test('it should change the class of a element', () => {
    expect(mounted.getElementsByClassName('example2').length).toBe(1);
  });

  test('it should add a class', () => {
    expect(mounted.getElementsByClassName('example3').length).toBe(2);
  });

  test('it should remove a class', () => {
    expect(mounted.getElementsByClassName('example4').length).toBe(1);
  });
});
