# PropertyVista

> ⚠️ **Experimental playground project - NOT for production use!**

A testing playground for my engineering thesis project exploring modern web development technologies. This Polish real estate platform serves as a technology evaluation sandbox to test different stack combinations and development approaches.

**Every single line of code in this repository is purely vibecoded** - no traditional planning, architecture design, or structured development process. Just pure experimentation with AI-assisted rapid prototyping to see what works and what doesn't.

## Tech Stack

- **Next.js 15** + App Router
- **TypeScript**
- **Supabase** (Database + Auth)
- **Tailwind CSS** + shadcn/ui
- **Bun** runtime

## Features

- Daily rotating featured properties
- User authentication (email + Google)
- Property search and filtering
- Favorites system
- Responsive design
- Polish UI (mieszkanie, dom, etc.)

## Quick Start

```bash
# Clone and install
git clone https://github.com/Luminaire1337/property-vista-playground
cd property-vista-playground
bun install

# Setup environment
cp .env.example .env.local
# Add your Supabase credentials

# Local Development with Supabase
supabase start
supabase db reset  # Applies schema and seed data

# Start dev server
bun run dev
```

### 🧪 Test User (Local Development)

For local testing, use these credentials:
- **Email:** `test@propertyvistadev.com`
- **Password:** `testpassword123`

This test user is automatically created when you run `supabase db reset` and comes with sample property data.

---

_This is a thesis research playground. Every line is vibecoded. Don't use it for anything important!_
