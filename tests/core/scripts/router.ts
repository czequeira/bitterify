import { createApp, createRoute, createRouter } from '../../../src/core';

const router = createRouter([
  createRoute('home', () => 'Home'),
  createRoute('about', () => 'About'),
  createRoute('router-with/$/param/$', ([v]) => `About: ${v}`),
]);

createApp(['Router', router.getComponent()]);
