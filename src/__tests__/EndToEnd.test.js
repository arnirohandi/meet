/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('#event-list');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const liCount = await page.$$eval('#event-list > li', (listItems) => listItems.length);
    // console.log(`Number of <li> elements: ${liCount}`);
    expect(liCount).toBe(32);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('#city-search .city', 'Berlin');
    const suggestionsCount = await page.$$eval('#city-search .suggestions > li', (listItems) => listItems.length);
    expect(suggestionsCount).toBe(2);
  });

  test('User can select a city from the suggested list', async () => {
    await page.click('#city-search .suggestions > li:first-child');
    const liCount = await page.$$eval('#event-list > li', (listItems) => listItems.length);
    expect(liCount).toBe(10);
  });
});

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 250
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // If your event's details have a different selector, use it instead of .event .details
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('[data-testid="toggle-btn"]');
    const eventDetails = await page.$('.event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('[data-testid="toggle-btn"]');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });
});