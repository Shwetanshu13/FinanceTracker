# FinanceTracker 🪙

A comprehensive **Finance Management** web app built with **Next.js**, **Drizzle ORM**, and **Tailwind CSS**. FinanceTracker enables users to seamlessly manage their personal finances by tracking income, expenses, and transactions with an intuitive and aesthetically pleasing interface.

---

## **Features**

### **Authenticated Features**

- **Home Dashboard**:
  - View **total income**, **total expenses**, and **number of transactions** at a glance.
  - Clean and minimal UI for quick insights.
- **Transaction Management**:
  - Add new income or expense transactions.
  - View all transactions in a paginated list.
  - Edit or delete existing transactions effortlessly.
- **User Profile**:
  - Displays user details: **Name**, **Email**, **DOB**, **Age**, **Gender**, and **Number of Transactions**.
- **Authentication**:
  - Secure user authentication powered by **NextAuth.js**.
  - Access control using middleware.

### **Public Features**

- **Landing Page**:
  - Attractive, minimalistic landing page encouraging users to sign up.
  - Promotes benefits of using FinanceTracker.

---

## **Tech Stack**

### **Frontend**

- **Next.js**: Fast and SEO-friendly React framework.
- **Tailwind CSS**: Utility-first CSS framework for quick and responsive design.

### **Backend**

- **Next.js API Routes**: Handles transaction CRUD operations and user data retrieval.
- **Drizzle ORM**: Modern, type-safe ORM for database interactions.
- **Neon**: Serverless PostgreSQL database hosting.

### **Authentication**

- **NextAuth.js**: Secure user authentication with session management.

---

## **Project Structure**

app/
├── (app)/
│ ├── home/ # Home Dashboard
│ ├── profile/ # User Profile Page
│ ├── transactions/ # Transactions Pages
│ │ ├── add-new/ # Add New Transaction Page
│ │ ├── all/ # All Transactions List Page
│ │ └── edit/ # Edit Transaction Page
│ ├── layout.tsx # Root Layout File
│ └── page.tsx # Landing Page
├── api/ # API Endpoints
│ ├── auth/ # Auth APIs
│ ├── transactions/ # Transactions APIs
│ └── user/ # User Details API
├── components/ # Reusable UI Components
│ ├── Navbar.tsx # Navigation Bar Component
│ ├── TransactionItem.tsx # Single Transaction Component
│ ├── EditTransaction.tsx # Edit Transaction Component
│ ├── index.ts # Export all components
├── context/ # Context API (if required for global state)
├── db/ # Database Schema and Configurations
├── fonts/ # Custom Fonts
├── public/ # Static Assets
│ └── favicon.ico # App Icon
├── styles/ # Global and Custom CSS
│ ├── globals.css # Global CSS File
│ └── tailwind.css # Tailwind Configuration File
├── types/ # TypeScript Types and Interfaces
├── utils/ # Helper and Utility Functions
│ └── ApiResponse.ts # Standardized API Response
.env # Environment Variables
.eslintrc.json # ESLint Configuration
.gitignore # Git Ignore File
drizzle.config.ts # Drizzle ORM Configurations
middleware.ts # Middleware for Route Protection
next.config.mjs # Next.js Configuration
package.json # NPM Package Configuration
postcss.config.mjs # PostCSS Configuration
tailwind.config.ts # Tailwind CSS Configuration
tsconfig.json # TypeScript Configuration

---

## **API Endpoints**

### **Transaction APIs**

- **GET `/api/transactions/all`**  
  Retrieves all transactions for the logged-in user.
- **POST `/api/transactions/add`**  
  Adds a new transaction for the logged-in user.

- **GET `/api/transactions/details`**  
  Fetches details of a specific transaction using `id` as a query param.

- **PUT `/api/transactions/edit`**  
  Updates an existing transaction.

- **DELETE `/api/transactions/delete`**  
  Deletes a specific transaction using `id` as a query param.

### **User APIs**

- **GET `/api/user/details`**  
  Retrieves user details (name, email, DOB, gender, number of transactions).

---

## **Installation and Setup**

### Prerequisites

- **Node.js** (v16+)
- **PostgreSQL** database

### Steps to Run Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/finance-tracker.git
   cd finance-tracker
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:  
   Create a `.env` file with the following variables:
   ```plaintext
   DATABASE_URL=<Your_Neon_PostgreSQL_Connection_URL>
   NEXTAUTH_SECRET=<Random_String>
   NEXTAUTH_URL=http://localhost:3000
   ```
4. **Run the App**:

   ```bash
   npm run dev
   ```

5. **Access the App**:  
   Open `http://localhost:3000` in your browser.

---

## **Future Improvements**

- Add filtering and sorting options for transactions.
- Implement data visualization (charts for income and expense trends).
- Allow export of transaction history to CSV.
- Add multi-currency support.

---

## **Contributing**

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Added a new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- **Next.js** for the powerful framework.
- **Drizzle ORM** for making database interactions smooth and type-safe.
- **Tailwind CSS** for the beautiful and responsive UI.

---

Feel free to contact us at [shprojects13@gmail.com](mailto:shprojects13@gmail.com) for any queries or suggestions. 😊
