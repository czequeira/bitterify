import { mount } from '../utils';

let mounted: Document;

describe('component-form', () => {
  beforeEach(async () => {
    mounted = await mount('tests/components/scripts/form.ts');
  });

  test('it should mount a form', () => {
    expect(mounted.querySelector('form')).toBeTruthy();
  });

  test('it should validate the form', () => {
    const input = mounted.querySelector('input');
    if (input instanceof HTMLInputElement) input.value = 'invalid';

    const submit = mounted.querySelector('button');
    submit?.click();

    expect(input?.matches(':invalid')).toBe(true);
  });
});
