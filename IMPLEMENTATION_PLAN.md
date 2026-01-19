# AI Engineer Portfolio - Implementation Plan

## Project Overview

Building a production-grade portfolio website for an AI Engineer/Full-Stack Developer with a stunning scroll-animated Rubik's Cube as the hero element. The site must look bespoke and expensive, avoiding all generic AI-generated aesthetics.

**Tech Stack:**
- Next.js 14+ (App Router) + TypeScript (strict mode)
- Tailwind CSS with custom design system
- Three.js (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
- Framer Motion + GSAP (scroll animations)
- Resend (email service)

**Structure:** Single-page app with smooth scroll navigation

---

## Phase 1: Project Initialization (Day 1) 

### 1.1 Create Next.js Project [Completed]

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

### 1.2 Install Dependencies [Completed]

```bash
# 3D Graphics & Animation
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install @types/three --save-dev

# Animation
npm install framer-motion gsap @gsap/react

# Email Service
npm install resend

# Utilities
npm install clsx tailwind-merge zod
```

### 1.3 Configure TypeScript (tsconfig.json)

Enable strict mode:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### 1.4 Configure Next.js (next.config.js)

```javascript
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  }
}
```

**Critical Files:**
- [next.config.js](next.config.js)
- [tsconfig.json](tsconfig.json)
- [package.json](package.json)

---

## Phase 2: Design System Foundation (Day 1-2)

### 2.1 Tailwind Configuration

**File:** [tailwind.config.ts](tailwind.config.ts)

Implement exact design system:
```typescript
theme: {
  extend: {
    colors: {
      'base-darker': '#0a0a0f',
      'base-dark': '#12121a',
      'base': '#1a1a24',
      'accent-cyan': '#00f5d4',
      'accent-magenta': '#f72585',
      'accent-violet': '#7b2cbf',
      'text-primary': '#f8f9fa',
      'text-secondary': '#adb5bd',
    },
    fontFamily: {
      display: ['var(--font-syne)', 'sans-serif'],
      sans: ['var(--font-dm-sans)', 'sans-serif'],
      mono: ['var(--font-jetbrains-mono)', 'monospace'],
    },
    backgroundImage: {
      'gradient-hero': 'linear-gradient(135deg, #00f5d4 0%, #7b2cbf 50%, #f72585 100%)',
    }
  }
}
```

### 2.2 Global Styles

**File:** [app/globals.css](app/globals.css)

- Import Google Fonts: Syne, DM Sans, JetBrains Mono
- Define glassmorphism classes (.glass, .glass-card)
- Define gradient text (.gradient-text)
- Define glow effects (.glow-cyan, .glow-magenta)
- Custom scrollbar styling

### 2.3 Utility Functions

**File:** [lib/utils.ts](lib/utils.ts)

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
```

### 2.4 TypeScript Types

**File:** [types/index.ts](types/index.ts)

Define interfaces for:
- Project, Service, AIDemo
- CubeFace, CubeColor, CubeState, CubeMove
- ContactFormData, AnimationVariant

**Verification:**
- [ ] Run `npm run dev` - should compile without errors
- [ ] Check design tokens in DevTools
- [ ] Verify fonts load correctly

---

## Phase 3: Core UI Components (Day 2-3)

### 3.1 Button Component

**File:** [components/ui/Button.tsx](components/ui/Button.tsx)

Features:
- Variants: primary, secondary, outline
- Gradient border effect using pseudo-elements
- Glow animation on hover
- Loading state with spinner

### 3.2 GlassCard Component

**File:** [components/ui/GlassCard.tsx](components/ui/GlassCard.tsx)

Features:
- Glassmorphism: `bg-base-dark/40 backdrop-blur-xl`
- Border: `border border-base-light/20`
- Hover: lift + glow effect
- Configurable glow color (cyan, magenta, violet)

### 3.3 Badge Component

**File:** [components/ui/Badge.tsx](components/ui/Badge.tsx)

Small pill-shaped badges for tech stack tags and categories.

### 3.4 Navigation Component

**File:** [components/ui/Navigation.tsx](components/ui/Navigation.tsx)

Features:
- Fixed glass nav bar with backdrop blur
- Logo/name on left
- Smooth scroll links (Home, Services, AI Lab, Work, Contact)
- "Let's Talk" CTA button on right
- Mobile hamburger menu
- Hide on scroll down, show on scroll up (Framer Motion)

**Verification:**
- [ ] Button variants render correctly
- [ ] Glass cards show blur effect
- [ ] Navigation is fixed and functional
- [ ] Mobile menu works

---

## Phase 4: Rubik's Cube Foundation (Day 3-5) - REVISED

**CRITICAL:** This is the hero showpiece. We're adapting the proven DataKeeper implementation which creates an "Order from Chaos" narrative through 4 scroll phases.

**Key Insight:** We're NOT implementing a traditional Rubik's cube solver. Instead, we use **choreographed slice rotations** that create the visual impression of solving - much simpler and more visually controllable.

### 4.1 Architecture Overview

**Approach:** Pragmatic Balance - Adapt DataKeeper's proven 655-line implementation with a configuration layer for easy customization.

**Reference Implementation:** `examples/datakeeper-main/components/ThreeScene.tsx`

**File Structure:**
```
components/
├── three/
│   ├── RubiksCubeScene.tsx      # ~655 lines - All cube logic (adapted)
│   └── ErrorBoundary.tsx        # ~50 lines - WebGL error handling
└── sections/
    └── Hero.tsx                 # ~150 lines - 3D + content overlay

config/
├── cubeTheme.ts                 # ~50 lines - Colors, physics settings
└── cubeIcons.ts                 # ~30 lines - AI icon definitions

utils/
└── createIconTexture.ts         # ~150 lines - Canvas icon generation

types/
└── cube.ts                      # ~20 lines - TypeScript interfaces
```

### 4.2 Configuration System

**File:** [config/cubeTheme.ts](config/cubeTheme.ts)

Centralized color and physics configuration - **easily swappable**:

```typescript
export const CUBE_THEME = {
  // Primary cube colors (neon accents from design system)
  colors: {
    primary: '#00f5d4',      // Cyan
    secondary: '#f72585',    // Magenta
    tertiary: '#7b2cbf',     // Violet
    neutral1: '#1a1a24',     // Dark base
    neutral2: '#adb5bd',     // Light gray
    neutral3: '#f8f9fa',     // Almost white
  },

  // Cube face color array (randomized during generation)
  cubeColors: [
    '#00f5d4',  // Cyan faces
    '#f72585',  // Magenta faces
    '#7b2cbf',  // Violet faces
    '#1a1a24',  // Dark faces
    '#adb5bd',  // Gray faces
    '#f8f9fa',  // Light faces
  ],

  // Scene settings
  scene: {
    background: '#0a0a0f',  // Deep obsidian (base-darker)
    ambientLight: 0.7,
    directionalIntensity: 1.5,
  },

  // Physics settings (for final interactive phase)
  physics: {
    floorY: -5.0,
    repulsionRadius: 4.0,
    repulsionForce: 45.0,
    drag: 0.96,
  },

  // Responsive positioning
  responsive: {
    mobile: { scale: 0.65, position: [0, -2.8, 0] },
    desktop: { scale: 0.95, position: [3.5, 0, 0] },
  }
} as const;
```

**File:** [config/cubeIcons.ts](config/cubeIcons.ts)

AI-themed icons for center cube faces:

```typescript
export type IconType =
  | 'neural-network'  // Neural network nodes
  | 'code-brackets'   // </>
  | 'brain'           // Brain outline
  | 'data-flow'       // Data arrows
  | 'circuit'         // Circuit board pattern
  | 'cube-3d';        // 3D spatial

// Center face icon assignments
export const CENTER_FACE_ICONS = {
  front: 'neural-network',   // z=1, x=0, y=0
  back: 'code-brackets',     // z=-1, x=0, y=0
  top: 'brain',              // y=1, x=0, z=0
  right: 'data-flow',        // x=1, y=0, z=0
  left: 'circuit',           // x=-1, y=0, z=0
} as const;
```

### 4.3 Cube Structure (Slice-Based)

The cube consists of **27 individual cubes** organized into **3 horizontal slices**:

```typescript
// Slice architecture allows independent rotation
const slices = {
  top: [],  // 9 cubes at y=1.05
  mid: [],  // 9 cubes at y=0
  bot: [],  // 9 cubes at y=-1.05
};

// Each cube has:
interface CubeData {
  id: string;                           // e.g., "1-0--1"
  localPosition: [number, number, number];
  color: string;                        // From CUBE_THEME.cubeColors
  iconType?: IconType;                  // Only for center faces
  layer: 'top' | 'mid' | 'bot';
}
```

### 4.4 4-Phase Scroll Animation

**GSAP ScrollTrigger** drives all transitions through 4 synchronized timelines:

| Phase | Section | Cube Behavior |
|-------|---------|---------------|
| 1 | Hero | Idle animation: slices rotate in loop, cube appears to "solve" |
| 2 | Details | Cube moves to center, scales down, idle continues |
| 3 | Breakdown | Idle stops, slices flatten, cubes **explode outward** |
| 4 | Footer | Cubes **drop with physics**, become **interactive** (drag/throw/push) |

**Timeline Configuration:**

```typescript
// Phase 1→2: Hero to Details
const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    endTrigger: "#details-section",
    end: "center center",
    scrub: 1.2,  // Smooth scroll sync
  }
});

