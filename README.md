# OTC Order Management Interface

## This is my submission for the challenge. It is an OTC Order Management App that allows users to create, view, edit, and delete cryptocurrency buy/sell orders, while also providing real-time USD conversions.

## How to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jdrada/membrane-frontend-cc.git
   cd membrane-frontend-cc
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

Before the app can run properly, you’ll need to set up your environment variables. Create a `.env` file in the root directory with the following variable:

```bash
VITE_API_URL=https://api.coingecko.com/api/v3/simple/price
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

---

## Challenges I Faced

- **Not doing TDD**: Testing last made me an unhappy developer :(

---

## What Could Improve

- **UI**: The UI is basic. I focused on making sure every feature works properly, but the styling could be greatly improved with more time.
- **More Tests**: I implemented basic form validation tests and a complete red-green path for one of the services. However, I would have loved to have more time to write additional unit and E2E tests.
- **Enhanced Mobile UX**: The app is responsive, but I’d like to further polish the experience on smaller devices (especially the table).

---

## Folder Structure & Design Patterns

I’ve structured the project using a scalable approach. The main components are organized by functionality, and state management with Zustand is modular and easy to extend. Following clean code principles, I’ve maintained separation of concerns.

- **Components**: UI components and form-handling logic are modularized.
- **Services**: The CoinGecko API logic is placed in a service file for better organization.
- **Stores**: Zustand manages global state, while React Query handles external data fetching (like price data).

---

## Resources & Documentation

Here are the resources and tools I used while building the app:

- [Vite Documentation](https://vitejs.dev/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Query](https://react-query-v3.tanstack.com/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)
