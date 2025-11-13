# NeuroBridge: AI-Powered Neurodiversity Support Platform

NeuroBridge is an empathetic, adaptive AI assistant designed to support neurodiverse individuals—students, professionals, and
young adults—through personalized planning, emotional insight, and conversational guidance.

Built for the Arizona AI Challenge, the platform prioritizes usability, comfort, and neuro-inclusive design.

> "A companion that listens first—forms later."

---

## Key Features

* **AI Companion:** A friendly, conversational agent that replaces rigid questionnaires with talk-first interaction.
* **Intelligent Planner:** Automatically generates personalized plans based on the user’s stress, mood, and current workload.
* **Mood Tracking:** Tracks emotional patterns and provides soft recommendations that support wellbeing.
* **Community Space:** A safe place for guided prompts, shared reflections, and supportive posts.
* **Calming UI/UX:** Soft visual flow, low cognitive load, and a design tailored for neurodiverse comfort.

---

## Problem Statement

Technology often lacks empathy. Neurodiverse individuals face interfaces that overwhelm, confuse, or ignore their cognitive language.

NeuroBridge transforms this experience by creating an adaptive, emotionally aware ecosystem that:
* listens,
* learns and
* evolves with every unique mind.

---

## End Users

* Students experiencing stress or burnout
* Individuals with ADHD, autism spectrum traits, or anxiety
* People who prefer conversational interaction over forms
* Anyone seeking a supportive digital companion

---

## Tech Stack

| Layer | Tools |
| :--- | :--- |
| **Frontend** | Next.js 14, React 18, Tailwind CSS |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth (Credential Provider) |
| **AI** | OpenAI API |
| **Misc** | Socket server (optional), modern UI components |

**Authentication:** Secure login/signup using NextAuth (Credentials), Prisma ORM, and PostgreSQL.

---

## Project Structure

```bash
neurobridge/
│── prisma/
│── public/
│── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── companion/
│   │   ├── planner/
│   │   ├── mood/
│   │   ├── community/
│   │   ├── consult/
│   │   ├── appointments/
│   │   └── api/auth/[...nextauth]
│   ├── components/
│   └── styles/
│── package.json
│── README.md

## 🚀 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/neurobridge.git](https://github.com/your-username/neurobridge.git)
    cd neurobridge
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure your environment**
    
    Create a `.env` file in the root directory and add your variables:
    ```
    DATABASE_URL=your_postgres_url
    NEXTAUTH_SECRET=your_secret
    OPENAI_API_KEY=your_key
    ```

4.  **Generate Prisma Client**
    ```bash
    npx prisma generate
    ```

5.  **Run dev server**
    ```bash
    npm run dev
    ```

6.  **Run with Socket (for real-time features)**
    ```bash
    npm run dev:all
    ```