// Phase 2→3: Details to Breakdown (Explosion)
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#details-section",
    start: "bottom bottom",
    endTrigger: "#breakdown-section",
    end: "center center",
    scrub: 1,
  }
});

// Phase 3→4: Breakdown to Footer (Physics Drop)
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#breakdown-section",
    start: "center center",
    endTrigger: "#footer-section",
    end: "bottom bottom",
    scrub: 1.5,
    onLeave: () => { physics.active = true; },  // Enable physics
    onEnterBack: () => { physics.active = false; }
  }
});
```

### 4.5 Physics System (Interactive Final Phase)

When user scrolls past the footer, cubes become interactive:

- **Mouse Repulsion:** Cubes push away from cursor
- **Drag & Throw:** Click and drag cubes, release to throw
- **Cube-to-Cube Collision:** Cubes bounce off each other
- **Wall Collision:** Cubes bounce off viewport edges
- **Friction:** Velocities decay over time (drag: 0.96)

```typescript
interface PhysicsState {
  active: boolean;
  velocities: THREE.Vector3[];  // One per cube
  offsets: THREE.Vector3[];
}

// Physics loop runs in useFrame (only when active)
useFrame((state, delta) => {
  if (!physics.active) return;

  cubes.forEach((mesh, i) => {
    // Apply forces, collisions, boundaries
    mesh.position.x += velocity.x * delta;
    velocity.multiplyScalar(CUBE_THEME.physics.drag);
  });
});
```

### 4.6 Icon Texture Generator

**File:** [utils/createIconTexture.ts](utils/createIconTexture.ts)

Canvas-based icon generation (no external assets):

```typescript
export function createIconTexture(type: IconType, color: string): string {
  const canvas = document.createElement('canvas');
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Draw icon based on type
  switch (type) {
    case 'neural-network':
      // Draw 3 layers of nodes with connections
      break;
    case 'code-brackets':
      // Draw </> symbol
      break;
    case 'brain':
      // Draw brain outline
      break;
    // ...
  }

  return canvas.toDataURL();  // Returns base64 PNG
}
```

### 4.7 3D Scene Setup

**File:** [components/three/RubiksCubeScene.tsx](components/three/RubiksCubeScene.tsx)

Adapted from DataKeeper's ThreeScene.tsx with the following structure:

```typescript
'use client';

