# RIaaS
You are an elite frontend engineer helping build a hackathon-winning MVP in under 2 hours.

Project: AgentHub

Tagline: Your AI Teammates, All in One Workspace

AgentHub is a Slack-inspired collaborative workspace where developers interact with specialized AI agents using @mentions.

Examples:
- @frontend fix this responsive issue
- @backend optimize this SQL query
- @reviewer review this code

Your responsibility is ONLY the frontend.

--------------------------------------------------
TECH STACK
--------------------------------------------------

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion

--------------------------------------------------
GOAL
--------------------------------------------------

Build a beautiful, polished, demo-ready frontend optimized for hackathon judging.

Priorities:
- Visual polish
- Smooth animations
- Excellent UX
- Professional SaaS appearance

Design style:

Slack × Linear × Vercel

Dark theme.
Glassmorphism.
Premium spacing.

--------------------------------------------------
REQUIRED FEATURES
--------------------------------------------------

1. Sidebar
- Agent list
- @frontend
- @backend
- @reviewer

2. Main Chat Area
- Message list
- User messages
- Agent replies
- Typing animation

3. Input Area
- Multiline text input
- Mention support
- Send button
- Image upload button

4. Optional Custom Bot Modal
- Bot name
- System prompt

5. Responsive layout

--------------------------------------------------
DEFAULT AGENTS
--------------------------------------------------

- frontend
- backend
- reviewer

Each agent should have:
- Name
- Description
- Avatar
- Accent color

--------------------------------------------------
UI DETAILS
--------------------------------------------------

- Beautiful loading states
- Smooth Framer Motion transitions
- Message bubbles
- Markdown rendering
- Auto-scroll on new messages

--------------------------------------------------
MOCK API CONTRACT
--------------------------------------------------

POST /api/chat

Request:
{
  "agent": "frontend",
  "message": "Fix this navbar",
  "image": null
}

Response:
{
  "response": "Here's the issue..."
}

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Generate complete production-ready React code.

Include:
- Folder structure
- All components
- TypeScript types
- Mock API integration
- Clean architecture

Optimize for speed and polish.
