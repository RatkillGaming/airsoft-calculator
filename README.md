# 🎯 Airsoft Calculator - My First Playwright Project

A modern Next.js application for calculating joules and FPS (Feet Per Second) based on BB weight in airsoft, featuring comprehensive Playwright end-to-end testing.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Playwright](https://img.shields.io/badge/Playwright-1.40-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## 📖 About This Project

This is my first project using **Playwright** for end-to-end testing! It's a full-stack Next.js application that demonstrates:

- ✅ Modern React with TypeScript
- ✅ Beautiful UI with Tailwind CSS
- ✅ User authentication flow
- ✅ Real-time calculations
- ✅ **Comprehensive Playwright test coverage**
- ✅ Multiple ways to run and watch tests

Perfect for learning Playwright testing patterns and best practices!

## ✨ Features

- 🔐 **User Authentication** - Login system with protected routes
- 📊 **Dual Calculator** - Calculate joules from FPS or FPS from joules
- 🎨 **Modern UI** - Glassmorphism design with gradient backgrounds
- ⚡ **Real-time Calculations** - Instant results as you type
- 🧪 **Full Test Coverage** - 9 Playwright tests covering all functionality
- 👀 **Watch Tests Execute** - Interactive test runners to see tests in action

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/RatkillGaming/airsoft-calculator.git
cd airsoft-calculator
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers** (first time only)
```bash
npx playwright install chromium
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials

- **Username:** `admin`
- **Password:** `password`

## 🧪 Testing with Playwright

This project showcases various ways to run Playwright tests!

### 🎬 Watch Tests Execute (Recommended!)

The best way to see Playwright in action:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run interactive tests
npm run test:interactive
```

This opens a browser and runs tests **one by one** with pauses so you can watch everything happen!

### Other Test Commands

```bash
# Run all tests (headless - fast)
npm test

# Run tests with visible browser
npm run test:visible

# Playwright UI mode (interactive debugging)
npm run test:ui

# Debug mode (step through line by line)
npm run test:debug
```

### Test Coverage

The test suite includes:

- ✅ Login page display
- ✅ Invalid credentials handling
- ✅ Successful authentication
- ✅ Joules calculation from FPS
- ✅ FPS calculation from joules
- ✅ Logout functionality
- ✅ Protected route access
- ✅ Visual/UI tests

📖 **See [HOW_TO_RUN_TESTS.md](./HOW_TO_RUN_TESTS.md) for detailed testing guide**

## 📐 How It Works

### Calculation Formula

The calculator uses the kinetic energy formula:
- **Joules = 0.5 × m × v²**
  - Where m = mass in kilograms
  - Where v = velocity in meters per second

### Conversions

- 1 gram = 0.001 kilograms
- 1 FPS = 0.3048 m/s
- 1 m/s = 3.28084 FPS

## 🏗️ Project Structure

```
airsoft-calculator/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── Login.tsx       # Login component
│   │   └── Calculator.tsx  # Calculator component
│   ├── calculator/         # Calculator page route
│   └── page.tsx           # Home/login page
├── tests/                  # Playwright tests
│   ├── app.spec.ts        # Main application tests
│   └── visual.spec.ts     # Visual/UI tests
├── playwright.config.ts   # Playwright configuration
└── README.md              # This file
```

## 🛠️ Technologies Used

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Playwright
- **UI:** React 18

## 📚 Learning Resources

This project demonstrates:

- Playwright test setup and configuration
- Writing end-to-end tests
- Testing authentication flows
- Testing form interactions
- Visual regression testing
- Running tests in different modes (headless, headed, UI, debug)
- Creating custom test runners

## 🤝 Contributing

This is a learning project, but feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as a learning project for Playwright end-to-end testing
- Inspired by the need for airsoft energy calculations
- Thanks to the Playwright team for amazing testing tools!

## 📸 Screenshots

*Add screenshots of your app here!*

---

⭐ **If you find this project helpful for learning Playwright, please give it a star!**

Made with ❤️ as my first Playwright project