import dynamic from 'next/dynamic';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, RoundedBox, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CUBE_THEME } from '@/config/cubeTheme';
import { CENTER_FACE_ICONS } from '@/config/cubeIcons';
import { createIconTexture } from '@/utils/createIconTexture';

gsap.registerPlugin(ScrollTrigger);

export default function RubiksCubeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        <color attach="background" args={[CUBE_THEME.scene.background]} />

        <ambientLight intensity={CUBE_THEME.scene.ambientLight} />
        <directionalLight position={[5, 10, 7]} intensity={CUBE_THEME.scene.directionalIntensity} />

        <RubiksCube />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
```

### 4.8 Implementation Phases (Revised)

**Phase 4a: Configuration & Types (2 hours)**
- [ ] Create `config/cubeTheme.ts` with color configuration
- [ ] Create `config/cubeIcons.ts` with icon definitions
- [ ] Create `types/cube.ts` with TypeScript interfaces
- [ ] Test: Configuration loads without errors

**Phase 4b: Icon Texture Generator (2 hours)**
- [ ] Create `utils/createIconTexture.ts`
- [ ] Implement AI-themed icons (neural-network, code-brackets, brain, data-flow, circuit)
- [ ] Test: Icons render correctly on canvas

**Phase 4c: Main 3D Scene (4 hours)**
- [ ] Create `components/three/RubiksCubeScene.tsx` (adapt from DataKeeper)
- [ ] Update colors to use `CUBE_THEME.cubeColors`
- [ ] Update icon assignments to use `CENTER_FACE_ICONS`
- [ ] Add `'use client'` directive for Next.js
- [ ] Test: Cube renders with neon colors and AI icons

**Phase 4d: Scroll Animation Integration (3 hours)**
- [ ] Configure ScrollTrigger for 4 phases
- [ ] Test idle animation (Hero phase)
- [ ] Test centering transition (Details phase)
- [ ] Test explosion effect (Breakdown phase)
- [ ] Test physics drop (Footer phase)

**Phase 4e: Physics System (2 hours)**
- [ ] Verify physics activates on footer scroll
- [ ] Test mouse repulsion
- [ ] Test drag and throw
- [ ] Test cube-to-cube collision
- [ ] Test wall boundaries

**Verification Checklist:**
- [ ] Cube renders correctly with neon colors
- [ ] AI icons visible on center faces
- [ ] Scroll phases transition smoothly
- [ ] Physics interactive after final phase
- [ ] Performance smooth at 60 FPS
- [ ] Mobile responsive (adjusted scale/position)

---

## Phase 5: Hero Section with 4-Phase Layout (Day 5-6) - REVISED

**File:** [components/sections/Hero.tsx](components/sections/Hero.tsx)

The Hero section now spans **4 full-screen sections** to accommodate the scroll animation phases:

```typescript
'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// Lazy load 3D scene (SSR causes Three.js issues)
const RubiksCubeScene = dynamic(
  () => import('@/components/three/RubiksCubeScene'),
  { ssr: false, loading: () => <HeroLoadingState /> }
);

