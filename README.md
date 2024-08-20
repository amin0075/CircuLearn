# CircuLearn

## Project Overview

**CircuLearn** is an interactive web application designed to teach and demonstrate the fundamentals of simple logic circuits. Built using Next.js, the application allows users to explore various logic gates, understand their functions, and test their knowledge through quizzes and simulations.

## Features

- **Learning Sections**: Explore various sections like Basic Concepts, Logic Gates, and Final Step (Quiz).
- **Simulations**: Interactive simulations for logic gates that allow users to toggle inputs and see real-time outputs.
- **Quizzes**: Multiple-choice and interactive quizzes to assess understanding.
- **Feedback and Evaluation**: Users can provide feedback on the app's effectiveness.
- **Chatbot**: Ask additional questions about logic circuits using the integrated AI chatbot powered by OpenAI API.
- **Customization**: Dark mode, color customization, and more for enhanced user experience.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd CircuLearn
   ```

2. **Install dependencies:**

   Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following environment variables:

   ```env
   OPENAI_API_KEY=your-openai-api-key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running on `http://localhost:3000`.

## Project Structure

Here's a quick overview of the project hierarchy:

```bash
├── pages
│   ├── additional-resources
│   ├── api
│   ├── basic-concepts
│   ├── final-step
│   ├── gates
│   ├── introduction
│   ├── contact.tsx
│   ├── index.tsx
│   ├── privacy.tsx
│   ├── simulator.tsx
│   └── test.tsx
├── public
│   └── images
│   └── favicon.ico
├── src
│   ├── @types
│   ├── api
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── layout
│   ├── lib
│   ├── routes
│   ├── utils
│   ├── zustand_stores
│   └── styles
│       ├── Plus_Jakarta_Sans
│       ├── globals.css
│       └── Plus-Jakarta-Sans-font-face.css
├── .env
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Usage

- **Explore Sections**: Navigate through different sections like "Basic Concepts," "Gates," and "Final Step" using the sidebar or top menu.
- **Take the Quiz**: After going through the learning material, head over to the "Final Step" to complete the quiz.
- **Provide Feedback**: Help improve the app by submitting feedback after completing the quiz.
- **Use the Simulator**: After completing the final step, explore the simulator to build and experiment with your own logic circuits.
