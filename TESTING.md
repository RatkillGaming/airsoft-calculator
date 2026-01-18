# Playwright Testing Guide

This document explains how to test the Airsoft Calculator application using Playwright.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Running Tests

### Option 1: Run all tests (recommended)
```bash
npm test
```

### Option 2: Run tests with UI mode (interactive)
```bash
npm run test:ui
```
This opens Playwright's UI mode where you can:
- See all tests
- Run tests individually
- Watch tests execute in the browser
- Debug tests step by step

### Option 3: Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Option 4: Debug tests
```bash
npm run test:debug
```

### Option 5: Interactive test script
```bash
node test-interactive.js
```
This runs a simple interactive test that opens a browser and demonstrates the application flow.

## Test Coverage

The test suite includes:

1. **Login Page Tests**
   - ✅ Displays login form correctly
   - ✅ Shows error on invalid credentials
   - ✅ Successfully logs in with admin/password

2. **Calculator Tests**
   - ✅ Calculates joules from FPS and BB weight
   - ✅ Calculates FPS from joules and BB weight
   - ✅ Displays results correctly

3. **Authentication Tests**
   - ✅ Logout functionality works
   - ✅ Protected routes redirect to login
   - ✅ Cannot access calculator without login

4. **Visual Tests**
   - ✅ Modern UI design elements
   - ✅ Responsive layout

## Test Files

- `tests/app.spec.ts` - Main application tests
- `tests/visual.spec.ts` - Visual/UI tests
- `test-interactive.js` - Simple interactive test script

## Configuration

Playwright configuration is in `playwright.config.ts`:
- Automatically starts dev server before tests
- Uses Chromium, Firefox, and WebKit browsers
- Base URL: http://localhost:3000
- Screenshots on failure
- HTML report generation

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Manual Testing

You can also manually test the application:

1. Start the dev server:
```bash
npm run dev
```

2. Open http://localhost:3000 in your browser

3. Login with:
   - Username: `admin`
   - Password: `password`

4. Test the calculator with various inputs

## Troubleshooting

If tests fail:
1. Ensure the dev server is running on port 3000
2. Check that all dependencies are installed
3. Verify Playwright browsers are installed
4. Check browser console for errors
5. Review test screenshots in `test-results/` directory