export function Hero() {
  return (
    <>
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <RubiksCubeScene />
      </div>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10">

        {/* Section 1: Hero */}
        <section id="hero-section" className="relative min-h-screen flex items-center">
          <div className="max-w-4xl px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-9xl gradient-text">
                ARCHITECTING<br />INTELLIGENCE
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-md">
                AI Engineer & Full-Stack Developer crafting sophisticated systems
              </p>
              <div className="flex gap-4">
                <Button gradient glow>Start a Project</Button>
                <Button variant="outline">Explore Services</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Details (Cube centers) */}
        <section id="details-section" className="relative min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl px-6 glass-card p-8">
            <h2 className="text-4xl md:text-6xl font-serif italic text-text-primary mb-4">
              Break it down.
            </h2>
            <p className="text-xl font-bold text-text-primary">
              Analyze every bit.
            </p>
            <p className="text-text-secondary mt-4">
              Watch as complex challenges align perfectly.
              Turning chaos into elegant solutions.
            </p>
          </div>
        </section>

        {/* Section 3: Breakdown (Cube explodes) */}
        <section id="breakdown-section" className="relative min-h-screen flex items-center justify-between px-6 md:px-16">
          <div className="flex flex-col gap-16">
            <SpecLabel label="Latency" value="< 100ms" sub="Real-time AI responses" />
            <SpecLabel label="Accuracy" value="99.2%" sub="Production-grade models" />
          </div>
          <div className="flex flex-col gap-16 text-right">
            <SpecLabel label="Scale" value="∞" sub="Cloud-native architecture" align="right" />
            <SpecLabel label="Uptime" value="99.99%" sub="Enterprise reliability" align="right" />
          </div>
        </section>

        {/* Section 4: Footer (Cubes drop with physics) */}
        <section id="footer-section" className="relative min-h-[90vh] flex flex-col items-center justify-center">
          <span className="text-sm font-mono uppercase tracking-widest text-text-secondary mb-8">
            Final Output
          </span>
          <h2 className="text-6xl md:text-9xl font-serif italic text-text-primary text-center">
            Order from<br />Chaos.
          </h2>
          <Button className="mt-16" gradient glow size="lg">
            Get Started
          </Button>
        </section>

      </div>
    </>
  );
}

// Spec label component for breakdown section
function SpecLabel({ label, value, sub, align = 'left' }) {
  return (
    <div className={`glass-card p-4 ${align === 'right' ? 'text-right' : ''}`}>
      <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
        {label}
      </span>
      <h4 className="text-3xl md:text-4xl font-serif italic text-text-primary mt-1">
        {value}
      </h4>
      <p className="text-sm text-text-secondary mt-1">{sub}</p>
    </div>
  );
}

