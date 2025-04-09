# Atomic Statistics

**Atomic Statistics** is a web-based Progressive Web App (PWA) that simulates card locations using a custom stacked deck. It is inspired by the ACAAN ("Any Card At Any Number") principle and is built to analyze statistically valid positions of cards in a double-deck configuration.

## Features

- Works offline (PWA enabled)
- Installable on Android/iOS home screen
- Dual-deck configuration from custom stack
- Real-time card & position simulation
- Mobile-first design, optimized for iPhone/iPad
- Probability display for each generated case

## How to Use

1. Open `index.html` in your browser or deploy to GitHub Pages.
2. On mobile, tap “Add to Home Screen” to install.
3. Use the buttons:
   - **Randomize** – Generates a valid card and position
   - **New card** – Keeps the position, changes the card
   - **New location** – Keeps the card, changes the position

## Developer Notes

- Base stack is a custom sequence (not Mnemonica).
- Supports 2 dealing methods (standard and reversed).
- Deck logic implemented in JavaScript.
- PWA enabled via `manifest.json` and `service-worker.js`.

## License

MIT – Free to use and modify.
