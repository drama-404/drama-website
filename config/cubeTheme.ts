/**
 * Rubik's Cube Theme Configuration
 *
 * This file centralizes all color and physics settings for the 3D Rubik's cube.
 * To change the color scheme, simply modify the values below - no need to touch
 * any other files!
 *
 * @example
 * // Change primary color from cyan to green:
 * colors: {
 *   primary: '#00ff88',  // was '#00f5d4'
 *   ...
 * }
 */

export const CUBE_THEME = {
  // =========================================
  // COLOR PALETTE
  // =========================================
  // These are the neon accent colors from the design system.
  // Cube faces will randomly pick from cubeColors array.
  colors: {
    primary: '#00f5d4',      // Cyan - main accent
    secondary: '#f72585',    // Magenta - secondary accent
    tertiary: '#7b2cbf',     // Violet - tertiary accent
    neutral1: '#1a1a24',     // Dark base (for contrast)
    neutral2: '#adb5bd',     // Light gray
    neutral3: '#f8f9fa',     // Almost white
  },

  // Array of colors used for cube faces (randomly assigned)
  // Feel free to adjust the distribution or add/remove colors
  cubeColors: [
    '#00f5d4',  // Cyan
    '#f72585',  // Magenta
    '#7b2cbf',  // Violet
    '#1a1a24',  // Dark
    '#adb5bd',  // Gray
    '#f8f9fa',  // Light
  ],

  // Color used for icon outlines on cube faces
  iconColor: '#f8f9fa',  // Light color for visibility

  // =========================================
  // SCENE SETTINGS
  // =========================================
  scene: {
    background: '#0a0a0f',      // Deep obsidian (base-darker)
    ambientLight: 0.7,          // Soft overall illumination
    directionalIntensity: 1.5,  // Main light intensity
    fillLightColor: '#bfdbfe',  // Blue-tinted fill light
  },

  // =========================================
  // CUBE MATERIAL
  // =========================================
  material: {
    roughness: 0.3,   // Lower = shinier
    metalness: 0.1,   // Subtle metallic sheen
  },

  // =========================================
  // PHYSICS SETTINGS (Interactive Phase)
  // =========================================
  physics: {
    floorY: -5.0,           // Y position of the "floor" where cubes land
    repulsionRadius: 4.0,   // How close cursor needs to be to push cubes
    repulsionForce: 45.0,   // Strength of cursor push
    drag: 0.96,             // Friction (1.0 = no friction, 0.9 = heavy friction)
    collisionMinDist: 1.1,  // Minimum distance before cubes collide
    collisionForce: 15.0,   // Strength of cube-to-cube collision
  },

  // =========================================
  // ANIMATION TIMING
  // =========================================
  animation: {
    idleSpeed: 0.8,           // Base duration for idle rotation moves
    scrollSmoothness: 1.2,    // GSAP scrub value (higher = smoother but laggier)
    explosionDuration: 1.0,   // Duration of explosion animation
  },

  // =========================================
  // RESPONSIVE POSITIONING
  // =========================================
  // Cube position and scale at different breakpoints
  responsive: {
    mobile: {
      scale: 0.65,
      position: [0, -2.8, 0] as [number, number, number],
    },
    desktop: {
      scale: 0.95,
      position: [3.5, 0, 0] as [number, number, number],
    },
  },

  // =========================================
  // CUBE STRUCTURE
  // =========================================
  structure: {
    gap: 1.05,  // Spacing between cube pieces
  },
} as const;

// Type export for use in other files
export type CubeTheme = typeof CUBE_THEME;
