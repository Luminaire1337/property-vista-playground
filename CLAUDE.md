# PropertyVista - Claude Code Instructions

## Project Overview

PropertyVista is a real estate platform clone of otodom.pl built with Next.js, Supabase, and shadcn/ui. The goal is to create a comprehensive property listing and management system for the Polish market.

## Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Runtime**: Bun (instead of Node.js)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: TailwindCSS with shadcn/ui components
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Important Commands

```bash
# Development
bun run dev

# Build (always test before commits)
bun run build

# Linting
bun run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── Header.tsx        # Main navigation
│   ├── Footer.tsx        # Site footer
│   ├── HeroSection.tsx   # Landing hero
│   └── FeaturedProperties.tsx # Property listings
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Supabase auth integration
├── lib/                  # Utilities
│   ├── supabase.ts       # Supabase client configuration
│   └── utils.ts          # Helper functions
├── types/                # TypeScript definitions
│   ├── database.ts       # Supabase database types
│   └── property.ts       # Property-related types
├── data/                 # Mock data (for development)
└── config/               # Configuration files
```

## Database Schema (Supabase)

### Tables:

- **properties**: Main property listings with Polish categories
- **property_images**: Property photos with primary image flag
- **profiles**: User profiles linked to Supabase auth
- **favorites**: User's saved properties

### Property Types (Polish):

- mieszkanie (apartment)
- dom (house)
- lokal (commercial)
- działka (land)
- garaż (garage)

### Transaction Types:

- sprzedaż (sale)
- wynajem (rent)
- kupno (purchase)

## Environment Variables Needed

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Code Style Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Use shadcn/ui components when possible
- Implement proper error handling
- Use Polish language for UI text
- Follow the existing naming conventions

## Maintainability Rules (CRITICAL)

- **ZERO TOLERANCE for technical debt** - Clean up immediately
- **No unused files** - Remove SVGs, mock data, outdated components immediately
- **No debug code in production** - Remove console.logs before committing
- **Specific TODOs only** - Include implementation details, not vague comments
- **No broken imports** - Always verify builds after file changes
- **Clean up imports** - Remove unused import statements
- **Update documentation** - Keep README and CLAUDE.md current with architecture changes
- **Prefer actual functionality over placeholders** - Implement features properly or remove them
- **Regular audits** - Check for unused code after each major feature

## Authentication Flow

- Supabase Auth with email/password and Google OAuth
- AuthContext provides user state globally
- AuthModal handles sign in/up UI
- Automatic session management

## Current Status

✅ Project setup and configuration
✅ Basic UI components and layout
✅ Supabase integration structure
✅ Authentication system foundation
✅ TypeScript/ESLint issues resolved
✅ Build process working
✅ Daily rotating featured properties system
✅ Comprehensive SEO optimization
✅ PWA manifest and favicon system
✅ Performance optimization (batch API calls)
✅ Security hardening (RLS policies)

## Next Steps

1. Set up Supabase database tables
2. Implement property CRUD operations
3. Add property search and filtering
4. Implement user profiles and favorites
5. Add property image upload
6. Create property detail pages
7. Add advanced search features

## Development Notes

- Always run `bun run build` before major commits
- Use the existing CSS variables in globals.css
- Follow established green gradient theme (#10b981 to #059669)
- Focus on responsive design (mobile-first)
- Implement proper loading states
- Add proper error boundaries

## Featured Properties System

- **Daily Rotation**: Featured properties change every 24 hours at midnight
- **Deterministic Selection**: Uses date-based seeding for consistent daily results
- **Automatic Updates**: Properties rotate without manual intervention
- **Visual Indicators**: Special "Dzisiaj Polecane" badges for daily featured items
- **Countdown Timer**: Shows time until next rotation
- **SEO Friendly**: Provides fresh content for search engines daily
- **Performance**: No additional database queries - uses existing property pool

## Important Files to Review

- `src/types/database.ts` - Database schema types
- `src/lib/supabase.ts` - Supabase configuration
- `src/contexts/AuthContext.tsx` - Authentication logic
- `src/app/globals.css` - Design system variables
- `src/components/ui/Logo.tsx` - Custom logo system

## Testing Strategy

- Test authentication flows thoroughly
- Verify responsive design on mobile/desktop
- Test property listing and filtering
- Validate form submissions
- Test image uploads when implemented

## Code Quality Checklist

Before any commit, ensure:

- [ ] `bun run build` passes without errors or warnings
- [ ] No unused imports or files
- [ ] All console.logs removed (except intentional user-facing logs)
- [ ] TODOs are specific with implementation details
- [ ] Documentation updated if architecture changed
- [ ] TypeScript errors resolved
- [ ] No broken functionality from removed dependencies

Remember: This is a Polish real estate platform, so all user-facing text should be in Polish language.

## Maintenance Commands

```bash
# Regular cleanup commands
find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "console\.log" # Find debug logs
find public -name "*.svg" -o -name "*.png" | head -10 # Check assets usage
grep -r "TODO" src/ # Review all TODOs for specificity
bun run build # Always verify build works
bun run lint # Check code quality
```
