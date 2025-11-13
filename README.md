NeuroBridge: AI-Powered Neurodiversity Support PlatformNeuroBridge is an empathetic, adaptive AI assistant designed to support neurodiverse individuals—students, professionals, and
young adults—through personalized planning, emotional insight, and conversational guidance.
Built for the Arizona AI Challenge, the platform prioritizes usability, comfort, and neuro-inclusive design.
"A companion that listens first—forms later."Key FeaturesAI Companion: A friendly, conversational agent that replaces rigid questionnaires with talk-first interaction.
Intelligent Planner: Automatically generates personalized plans based on the user’s stress, mood, and current workload.
Mood Tracking: Tracks emotional patterns and provides soft recommendations that support wellbeing.
Community Space: A safe place for guided prompts, shared reflections, and supportive posts.
Calming UI/UX: Soft visual flow, low cognitive load, and a design tailored for neurodiverse comfort.
Problem StatementTechnology often lacks empathy. Neurodiverse individuals face interfaces that overwhelm, confuse, or ignore their cognitive language.
NeuroBridge transforms this experience by creating an adaptive, emotionally aware ecosystem that: listens, learns and evolves with every unique mind.
End Users
Students experiencing stress or burnoutIndividuals with ADHD, autism spectrum traits, or anxiety
People who prefer conversational interaction over formsAnyone seeking a supportive digital companion
Tech StackLayer
Tools
FrontendNext.js 14, React 18, Tailwind CSSBackendNext.js API Routes, Node.js
Database:PostgreSQL + Prisma ORMAuthNextAuth (Credential Provider)AIOpenAI APIMiscSocket server (optional), modern UI components
Authentication: Secure login/signup using NextAuth (Credentials), Prisma ORM, and PostgreSQL.Project Structureneurobridge/
│── prisma/
│── public/
│── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── companion/
│   │   ├── planner/
│   │   ├── mood/
│   │   ├── community/
│   │   ├── consult/
│   │   ├── appointments/
│   │   └── api/auth/[...nextauth]
│   ├── components/
│   └── styles/
│── package.json
│── README.md
Installation & SetupClone the repositoryBashgit clone https://github.com/your-username/neurobridge.git
cd neurobridge
Install dependenciesBashnpm install
Configure your environment
Create a .env file:DATABASE_URL=your_postgres_url
NEXTAUTH_SECRET=your_secret
OPENAI_API_KEY=your_key
Generate Prisma ClientBashnpx prisma generate
Run dev serverBash
npm run dev
Run with Socket (for real-time features)Bash
npm run dev:all
