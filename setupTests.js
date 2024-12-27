import '@testing-library/jest-dom';

// Here, add portions of the warning messages you want to intentionally prevent from appearing
const MESSAGES_TO_IGNORE = [
  "An update to App inside a test was not wrapped in act(...).",
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "The current testing environment is not configured to support act(...)"
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
  if (!ignoreMessage) originalError(...args);
}

jest.setTimeout(30000);

const {ResizeObserver} = global;

// Check if the current environment is not "node" - Puppeteer tests
if (typeof window !== "undefined") {
  beforeEach(() => {
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });
}