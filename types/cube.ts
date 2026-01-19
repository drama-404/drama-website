/**
 * TypeScript Types for Rubik's Cube Implementation
 */

import type * as THREE from 'three';
import type { IconType } from '@/config/cubeIcons';

/**
 * Data structure for a single cube piece
 */
export interface CubeData {
  /** Unique identifier (e.g., "1-0--1") */
  id: string;
  /** Position relative to slice group */
  localPosition: [number, number, number];
  /** Color hex string */
  color: string;
  /** Icon type (only for center cubes) */
  iconType?: IconType;
  /** Which horizontal slice this cube belongs to */
  layer: 'top' | 'mid' | 'bot';
}

/**
 * Organized cube grid by horizontal slices
 */
export interface CubeGridState {
  top: CubeData[];  // 9 cubes at y = 1.05
  mid: CubeData[];  // 9 cubes at y = 0
  bot: CubeData[];  // 9 cubes at y = -1.05
}

/**
 * Physics state for interactive phase
 */
export interface PhysicsState {
  /** Whether physics simulation is active */
  active: boolean;
  /** Velocity vectors for each cube */
  velocities: THREE.Vector3[];
  /** Offset vectors (for animations) */
  offsets: THREE.Vector3[];
}

/**
 * Props for the individual Cube component
 */
export interface CubeProps {
  /** Position in 3D space */
  position: [number, number, number];
  /** Rotation in radians [x, y, z] */
  rotation?: [number, number, number];
  /** Uniform scale */
  scale?: number;
  /** Face color */
  color: string;
  /** Visual type (currently only solid supported) */
  type?: 'solid';
  /** Icon to display on front face */
  iconType?: IconType;
}

/**
 * Current scroll phase
 */
export type ScrollPhase = 'hero' | 'details' | 'breakdown' | 'footer';

/**
 * Animation refs used by GSAP
 */
export interface AnimationRefs {
  mainGroup: THREE.Group | null;
  topSlice: THREE.Group | null;
  midSlice: THREE.Group | null;
  botSlice: THREE.Group | null;
  cubes: THREE.Group[];
}