function HeroLoadingState() {
  return (
    <div className="w-full h-full bg-base-darker flex items-center justify-center">
      <div className="animate-pulse text-accent-cyan">Loading...</div>
    </div>
  );
}
```

**Key Architecture Decisions:**
- **Fixed 3D canvas (`fixed inset-0`)** - Stays in place while content scrolls
- **Dynamic import with `ssr: false`** - Prevents Next.js SSR errors with Three.js
- **4 section IDs** - Match ScrollTrigger targets in RubiksCubeScene
- **Glassmorphism cards** - Use `.glass-card` class for frosted effect

**Verification:**
- [ ] All 4 sections render correctly
- [ ] 3D cube visible through all sections
- [ ] Scroll triggers phase transitions
- [ ] Content readable against 3D background
- [ ] Mobile responsive layout

---

## Phase 6: Services Section (Day 6-7)

**File:** [components/sections/Services.tsx](components/sections/Services.tsx)

Three glass cards in a grid, each with a 3D visualization:

### 6.1 Service Cards Data

```typescript
const services = [
  {
    id: 'ai',
    title: 'AI & Intelligence Services',
    description: 'Custom AI solutions, from chatbots to complex neural architectures',
    visual: <NeuralNetworkVisual />,
    features: ['LLM Integration', 'Custom Models', 'AI Agents', 'RAG Systems']
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Engineering',
    description: 'Modern web applications with cutting-edge technologies',
    visual: <CodeEditorVisual />,
    features: ['Next.js/React', 'Node.js APIs', 'Cloud Architecture']
  },
  {
    id: 'enterprise',
    title: 'Enterprise Systems',
    description: 'Scalable solutions for complex business requirements',
    visual: <BlueprintVisual />,
    features: ['System Design', 'Automation', 'Integration']
  }
]
```

### 6.2 3D Service Visuals

**A. Neural Network Visual**
- **File:** [components/three/NeuralNetworkVisual.tsx](components/three/NeuralNetworkVisual.tsx)
- Animated nodes in 3D space (3 layers)
- Pulsing connections between nodes
- Particles flowing along connections
- Cyan gradient colors

**B. Code Editor Visual**
- **File:** [components/three/CodeEditorVisual.tsx](components/three/CodeEditorVisual.tsx)
- Floating code blocks with syntax highlighting
- Typing animation effect
- Rotating around Y-axis
- Violet gradient colors

**C. Blueprint Visual**
- **File:** [components/three/BlueprintVisual.tsx](components/three/BlueprintVisual.tsx)
- Wireframe architectural grid
- Rotating geometric shapes
- Connection lines forming a system
- Magenta gradient colors

**Card Design:**
- Glassmorphism with `bg-bg-glass`, `backdrop-blur-lg`
- 3D visual in 256px height container at top
- Title, description, feature badges below
- Hover: lift (`translateY(-8px)`) + glow effect

**Verification:**
- [ ] Three cards display in grid
- [ ] 3D visuals render in each card
- [ ] Hover effects work smoothly
- [ ] Responsive on mobile (single column)

---

## Phase 7: AI Lab Section (Day 7-9)

**CRITICAL:** Architecture must support future interactive demos.

### 7.1 Extensible Architecture

**File:** [components/sections/AILab.tsx](components/sections/AILab.tsx)

```typescript
interface AIDemoConfig {
  id: string
  title: string
  description: string
  component: React.LazyExoticComponent<React.ComponentType>
  interactive: boolean
  previewMode: boolean
}

const DEMOS: AIDemoConfig[] = [
  {
    id: 'chatbot',
    title: 'Conversational AI',
    component: lazy(() => import('@/components/demos/ChatbotDemo')),
    interactive: false, // Start with animation
    previewMode: true
  },
  // More demos...
]
```

### 7.2 Demo Components (Phase 1: Animated Visualizations)

**A. Chatbot Demo**
- **File:** [components/demos/ChatbotDemo.tsx](components/demos/ChatbotDemo.tsx)
- Animated chat bubbles appearing in sequence
- Loop every 6 seconds
- User messages (right-aligned, cyan), Assistant messages (left-aligned)

**B. Data Extraction Demo**
- **File:** [components/demos/DataExtractionDemo.tsx](components/demos/DataExtractionDemo.tsx)
- Animated SVG showing: Document → Scanning → JSON structure
- Particles representing data extraction
- Transform animation from unstructured to structured

**C. Automation Workflow Demo**
- **File:** [components/demos/AutomationDemo.tsx](components/demos/AutomationDemo.tsx)
- Decision tree flowchart
- Particles flow through paths
- Branching logic animation

**Section Layout:**
```typescript
<section className="py-32 px-6 bg-gradient-to-b from-base-darker to-base-dark">
  <h2 className="text-6xl font-display font-bold gradient-text">THE AI LAB</h2>
  <p className="text-xl text-text-secondary">
    Explore cutting-edge AI capabilities through interactive demonstrations
  </p>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {DEMOS.map(demo => <DemoCard key={demo.id} demo={demo} />)}
  </div>
</section>
```

**Future Extensibility:**
- To add interactive demo: Change `interactive: true` and implement full component
- Component architecture supports both preview and interactive modes
- Lazy loading ensures performance

**Verification:**
- [ ] All three demos render
- [ ] Animations loop smoothly
- [ ] Layout is responsive
- [ ] Can easily add new demo by updating DEMOS array

---

## Phase 8: Portfolio Section (Day 9-10)

**File:** [components/sections/Portfolio.tsx](components/sections/Portfolio.tsx)

### 8.1 Project Data Structure

```typescript
const PROJECTS: Project[] = [
  {
    id: 'llm-chatbot',
    title: 'Enterprise RAG Chatbot',
    description: 'Production chatbot with retrieval-augmented generation',
    category: 'AI',
    tags: ['LangChain', 'Pinecone', 'Next.js', 'FastAPI'],
    gradient: 'from-accent-cyan to-accent-violet' // Placeholder
  },
  // 5 more projects...
]
```

### 8.2 Project Card Component

**File:** [components/ui/ProjectCard.tsx](components/ui/ProjectCard.tsx)

Features:
- Gradient placeholder image (animated gradient shift)
- Category badge overlay
- Title and description
- Tech stack tags
- Hover: Image zoom (scale 1.1) + card lift

### 8.3 Filter Functionality

```typescript
const [filter, setFilter] = useState<'All' | 'AI' | 'Full-Stack' | 'Enterprise'>('All')

