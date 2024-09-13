Here’s a more tailored README that addresses the tech challenge requirements while keeping it conversational and friendly:

---

# OTC Order Management Interface

Welcome to the OTC Order Management Interface, my solution to the OTC order management challenge. This app lets users create, view, edit, and delete cryptocurrency buy/sell orders, all while getting real-time USD conversions. Below, I’ll walk you through the features, how to run the project, and some of the challenges I faced along the way.

## Features

Here’s a breakdown of the core features I implemented, based on the challenge:

### Order Creation Form

- **Buy/Sell Toggle**: A simple radio button lets users switch between placing a buy or sell order.
- **Cryptocurrency Selection**: A dropdown menu with a predefined list of cryptocurrencies (like Bitcoin and Ethereum) for users to choose from.
- **Quantity Input**: Users can specify the quantity of the selected cryptocurrency.
- **USD Conversion**: Real-time price conversion using the CoinGecko API. As users enter the quantity, the USD equivalent updates instantly.
- **Expiration Date**: The expiration date field shows a helper text with the time in UTC, ensuring all dates are handled correctly.

### Order Listing

- After an order is created, it appears in a list with details like direction (buy/sell), selected cryptocurrency, quantity, USD equivalent, and expiration date.
- Users can also view full details, edit, or delete any order.

### Order Management

- **Edit Mode**: Users can update any existing order, with the form fields pre-populated for ease of use.
- **Delete**: Orders can be deleted with a simple click.

### API Integration

- Integrated with the **CoinGecko API** to fetch real-time cryptocurrency prices and handle conversions dynamically.

### State Management

- Used **Zustand** for lightweight, flexible state management and **React Query** for API handling and data fetching.
- Orders are persisted in **localStorage** so they remain available even after a page refresh.

### Input Validation & Testing

- The quantity field ensures only positive numbers are accepted.
- Basic form validation ensures all fields are filled out correctly before allowing the user to submit.
- A few **unit tests** demonstrate functionality and form validation.

---

## How to Run the Project

Let’s get you started! Here’s how to run the project locally:

1. **Clone the repo**:

   ```bash
   git clone https://github.com/yourusername/membrane-frontend-cc.git
   cd membrane-frontend-cc
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The app will be running at [http://localhost:5173](http://localhost:5173) 🎉.

4. **Run tests** (if you want to check out the tests):

   ```bash
   npm run test
   ```

   Or to watch tests while you code:

   ```bash
   npm run test:watch
   ```

---

## Environment Variables

Before the app works properly, you’ll need to set up your environment variables. Create a `.env` file in the root directory with the following variable:

```bash
VITE_API_URL=https://api.coingecko.com/api/v3/simple/price
```

This ensures the app can fetch real-time cryptocurrency prices from the CoinGecko API.

---

## Challenges I Faced

Every project has its tricky bits! Here’s what I found challenging:

- **Real-time Price Updates**: Making sure the USD conversion updated smoothly while the user was still typing took some work. Using React Query for data fetching and Zustand for state management really helped.
- **Form Management**: Integrating **Material UI** and **React Hook Form** for the form UI was fun but required some finessing, especially with custom validation and dynamic updates.

- **Date Handling in UTC**: I had to make sure that even though users input local dates, everything was converted to UTC behind the scenes to meet the challenge requirements.

---

## Future Improvements

This was a fun project, and there’s always room for improvement! Here’s what I’d work on next:

- **Optimizing API Requests**: I’d like to centralize the price fetching mechanism, reduce redundant API calls, and update prices on a periodic schedule.
- **More Tests**: While I’ve added some basic unit tests, I want to improve coverage, especially around edge cases like handling API errors or user inputs.
- **Enhanced Mobile UX**: The app is responsive, but I’d love to polish the experience more for smaller devices.

---

## Folder Structure & Design Patterns

I’ve structured the project using a clear, scalable approach. The main components are organized based on functionality, and the state management with Zustand is modular and easy to extend. Following clean code principles, I’ve kept the separation of concerns in mind.

- **Components**: UI components and form handling logic are modularized.
- **Services**: The CoinGecko API logic is placed in a service file to keep things tidy.
- **Stores**: Zustand manages global state, and React Query handles external data (like price fetching).

---

## Resources & Documentation

Here are the resources and tools I relied on while building the app:

- [Vite Documentation](https://vitejs.dev/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Query](https://react-query-v3.tanstack.com/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

## Deployment

The app is live! You can check it out here: [Live Demo](https://your-vercel-app-link.vercel.app)

I hope this was fun to read and helpful in understanding how the app works. Thanks for checking out my solution!

---
