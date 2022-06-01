import { server } from './__mocks__/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener() { },
    removeListener() { },
  };
};
