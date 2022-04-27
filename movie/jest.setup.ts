// WARNING: jest-preset-angular must be the first import!
import 'jest-preset-angular/setup-jest';

// Globals mocks
/* eslint no-empty-function: ["error", { "allow": ["arrowFunctions"] }] */
window.matchMedia =
  window.matchMedia ||
  (() =>
    ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    } as unknown as MediaQueryList));

//jest.setTimeout(30000);

//mock sync rwc config
Object.defineProperty(document.defaultView, 'MOBI_RWC_CONFIG', { value: {} });