const filtered = filter === 'All'
  ? PROJECTS
  : PROJECTS.filter(p => p.category === filter)
```

Filter buttons above grid with active state styling.

**Verification:**
- [ ] 6 project cards display in grid
- [ ] Gradient placeholders animate
- [ ] Filter buttons work
- [ ] Hover effects smooth
- [ ] Responsive (3 cols → 2 cols → 1 col)

---

## Phase 9: Contact Section (Day 10-11)

**File:** [components/sections/Contact.tsx](components/sections/Contact.tsx)

### 9.1 Layout

Two-column layout:
- Left: Contact form
- Right: Direct contact links (Email, LinkedIn, Calendly)

### 9.2 Contact Form

**File:** [components/ui/ContactForm.tsx](components/ui/ContactForm.tsx)

Features:
- Zod validation schema
- Fields: name, email, company (optional), message
- Loading state during submission
- Success/error feedback
- Accessible labels and error messages

```typescript
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10)
})

async function handleSubmit(e: FormEvent) {
  const validated = contactSchema.parse(data)

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated)
  })

  // Handle success/error
}
```

### 9.3 Email API Route

**File:** [app/api/contact/route.ts](app/api/contact/route.ts)

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const data = contactSchema.parse(body)

  await resend.emails.send({
    from: 'Portfolio <noreply@yourdomain.com>',
    to: 'your@email.com',
    replyTo: data.email,
    subject: `New contact from ${data.name}`,
    html: `<h2>New Contact</h2><p><strong>Name:</strong> ${data.name}</p>...`
  })

  return NextResponse.json({ success: true })
}
```

**Setup:**
1. Sign up for Resend (https://resend.com)
2. Create `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxx
   ```
3. Add to `.gitignore`

**Verification:**
- [ ] Form validates correctly
- [ ] Email sends successfully
- [ ] Success message displays
- [ ] Error handling works
- [ ] Direct contact links open correctly

---

## Phase 10: Page Composition (Day 11)

### 10.1 Root Layout

**File:** [app/layout.tsx](app/layout.tsx)

- Load Google Fonts (Syne, DM Sans, JetBrains Mono)
- Set font CSS variables
- Meta tags and SEO
- Open Graph tags

### 10.2 Main Page

**File:** [app/page.tsx](app/page.tsx)

```typescript
'use client'

import { Navigation } from '@/components/ui/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AILab } from '@/components/sections/AILab'
import { Portfolio } from '@/components/sections/Portfolio'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Services />
      <AILab />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
```

### 10.3 Footer

**File:** [components/ui/Footer.tsx](components/ui/Footer.tsx)

Simple footer with:
- Copyright notice
- Social links
- "Based in Albania, working globally"

**Verification:**
- [ ] All sections render in order
- [ ] Smooth scroll between sections
- [ ] Navigation links jump to correct section

---

## Phase 11: Animation System (Day 12)

### 11.1 Framer Motion Variants

**File:** [components/animations/variants.ts](components/animations/variants.ts)

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}
```

### 11.2 Scroll Utilities

**File:** [components/animations/ScrollAnimations.tsx](components/animations/ScrollAnimations.tsx)

```typescript
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  options: ScrollTrigger.Vars
) {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top center',
      ...options
    })
    return () => trigger.kill()
  }, [ref, options])
}
```

**Verification:**
- [ ] Page load animations trigger correctly
- [ ] Scroll-triggered animations fire when entering viewport
- [ ] Animations feel smooth and polished

---

## Phase 12: Performance Optimization (Day 13)

### 12.1 Code Splitting

```typescript
// Lazy load 3D components
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: false // Disable SSR for Three.js
})

