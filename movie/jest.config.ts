import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageDirectory: '../../coverage',
  coverageReporters: ['html', 'text-summary', 'cobertura'],
  collectCoverageFrom: [
    '**/src/{lib,app}/**/*.{ts,js}',
    '!**/public{_,-}api.ts',
    '!**/index.ts',
    '!**/*.module.ts',
    '!**/*.spec.pact.ts',
  ],
  coverageThreshold: { global: { statements: 81 } },
  reporters: ['default', ['jest-junit', { outputDirectory: 'test-results' }]],
  moduleNameMapper: {
    // '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|css|less)$':
    //   '<rootDir>/jest.mocks.ts',
    // '@mobi/cch-checktool-rwc/(.*)': '<rootDir>/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    // '^@features/(.*)$': '<rootDir>/src/app/features/$1',
    // '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    //'^@pipe/(.*)$': '<rootDir>/src/app/pipes/$1',
    //'^@enums/(.*)$': '<rootDir>/src/app/core/enums/$1',
    '^@environment/(.*)$': '<rootDir>/src/environments/$1',
    //'^@core/constants/(.*)$': '<rootDir>/src/app/core/constants/$1',
    //'^@core/states/(.*)$': '<rootDir>/src/app/core/states/$1',
  },
  maxWorkers: 4,
  // TODO process @angular/* and @mobi/* (import syntax) remove once jest is switched to ESM
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@ngneat/until-destroy|date-fns|@mobi/rwc-b2c-components-ng-jslib|ngx-spinner|@sweetalert2/ngx-sweetalert2))',
  ],
};
export default config;
