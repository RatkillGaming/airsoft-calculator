# How to Run Playwright Tests - See Them in Action! 🎬

This guide shows you different ways to run tests and watch them execute in real-time.

## Prerequisites

1. **Start the development server** (in one terminal):
```bash
npm run dev
```

2. **Keep it running** - Don't close this terminal!

---

## Option 1: Interactive Test Script (Recommended for Watching) ⭐

This is the **best option** if you want to see each test execute step-by-step with pauses between tests.

### Run it:
```bash
npm run test:interactive
```
or
```bash
node run-tests-interactive.js
```

### What it does:
- ✅ Opens a visible browser window
- ✅ Runs tests **one at a time** with **3-second pauses** between them
- ✅ **Slows down actions** (500ms delay) so you can see what's happening
- ✅ Shows progress in the terminal
- ✅ Keeps browser open for 10 seconds at the end

### Features:
- 🎯 Runs 7 comprehensive tests
- 👀 You can watch every click, type, and navigation
- ⏸️ Pauses between tests so you can observe results
- 📊 Shows pass/fail summary at the end

---

## Option 2: Visible Test Runner (Quick View)

Runs all Playwright tests with visible browser, but faster execution.

### Run it:
```bash
npm run test:visible
```
or
```bash
node run-tests-visible.js
```

### What it does:
- ✅ Opens browser windows for each test
- ✅ Runs tests sequentially (one at a time)
- ✅ Shows all test output in terminal
- ✅ Faster than interactive mode

---

## Option 3: Playwright UI Mode (Best for Debugging) 🐛

The official Playwright UI - great for debugging and exploring tests.

### Run it:
```bash
npm run test:ui
```

### What it does:
- ✅ Opens Playwright's interactive UI
- ✅ Shows all tests in a sidebar
- ✅ Click any test to run it individually
- ✅ See test code, timeline, and screenshots
- ✅ Step through tests line by line
- ✅ See network requests and console logs

### How to use:
1. Click "Run all" to run all tests
2. Click any test name to run just that test
3. Use the timeline to see what happened
4. Check screenshots and traces

---

## Option 4: Headed Mode (Standard Visible Tests)

Runs tests with visible browser using Playwright's standard headed mode.

### Run it:
```bash
npm run test:headed
```

### What it does:
- ✅ Opens browser windows
- ✅ Runs tests sequentially
- ✅ Standard Playwright execution

---

## Option 5: Debug Mode (Step-by-Step Debugging)

Pause execution and step through tests line by line.

### Run it:
```bash
npm run test:debug
```

### What it does:
- ✅ Opens browser with Playwright Inspector
- ✅ Pauses at each step
- ✅ Step through code line by line
- ✅ Inspect page state at any point
- ✅ Perfect for debugging failing tests

---

## Quick Comparison

| Method | Speed | Visibility | Best For |
|--------|-------|------------|----------|
| `test:interactive` | Slow | ⭐⭐⭐⭐⭐ | Watching tests execute |
| `test:visible` | Medium | ⭐⭐⭐⭐ | Quick visible run |
| `test:ui` | Medium | ⭐⭐⭐⭐⭐ | Debugging & exploring |
| `test:headed` | Fast | ⭐⭐⭐ | Standard visible tests |
| `test:debug` | Slow | ⭐⭐⭐⭐⭐ | Debugging issues |

---

## What Tests Are Running?

1. **Display Login Page** - Verifies login form appears
2. **Invalid Login** - Tests error handling
3. **Valid Login** - Tests successful authentication
4. **Calculate Joules** - Tests FPS → Joules calculation
5. **Calculate FPS** - Tests Joules → FPS calculation
6. **Logout** - Tests logout functionality
7. **Protected Routes** - Tests route protection

---

## Tips for Watching Tests

### 🎯 Best Experience:
1. Use **`test:interactive`** for the best viewing experience
2. Maximize your browser window
3. Watch the terminal for progress updates
4. Observe how the UI responds to each action

### 🐛 If Tests Fail:
1. Check the terminal for error messages
2. Look at screenshots in `test-results/` folder
3. Use `test:debug` to step through failing tests
4. Use `test:ui` to see detailed test information

### ⚡ Performance:
- Tests run slower in visible mode (by design)
- This is normal - it's so you can see what's happening
- For faster runs, use `npm test` (headless mode)

---

## Troubleshooting

### "Server not running" error:
```bash
# Start the dev server first:
npm run dev
```

### Browser doesn't open:
- Make sure Chromium is installed: `npx playwright install chromium`
- Check if another browser window is blocking

### Tests run too fast to see:
- Use `test:interactive` - it has built-in delays
- Or use `test:debug` to step through manually

---

## Example Output

When you run `test:interactive`, you'll see:

```
🚀 Starting Interactive Playwright Tests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 Running: 1. Display Login Page
   ⏳ Executing...
   ✅ Found title: Airsoft Calculator
   ✅ PASSED
   ⏸️  Pausing 3 seconds before next test...

🧪 Running: 2. Invalid Login Test
   ⏳ Executing...
   ✅ Error message displayed: true
   ✅ PASSED
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Test Results:
   ✅ Passed: 7
   ❌ Failed: 0
   📈 Total:  7
```

---

## Enjoy Watching Your Tests! 🎉

Choose the method that works best for you. For the best viewing experience, start with **`npm run test:interactive`**!
