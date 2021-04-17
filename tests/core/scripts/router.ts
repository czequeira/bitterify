import { createApp, createRoute, createRouter } from '../../../src/core';

const router = createRouter([
  createRoute('home', 'Home'),
  createRoute('about', 'About'),
]);

createApp(['Router', router.getComponent()]);
