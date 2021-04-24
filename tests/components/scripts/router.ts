import { app, bitterA, bitterH1 } from '../../../src';
import { bitterRouter } from '../../../src/components/router.component';

const home = () => bitterH1('Home');
const about = () => bitterH1('About');
const hello = ([name]: string[]) => bitterH1(`Hello ${name}`);

const aHome = bitterA('Home', '#home');
const aAbout = bitterA('About', '#about');
const aHello = bitterA('Hello', '#hello/Bartolo');

const router = bitterRouter([
  { path: 'home', view: home },
  { path: 'about', view: about },
  { path: 'hello/$', view: hello },
]);

app([aHome, aAbout, aHello, router]);
