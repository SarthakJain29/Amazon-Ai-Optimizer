# Amazon Product Listing Optimizer

Demo Link:- https://drive.google.com/file/d/1-76rk91JmtIQwWX-4zgf-9jlZD_gl__i/view?usp=sharing
Note:- Mysql db and api key must be setup for utilizing all functionalities, instructions given below

---

## Description

A web application that fetches Amazon product details by ASIN, optimizes the listing using AI (Google Gemini API), and stores optimization history in a MySQL database.

---

## Features

- Fetch product title, bullet points, and description by ASIN
- Optimize product listing using Google Gemini AI
- View original and optimized listings side by side
- Save optimization history and view past records

---

## Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: MySQL
- AI: Google Generative AI (Gemini API)
- Deployment: Vercel (frontend), any Node host (backend)

---

## Prerequisites

- Node.js v18+  
- MySQL server  
- Google Gemini API key  

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/amazon-product-optimizer.git
cd amazon-product-optimizer
```
### 2. Setup MySQL Database
1. Install MySQL server (if not already installed)

2. Create a database:
```sql
CREATE DATABASE product_optimizer;
```
3. Create the table for storing optimizations:
```sql
USE product_optimizer;

CREATE TABLE asin_optimizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asin VARCHAR(50) NOT NULL,
    original_title TEXT,
    original_bullets TEXT,
    original_description TEXT,
    optimized_title TEXT,
    optimized_bullets TEXT,
    optimized_description TEXT,
    keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
4. Note your MySQL credentials (host, user, password, port)

### 3. Configure Environment Variables
Create a .env file in the backend folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_optimizer
DB_PORT=3306

GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```
Get Gemini api key from https://console.cloud.google.com/

### 4. Install Dependencies
Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```
### 5. Run the Application Locally
Backend:
```bash
cd backend
npm run dev
```
Server will start at http://localhost:5000.

Frontend:
```bash
cd frontend
npm run dev
```
Frontend will start at http://localhost:5173 (default Vite port).

### 6. Using the App
- Open the frontend in the browser.
- Enter an Amazon ASIN to fetch product details.
- Click Fetch & Optimize to generate optimized listings.
- View optimization history in the History tab.

## Prompt and Reasoning

The application sends product details to Google Gemini AI using this prompt:

```javascript
const prompt = `
You are an Amazon product listing optimization expert.
Given the following product details:
- Title: ${title}
- Bullet Points: ${bulletsArray.join("\n")}
- Description: ${description}

Generate:
1. An improved, keyword-rich, readable title.
2. 5 rewritten bullet points that are clear and concise.
3. An enhanced, brief, persuasive but compliant description.
4. 3 to 5 new keyword suggestions.

Give output strictly in valid JSON format only (no markdown, no explanations, no backticks).
Example:
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "..."],
  "optimized_description": "...",
  "keywords": ["...", "..."]
}
`;
```

### Explanation
- Guides AI to improve Amazon product listings.
- Generates clear, keyword-rich, and persuasive content.
- Produces multiple bullet points and keywords for better SEO.
- Returns valid JSON so the frontend can read it easily.
- Keeps descriptions short, persuasive, and suitable for Amazon.
