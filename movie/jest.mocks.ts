import { basename } from 'path';

// generic mock for assets https://jestjs.io/docs/webpack#handling-static-assets
export function process(src: string, filename: string): string {
    return 'module.exports = ' + JSON.stringify(basename(filename)) + ';';
}
