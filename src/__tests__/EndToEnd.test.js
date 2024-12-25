/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";

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
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('[data-testid="toggle-btn"]');
    const eventDetails = await page.$('.event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('[data-testid="toggle-btn"]');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});