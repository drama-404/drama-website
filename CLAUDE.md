# Drama Website - AI Engineer Portfolio

## Project Overview

This is a production-grade portfolio website for an AI Engineer and Full-Stack Developer. The site features a stunning scroll-animated Rubik's Cube as the hero element, glassmorphism design aesthetic, and 3D visualizations throughout.

**Brand Identity:**
- Intelligent, mathematical, sleek, high-tech
- Feminine and approachable (not cold/corporate)
- Key differentiator: Architecting intelligence, not just building websites

**Tech Stack:**
- Next.js 14+ (App Router) with TypeScript (strict mode)
- Tailwind CSS with custom design system
- Three.js (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
- Framer Motion + GSAP for animations
- Resend for email service

---

## Design System

### Color Palette

```css
--base-darker: #0a0a0f      /* Deep obsidian background */
--base-dark: #12121a        /* Secondary background */
--base: #1a1a24             /* Elevated surfaces */

--accent-cyan: #00f5d4      /* Primary accent */
--accent-magenta: #f72585   /* Secondary accent */
--accent-violet: #7b2cbf    /* Tertiary accent */

--text-primary: #f8f9fa     /* Main text */
--text-secondary: #adb5bd   /* Secondary text */
--text-muted: #6c757d       /* Muted text */
```

### Typography

- **Display Font:** "Syne" (Google Fonts) - for headings, geometric and technical
- **Body Font:** "DM Sans" (Google Fonts) - clean and readable
- **Monospace:** "JetBrains Mono" (Google Fonts) - for code elements

### Visual Language

- **Glassmorphism:** Frosted glass effect with backdrop blur
- **Neon Gradients:** Cyan → Violet → Magenta (135deg)
- **Glow Effects:** Subtle neon glows on hover
- **Mathematical Precision:** Exact spacing, alignment, geometric shapes

---

## Key Features

### 1. Hero Section - Scroll-Animated Rubik's Cube

The centerpiece is a 3D Rubik's Cube that:
- Starts in a scrambled state
- Progressively solves itself as the user scrolls
- Uses GSAP ScrollTrigger for smooth scroll synchronization
- Features post-processing effects (bloom, SSAO)

**Implementation files:**
- `lib/rubiks/cubeState.ts` - Cube mathematics and state management
- `lib/rubiks/solver.ts` - Solving algorithm
- `components/three/RubiksCube.tsx` - 3D scene setup
- `components/three/CubeGeometry.tsx` - Cube rendering
- `components/three/SolvingAnimation.tsx` - Scroll integration

### 2. Services Section - 3D Animated Cards

Three glass cards with 3D visualizations:
- **AI & Intelligence Services** - Neural network animation (cyan)
- **Full-Stack Engineering** - Code editor visual (violet)
- **Enterprise Systems** - Blueprint wireframe (magenta)

Each card has hover effects (lift + glow).

### 3. AI Lab Section - Animated Demos

Three animated visualizations (extensible for future interactive demos):
- **Chatbot Demo** - Animated conversation flow
- **Data Extraction Demo** - Document → JSON transformation
- **Automation Workflow** - Decision tree with particles

Architecture supports future interactive demos without refactoring.

### 4. Portfolio Section

Project showcase with:
- Filter by category (All, AI, Full-Stack, Enterprise)
- Elegant gradient placeholders (to be replaced with real images)
- Tech stack badges
- Hover effects with image zoom

### 5. Contact Section

Fully functional contact form with:
- Zod validation
- Resend email integration
- Direct links: Email, LinkedIn, Calendly
- Success/error feedback

---

## Implementation Guidelines

### Visual Quality Standards

**✅ DO:**
- Use exact design system color values
- Implement smooth 60 FPS animations
- Create unique, bespoke interactions
- Maintain mathematical precision in spacing
- Test glassmorphism in all browsers (especially Safari)

**❌ DON'T:**
- Use generic AI aesthetics (purple gradients, Inter font)
- Add placeholder text like "Lorem ipsum" or "Coming soon"
- Create non-functional buttons or links
- Use template-y animations (excessive bouncing)
- Skip small details (borders, shadows, spacing)

### Animation Guidelines

**Allowed:**
- Page load: Staggered fade-in + slide-up (0.1s delays)
- Scroll-triggered: Elements fade in on viewport entry
- Hover: Scale, glow, color transitions (0.3s ease)
- Rubik's cube: Smooth scroll-driven solving
- Physics-based 3D interactions

**Forbidden:**
- Random decorative motion
- Animations causing layout shifts
- Overly playful effects
- Anything feeling "template-y"

### Code Quality Standards

- TypeScript strict mode enabled
- NO placeholders, NO TODOs, NO "coming soon" text
- All interactions must be functional
- Clean component structure with single responsibility
- Proper error boundaries for 3D components
- Lazy load heavy components (Three.js scenes)

---

## Available Skills and Agents

### Skills to Use

When implementing this project, **ALWAYS use these skills** to ensure best practices:

1. **`frontend-design` or `frontend-design:frontend-design`**
   - Use for creating the UI components and sections
   - Ensures distinctive, production-grade design
   - Helps avoid generic AI aesthetics

2. **`react-best-practices`**
   - Use when writing React/Next.js components
   - Ensures optimal performance patterns
   - Critical for 3D rendering performance

### Agents to Use

The `.claude/agents` directory contains specialized agents:

1. **`code-architect`**
   - Use for architectural decisions
   - Planning component structure
   - Design pattern selection

2. **`code-reviewer`**
   - Use after writing significant code sections
   - Review for bugs, security, quality
   - Ensure production-grade standards

3. **`code-simplifier`**
   - Use when complexity grows
   - Reduce over-engineering
   - Improve readability

**How to invoke agents:**
Use the Task tool with the appropriate subagent_type:
```typescript
Task(subagent_type="code-architect", prompt="Design the Rubik's cube state management architecture")
Task(subagent_type="code-reviewer", prompt="Review the contact form component for security and best practices")
```

---

## Development Workflow

### Phase 1: Setup (Day 1)
1. Initialize Next.js project
2. Install dependencies
3. Configure TypeScript, Tailwind, Next.js
4. Set up design system in `tailwind.config.ts` and `globals.css`

### Phase 2: Foundation (Day 1-3)
1. Create utility functions (`lib/utils.ts`)
2. Define TypeScript types (`types/index.ts`)
3. Build core UI components:
   - Button with gradient border
   - GlassCard with blur effect
   - Badge for tags
   - Navigation bar

### Phase 3: Rubik's Cube (Day 3-6)
1. Implement cube mathematics (`lib/rubiks/cubeState.ts`)
2. Create solving algorithm (`lib/rubiks/solver.ts`)
3. Build 3D geometry (`components/three/CubeGeometry.tsx`)
4. Set up Three.js scene (`components/three/RubiksCube.tsx`)
5. Integrate scroll animation (`components/three/SolvingAnimation.tsx`)
6. Build Hero section (`components/sections/Hero.tsx`)

### Phase 4: Content Sections (Day 7-11)
1. Services section with 3D visuals
2. AI Lab with animated demos
3. Portfolio with filter functionality
4. Contact form with email integration

### Phase 5: Polish & Deploy (Day 12-15)
1. Implement animation system
2. Performance optimization
3. Responsive design
4. Testing (visual, functional, accessibility)
5. Deploy to Vercel

---

## Critical Technical Challenges

### 1. Rubik's Cube Mathematics

**Challenge:** Implementing physically accurate cube state and moves.

**Approach:**
- Use standard notation (U, D, L, R, F, B with optional ')
- 6 faces of 3x3 color grids
- Rotation transformations for adjacent faces
- **Recommended:** Pre-compute scramble + solution for reliability

### 2. Scroll-Synchronized Animation

**Challenge:** Smoothly animate cube solving based on scroll.

**Solution:**
- GSAP ScrollTrigger with `scrub: 1`
- Pin hero section during animation
- Break solution into timeline with precise timing
- Test across browsers

### 3. 3D Performance

**Challenge:** Three.js can be heavy on mobile/low-end devices.

**Optimizations:**
- Lazy load 3D components with `next/dynamic`
- Reduce particle counts on mobile
- Disable post-processing on low-end devices
- Use `frameloop="demand"` to limit renders
- Instanced meshes for repeated geometry

### 4. Glassmorphism Browser Support

**Challenge:** `backdrop-filter` has limited support.

**Solution:**
- Use `-webkit-backdrop-filter` prefix
- Provide fallback for unsupported browsers
- Test extensively in Safari

---

## File Structure

```
drama-website/
├── app/
│   ├── layout.tsx                    # Root layout with fonts & SEO
│   ├── page.tsx                      # Main single-page composition
│   ├── globals.css                   # Design system + glassmorphism
│   └── api/
│       └── contact/
│           └── route.ts              # Email API endpoint (Resend)
├── components/
│   ├── three/                        # All 3D components
│   │   ├── RubiksCube.tsx           # Main cube scene
│   │   ├── CubeGeometry.tsx         # Cube rendering logic
│   │   ├── SolvingAnimation.tsx     # Scroll integration
│   │   ├── NeuralNetworkVisual.tsx  # AI service visual
│   │   ├── CodeEditorVisual.tsx     # Full-stack visual
│   │   └── BlueprintVisual.tsx      # Enterprise visual
│   ├── ui/                           # Reusable UI components
│   │   ├── Navigation.tsx           # Glass nav bar
│   │   ├── Button.tsx               # Gradient button
│   │   ├── GlassCard.tsx           # Glass card component
│   │   ├── Badge.tsx               # Tech stack badges
│   │   ├── ProjectCard.tsx         # Portfolio card
│   │   ├── ContactForm.tsx         # Contact form with validation
│   │   └── Footer.tsx              # Footer
│   ├── sections/                     # Page sections
│   │   ├── Hero.tsx                # Hero with 3D background
│   │   ├── Services.tsx            # Service cards with 3D
│   │   ├── AILab.tsx               # AI demo showcase
│   │   ├── Portfolio.tsx           # Project grid
│   │   └── Contact.tsx             # Contact section
│   ├── demos/                        # AI Lab demos
│   │   ├── ChatbotDemo.tsx         # Chatbot animation
│   │   ├── DataExtractionDemo.tsx  # Data extraction visual
│   │   └── AutomationDemo.tsx      # Workflow animation
│   └── animations/
│       ├── variants.ts             # Framer Motion variants
│       └── ScrollAnimations.tsx    # GSAP utilities
├── lib/
│   ├── rubiks/
│   │   ├── cubeState.ts           # Cube logic & state management
│   │   └── solver.ts              # Solving algorithm
│   └── utils.ts                   # Utility functions (cn, lerp, clamp)
├── types/
│   └── index.ts                   # TypeScript definitions
├── tailwind.config.ts             # Design system tokens
├── tsconfig.json                  # TypeScript config (strict mode)
├── next.config.js                 # Next.js optimization
└── .env.local                     # Environment variables (not committed)
```

---

## Environment Variables

Create `.env.local` (do not commit):
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Testing Checklist

### Visual Quality
- [ ] All animations smooth at 60 FPS
- [ ] Glassmorphism renders correctly in all browsers
- [ ] Gradient text displays properly (no banding)
- [ ] Hover effects responsive and polished
- [ ] 3D visuals load without errors

### Functionality
- [ ] Navigation smooth scrolls to sections
- [ ] Rubik's cube solves on scroll
- [ ] Contact form validates correctly
- [ ] Email sends successfully
- [ ] Portfolio filter works
- [ ] All CTAs functional

### Performance
- [ ] Lighthouse score 90+
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Smooth on mid-range devices

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Form labels properly associated

### Responsive
- [ ] Mobile navigation works
- [ ] All sections adapt to small screens
- [ ] Text readable on all sizes
- [ ] 3D performance acceptable on mobile

---

## Deployment

### Vercel Deployment

```bash
# Install CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment Variables: Add in dashboard

### Post-Deployment
1. Test all functionality on production URL
2. Verify email delivery
3. Run Lighthouse audit
4. Test on multiple devices
5. Verify SEO meta tags
6. Check Open Graph preview

---

## Instructions for Claude Code

When working on this project:

1. **Always consult the implementation plan:** [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)

2. **Use the available skills:**
   - Invoke `frontend-design` skill when creating UI components
   - Invoke `react-best-practices` skill when writing React code

3. **Use specialized agents:**
   - Use `code-architect` agent for architectural decisions
   - Use `code-reviewer` agent after writing significant code
   - Use `code-simplifier` agent when complexity grows

4. **Follow the design system strictly:**
   - Use exact color values from `tailwind.config.ts`
   - Use specified fonts (Syne, DM Sans, JetBrains Mono)
   - Maintain glassmorphism aesthetic
   - Never deviate from the brand identity

5. **Prioritize visual quality:**
   - Stunning visuals first (per user preference)
   - Smooth 60 FPS animations
   - Production-grade code
   - No placeholders or TODOs

6. **Test frequently:**
   - Run `npm run dev` after each major component
   - Test in multiple browsers
   - Check mobile responsiveness
   - Verify performance with Lighthouse

7. **Ask questions when needed:**
   - Clarify unclear requirements
   - Validate architectural decisions
   - Confirm visual design choices

---

## Contact Information (To Be Updated)

Before deployment, update these placeholders:
- Email address: `your@email.com` → actual email
- LinkedIn URL: `https://linkedin.com/in/yourprofile` → actual profile
- Calendly link: `https://calendly.com/yourlink` → actual link
- Domain: `yourdomain.com` → actual domain

---

## Success Criteria

This portfolio is successful when:

✅ **It looks bespoke and expensive** - not AI-generated
✅ **The Rubik's cube is stunning** - smooth scroll animation
✅ **Glassmorphism is polished** - works in all browsers
✅ **All interactions are functional** - no fake buttons
✅ **Performance is excellent** - Lighthouse 90+, smooth on all devices
✅ **Brand identity shines** - intelligent, mathematical, approachable
✅ **It differentiates the user** - clearly shows AI expertise beyond typical web dev

---

## Quick Reference: Design Tokens

### Colors (Tailwind Classes)
```
bg-base-darker    - #0a0a0f (deepest background)
bg-base-dark      - #12121a (secondary background)
bg-base           - #1a1a24 (elevated surfaces)

text-accent-cyan      - #00f5d4 (primary accent)
text-accent-magenta   - #f72585 (secondary accent)
text-accent-violet    - #7b2cbf (tertiary accent)

text-text-primary     - #f8f9fa (main text)
text-text-secondary   - #adb5bd (secondary text)
```

### Typography Classes
```
font-display  - Syne (headings)
font-sans     - DM Sans (body)
font-mono     - JetBrains Mono (code)
```

### Special Classes
```
.glass           - Glassmorphism effect
.glass-card      - Glass card with padding
.gradient-text   - Cyan→Violet→Magenta text gradient
.glow-cyan       - Cyan glow effect
.glow-magenta    - Magenta glow effect
```

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production

# Testing
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

---

*This portfolio will be an unforgettable showcase of technical excellence and AI capabilities. The scroll-animated Rubik's cube will create immediate impact, and the overall experience will position the user as a premium AI engineer and full-stack developer.*
