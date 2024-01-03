import { group, sleep } from 'k6';
import Login from "./tests/scenarios/auth/Login.js";
import Contacts from "./tests/scenarios/exemples/Contacts.js";
import News from "./tests/scenarios/exemples/News.js";
import k6Reporter from './tests/scenarios/exemples/k6Reporter.js';


export default () => {
  group('Endpoint Login - Controller authLogin - OnionArchitecture.Api', () => {
    Login();
  });

  group('Endpoint exemples Contacts - Controller contacts - OnionArchitecture.Api', () => {
    Contacts();
  });

  group('Endpoint News - Controller news - OnionArchitecture.Api', () => {
    News();
  });

  sleep(1);
}

// group('Endpoint Reporte - Controller Reporte - OnionArchitecture.Api', () => {
//  k6Reporter();
// });