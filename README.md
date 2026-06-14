# QueryMind — AI Business Analyst

> Ask questions about your company data in plain English. Get what happened, why it happened, and exactly what to do — in seconds.

## Built for H0: Hack the Zero Stack Hackathon

### Stack
- **Frontend:** Next.js 14 · Vercel
- **AI:** Claude Haiku (Anthropic)
- **Database:** Amazon Aurora DSQL + DynamoDB
- **Auth:** Clerk

### How it works
1. Type a business question in plain English
2. AI generates SQL and runs it against your database
3. Get a 3-layer analyst response:
   - 📊 What happened
   - 🔍 Why it happened
   - ⚡ What to do next
4. Generate an action plan or executive brief in one click

### Features
- Natural language to SQL
- Auto chart selection
- Business impact scoring
- One-click action plan generator
- Executive brief generator
- Multi-tenant (Aurora DSQL)
- Query history (DynamoDB)

### Demo
Live at: [querymind.vercel.app](https://querymind.vercel.app)
