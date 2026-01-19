/**
 * AI-Themed Icon Configuration for Rubik's Cube
 *
 * Each center face of the cube displays an icon representing AI/tech capabilities.
 * Icons are rendered via canvas (no external assets needed).
 *
 * To add a new icon:
 * 1. Add the type to IconType
 * 2. Add metadata to ICON_REGISTRY
 * 3. Implement the drawing case in utils/createIconTexture.ts
 * 4. (Optional) Assign it to a face in CENTER_FACE_ICONS
 */

// Available icon types
export type IconType =
  | 'neural-network'  // Neural network with nodes and connections
  | 'code-brackets'   // </> programming symbol
  | 'brain'           // Brain outline (AI intelligence)
  | 'data-flow'       // Data flow arrows/boxes
  | 'circuit'         // Circuit board pattern
  | 'cube-3d';        // 3D cube (spatial/3D work)

// Metadata for each icon (for future UI like legends, tooltips)
export const ICON_REGISTRY: Record<IconType, { label: string; description: string }> = {
  'neural-network': {
    label: 'Neural Networks',
    description: 'Custom AI models and deep learning architectures',
  },
  'code-brackets': {
    label: 'Full-Stack Dev',
    description: 'Modern web applications with cutting-edge tech',
  },
  'brain': {
    label: 'AI Intelligence',
    description: 'Intelligent systems that learn and adapt',
  },
  'data-flow': {
    label: 'Data Engineering',
    description: 'ETL pipelines and data processing systems',
  },
  'circuit': {
    label: 'Systems Architecture',
    description: 'Scalable, robust system design',
  },
  'cube-3d': {
    label: '3D & Spatial',
    description: 'Interactive 3D experiences and visualizations',
  },
};

/**
 * Maps cube face positions to icons
 *
 * Face positions (when cube is at default rotation):
 * - front: facing viewer (z = 1)
 * - back: away from viewer (z = -1)
 * - top: facing up (y = 1)
 * - bottom: facing down (y = -1)
 * - right: facing right (x = 1)
 * - left: facing left (x = -1)
 *
 * Only center cubes (x=0 or y=0 or z=0 for that axis) have icons.
 */
export const CENTER_FACE_ICONS = {
  front: 'neural-network',   // z=1, x=0, y=0 - Most visible, show AI capability
  back: 'code-brackets',     // z=-1, x=0, y=0 - Programming/development
  top: 'brain',              // y=1, x=0, z=0 - Intelligence
  right: 'data-flow',        // x=1, y=0, z=0 - Data engineering
  left: 'circuit',           // x=-1, y=0, z=0 - Systems
  // bottom is typically not visible, but can be set if desired
} as const;

// Type for the center face keys
export type CubeFace = keyof typeof CENTER_FACE_ICONS;