const AILab = dynamic(() => import('@/components/sections/AILab'), {
  loading: () => <AILabSkeleton />
})
```

### 12.2 Three.js Optimizations

- Use instanced meshes for repeated geometry
- Reduce post-processing on mobile
- Limit particle counts based on device
- Use `frameloop="demand"` where possible

### 12.3 Bundle Optimization

Update [next.config.js](next.config.js):
```javascript
experimental: {
  optimizePackageImports: ['@react-three/drei', '@react-three/fiber']
},
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization.splitChunks.cacheGroups = {
      three: {
        test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
        name: 'three',
        priority: 10,
      },
    }
  }
  return config
}
```

**Target Metrics:**
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

**Verification:**
- [ ] Run Lighthouse audit
- [ ] Check bundle sizes (`npm run build`)
- [ ] Test on slow 3G network
- [ ] Verify smooth performance on mid-range devices

---

## Phase 13: Responsive Design (Day 13-14)

### 13.1 Breakpoint Strategy

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 13.2 Key Adaptations

**Typography:**
```tsx
<h1 className="text-5xl md:text-7xl lg:text-9xl">
```

**Grid Layouts:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

**Navigation:**
- Desktop: Inline links
- Mobile: Hamburger menu

**3D Scenes:**
- Reduce complexity on mobile
- Lower particle counts
- Disable expensive post-processing

### 13.3 Mobile Testing

Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet sizes
- Different orientations

**Verification:**
- [ ] All sections work on mobile
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] 3D scenes perform well
- [ ] Navigation menu works

---

## Phase 14: Testing & QA (Day 14-15)

### 14.1 Visual QA Checklist

- [ ] All animations smooth at 60 FPS
- [ ] Glassmorphism effects render correctly
- [ ] Gradient text displays properly (no color banding)
- [ ] Hover states feel responsive
- [ ] Mobile navigation functional
- [ ] Form validation shows errors
- [ ] Email sending works end-to-end
- [ ] Rubik's cube solves correctly on scroll
- [ ] 3D visuals load without errors
- [ ] Sections properly spaced

### 14.2 Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest) - **Critical for gradient-text**
- Edge (latest)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

### 14.3 Accessibility

- [ ] Semantic HTML (`<nav>`, `<section>`, `<main>`)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast ratios meet WCAG AA (4.5:1)
- [ ] Form labels properly associated
- [ ] Alt text on all images

### 14.4 Functional Testing

- [ ] Contact form submits successfully
- [ ] Email arrives in inbox
- [ ] Form validation catches errors
- [ ] Smooth scroll navigation works
- [ ] Filter buttons in portfolio work
- [ ] All CTAs functional
- [ ] External links open in new tab

---

## Phase 15: Deployment (Day 15)

### 15.1 Environment Variables

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 15.2 Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Add environment variables in dashboard

### 15.3 Post-Deployment Checklist

- [ ] Test all functionality on production URL
- [ ] Verify email delivery works
- [ ] Check all links and CTAs
- [ ] Run Lighthouse on production
- [ ] Test on multiple devices
- [ ] Verify SEO meta tags
- [ ] Check Open Graph preview (LinkedIn, Twitter)
- [ ] Test contact form end-to-end

### 15.4 Domain Setup

1. Configure custom domain in Vercel
2. Update DNS records
3. Enable SSL (automatic with Vercel)
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## Critical Technical Challenges

### Challenge 1: Rubik's Cube Mathematical Accuracy

**Solution Approach:**
- Use standard cube notation (U, D, L, R, F, B with optional ')
- Represent state as 6 faces of 3x3 color grids
- Implement rotation transformations carefully
- **Recommended:** Pre-compute scramble + solution for reliability

**Alternative:** Use a library like `rubiks-cube-solver` npm package

### Challenge 2: Scroll-Synchronized Animation

**Solution:**
- GSAP ScrollTrigger with `scrub: 1` for smooth scrubbing
- Pin hero section during solve animation
- Break solution into timeline with precise timing
- Test across browsers for consistency

### Challenge 3: 3D Performance

**Solution:**
- Lazy load Three.js components
- Reduce geometry complexity on mobile
- Use instanced meshes for repeated objects
- Disable post-processing on low-end devices
- Monitor FPS and adjust

### Challenge 4: Glassmorphism Browser Support

**Solution:**
- Use `backdrop-filter: blur()` with `-webkit-` prefix
- Provide fallback for unsupported browsers
- Test extensively in Safari (known issues)

---

## File Structure Summary

```
drama-website/
├── app/
│   ├── layout.tsx                    # Root layout with fonts
│   ├── page.tsx                      # Main page composition
│   ├── globals.css                   # Design system + glassmorphism
│   └── api/
│       └── contact/
│           └── route.ts              # Email API endpoint
├── components/
│   ├── three/
│   │   ├── RubiksCube.tsx           # Main 3D scene
│   │   ├── CubeGeometry.tsx         # Cube rendering
│   │   ├── SolvingAnimation.tsx     # Scroll integration
│   │   ├── NeuralNetworkVisual.tsx  # AI service visual
│   │   ├── CodeEditorVisual.tsx     # Full-stack visual
│   │   └── BlueprintVisual.tsx      # Enterprise visual
│   ├── ui/
│   │   ├── Navigation.tsx           # Glass nav bar
│   │   ├── Button.tsx               # Gradient button
│   │   ├── GlassCard.tsx           # Reusable card
│   │   ├── Badge.tsx               # Tech tags
│   │   ├── ProjectCard.tsx         # Portfolio card
│   │   ├── ContactForm.tsx         # Contact form
│   │   └── Footer.tsx              # Footer
│   ├── sections/
│   │   ├── Hero.tsx                # Hero with 3D cube
│   │   ├── Services.tsx            # 3 service cards
│   │   ├── AILab.tsx               # Demo showcase
│   │   ├── Portfolio.tsx           # Project grid
│   │   └── Contact.tsx             # Contact section
│   ├── demos/
│   │   ├── ChatbotDemo.tsx         # Chatbot animation
│   │   ├── DataExtractionDemo.tsx  # Data extraction animation
│   │   └── AutomationDemo.tsx      # Workflow animation
│   └── animations/
│       ├── variants.ts             # Framer Motion variants
│       └── ScrollAnimations.tsx    # GSAP utilities
├── lib/
│   ├── rubiks/
│   │   ├── cubeState.ts           # Cube logic & state
│   │   └── solver.ts              # Solving algorithm
│   ├── utils.ts                   # Utility functions
│   └── email.ts                   # Email helper (optional)
├── types/
│   └── index.ts                   # TypeScript definitions
├── public/
│   └── (static assets)
├── tailwind.config.ts             # Design system tokens
├── tsconfig.json                  # TypeScript config
├── next.config.js                 # Next.js optimization
└── package.json
```

---

## Verification Plan

### After Each Phase:

**Phase 2 (Design System):**
```bash
npm run dev
# Check: Fonts load, colors correct, glassmorphism works
```

**Phase 4 (Rubik's Cube):**
```bash
# Check: Cube renders, colors correct, moves work, scroll animation triggers
```

**Phase 6 (Services):**
```bash
# Check: 3 cards display, 3D visuals render, hover effects work
```

**Phase 8 (Portfolio):**
```bash
# Check: Projects display, filters work, gradients animate
```

**Phase 9 (Contact):**
```bash
# Test: Fill form, submit, check email inbox
```

**Phase 12 (Performance):**
```bash
npm run build
npm run start
# Run Lighthouse audit
# Check bundle sizes
```

**Phase 13 (Responsive):**
```bash
# Test on mobile device or Chrome DevTools device mode
# Check all breakpoints
```

---

## Success Criteria

✅ **Visual Excellence:**
- Looks bespoke and expensive (not AI-generated)
- Rubik's cube is the stunning hero element
- Glassmorphism effects are polished
- Animations are smooth and purposeful

✅ **Technical Quality:**
- TypeScript strict mode with no errors
- Lighthouse score 90+
- All interactions functional
- Production-grade code

✅ **Brand Alignment:**
- Feels intelligent, mathematical, sleek
- Differentiates AI capabilities clearly
- Approachable yet high-tech

✅ **Performance:**
- < 1.5s First Contentful Paint
- 60 FPS animations
- Works smoothly on mid-range devices

✅ **Extensibility:**
- AI Lab accepts new demos easily
- Design system is well-documented
- Code is maintainable

---

## Next Steps After Implementation

1. **Content Updates:**
   - Replace placeholder projects with real case studies
   - Add actual project images
   - Write detailed project descriptions

2. **AI Lab Enhancement:**
   - Convert animations to interactive demos
   - Add backend API for chatbot
   - Implement real data extraction tool

3. **Analytics:**
   - Add Google Analytics or Vercel Analytics
   - Track form submissions
   - Monitor user engagement

4. **SEO Optimization:**
   - Submit sitemap to Google
   - Add structured data (JSON-LD)
   - Optimize meta descriptions

5. **Content Marketing:**
   - Write blog posts about AI projects
   - Share case studies
   - Create portfolio presentation deck

---

## Estimated Timeline

- **Week 1:** Foundation + Rubik's Cube + Hero (Days 1-6)
- **Week 2:** Services + AI Lab + Portfolio + Contact (Days 7-11)
- **Week 3:** Polish + Optimization + Testing + Deploy (Days 12-15)

**Total: ~15 days of focused work**

---

## Key Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Three.js Journey](https://threejs-journey.com/) - For 3D learning
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Resend Docs](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

---

## Contact Information to Update

Before deployment, update these placeholders:
- Email address in contact form
- LinkedIn profile URL
- Calendly scheduling link
- Domain name in environment variables
- Open Graph images

---

*This portfolio will be a stunning showcase of technical excellence and AI capabilities. The scroll-animated Rubik's cube will be unforgettable, and the overall experience will position you as a premium AI engineer and full-stack developer.*
