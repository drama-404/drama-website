/**
 * Canvas-based Icon Texture Generator
 *
 * Creates icon textures at runtime using HTML Canvas.
 * No external image assets needed - icons are vector-drawn.
 *
 * Based on DataKeeper's approach but with AI-themed icons.
 */

import type { IconType } from '@/config/cubeIcons';

/**
 * Creates a base64-encoded PNG texture of an icon
 *
 * @param type - The icon type to draw
 * @param color - The stroke/fill color (hex string)
 * @returns Base64 data URL of the texture
 */
export function createIconTexture(type: IconType, color: string = '#ffffff'): string {
  const canvas = document.createElement('canvas');
  const size = 512; // High resolution for crisp rendering
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Canvas 2D context unavailable');
    return '';
  }

  // Clear with transparent background
  ctx.clearRect(0, 0, size, size);

  // Common drawing settings
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 15;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const cx = size / 2; // Center X
  const cy = size / 2; // Center Y

  // Draw based on icon type
  switch (type) {
    case 'neural-network':
      drawNeuralNetwork(ctx, cx, cy, color);
      break;

    case 'code-brackets':
      drawCodeBrackets(ctx, cx, cy);
      break;

    case 'brain':
      drawBrain(ctx, cx, cy);
      break;

    case 'data-flow':
      drawDataFlow(ctx, cx, cy);
      break;

    case 'circuit':
      drawCircuit(ctx, cx, cy);
      break;

    case 'cube-3d':
      drawCube3D(ctx, cx, cy);
      break;

    default:
      // Fallback: draw a simple dot
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fill();
  }

  return canvas.toDataURL('image/png');
}

/**
 * Neural Network: 3 layers of nodes with connections
 */
function drawNeuralNetwork(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  color: string
) {
  // Define layer positions and node counts
  const layers = [
    { x: cx - 120, nodes: 3 },
    { x: cx, nodes: 4 },
    { x: cx + 120, nodes: 3 },
  ];

  const nodeRadius = 20;
  const verticalSpacing = 70;

  // Calculate node positions
  const nodePositions: { x: number; y: number }[][] = layers.map((layer) => {
    const positions: { x: number; y: number }[] = [];
    const startY = cy - ((layer.nodes - 1) * verticalSpacing) / 2;
    for (let i = 0; i < layer.nodes; i++) {
      positions.push({
        x: layer.x,
        y: startY + i * verticalSpacing,
      });
    }
    return positions;
  });

  // Draw connections (lighter)
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.4;
  for (let l = 0; l < nodePositions.length - 1; l++) {
    for (const startNode of nodePositions[l]) {
      for (const endNode of nodePositions[l + 1]) {
        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);
        ctx.lineTo(endNode.x, endNode.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;

  // Draw nodes (solid circles)
  ctx.lineWidth = 15;
  for (const layer of nodePositions) {
    for (const node of layer) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/**
 * Code Brackets: </> symbol
 */
function drawCodeBrackets(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.lineWidth = 20;

  // Left bracket <
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 100);
  ctx.lineTo(cx - 110, cy);
  ctx.lineTo(cx - 30, cy + 100);
  ctx.stroke();

  // Right bracket >
  ctx.beginPath();
  ctx.moveTo(cx + 30, cy - 100);
  ctx.lineTo(cx + 110, cy);
  ctx.lineTo(cx + 30, cy + 100);
  ctx.stroke();

  // Forward slash /
  ctx.beginPath();
  ctx.moveTo(cx - 25, cy + 70);
  ctx.lineTo(cx + 25, cy - 70);
  ctx.stroke();
}

/**
 * Brain: Simplified brain outline with curves
 */
function drawBrain(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.lineWidth = 12;

  // Left hemisphere
  ctx.beginPath();
  ctx.arc(cx - 50, cy - 20, 80, Math.PI * 0.4, Math.PI * 1.6);
  ctx.stroke();

  // Right hemisphere
  ctx.beginPath();
  ctx.arc(cx + 50, cy - 20, 80, Math.PI * 1.4, Math.PI * 0.6, true);
  ctx.stroke();

  // Inner folds - left
  ctx.beginPath();
  ctx.arc(cx - 40, cy + 10, 35, 0, Math.PI);
  ctx.stroke();

  // Inner folds - right
  ctx.beginPath();
  ctx.arc(cx + 40, cy + 10, 35, 0, Math.PI);
  ctx.stroke();

  // Center line
  ctx.beginPath();
  ctx.moveTo(cx, cy - 100);
  ctx.lineTo(cx, cy + 50);
  ctx.stroke();
}

/**
 * Data Flow: Boxes with arrows showing data transformation
 */
function drawDataFlow(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.lineWidth = 10;
  const boxWidth = 100;
  const boxHeight = 50;

  // Top box (input)
  ctx.strokeRect(cx - boxWidth / 2, cy - 120, boxWidth, boxHeight);

  // Arrow down
  ctx.beginPath();
  ctx.moveTo(cx, cy - 70);
  ctx.lineTo(cx, cy - 30);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy - 45);
  ctx.lineTo(cx, cy - 30);
  ctx.lineTo(cx + 15, cy - 45);
  ctx.stroke();

  // Middle box (process)
  ctx.strokeRect(cx - boxWidth / 2, cy - 25, boxWidth, boxHeight);

  // Arrow down
  ctx.beginPath();
  ctx.moveTo(cx, cy + 25);
  ctx.lineTo(cx, cy + 65);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy + 50);
  ctx.lineTo(cx, cy + 65);
  ctx.lineTo(cx + 15, cy + 50);
  ctx.stroke();

  // Bottom box (output)
  ctx.strokeRect(cx - boxWidth / 2, cy + 70, boxWidth, boxHeight);
}

/**
 * Circuit: Grid pattern with nodes (circuit board aesthetic)
 */
function drawCircuit(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.lineWidth = 8;
  const spacing = 70;
  const nodeRadius = 12;

  // Draw grid of nodes
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      const x = cx + i * spacing;
      const y = cy + j * spacing;

      // Node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal connection (not for rightmost)
      if (i < 2) {
        ctx.beginPath();
        ctx.moveTo(x + nodeRadius, y);
        ctx.lineTo(x + spacing - nodeRadius, y);
        ctx.stroke();
      }

      // Vertical connection (not for bottom)
      if (j < 2) {
        ctx.beginPath();
        ctx.moveTo(x, y + nodeRadius);
        ctx.lineTo(x, y + spacing - nodeRadius);
        ctx.stroke();
      }
    }
  }
}

/**
 * Cube 3D: Isometric cube outline
 */
function drawCube3D(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.lineWidth = 12;
  const size = 80;

  // Calculate isometric points
  const top = { x: cx, y: cy - size };
  const bottom = { x: cx, y: cy + size };
  const frontLeft = { x: cx - size * 0.866, y: cy + size * 0.5 };
  const frontRight = { x: cx + size * 0.866, y: cy + size * 0.5 };
  const backLeft = { x: cx - size * 0.866, y: cy - size * 0.5 };
  const backRight = { x: cx + size * 0.866, y: cy - size * 0.5 };

  // Front face
  ctx.beginPath();
  ctx.moveTo(top.x, top.y);
  ctx.lineTo(backRight.x, backRight.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.lineTo(bottom.x, bottom.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.lineTo(backLeft.x, backLeft.y);
  ctx.closePath();
  ctx.stroke();

  // Inner edges
  ctx.beginPath();
  ctx.moveTo(top.x, top.y);
  ctx.lineTo(bottom.x, bottom.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(backLeft.x, backLeft.y);
  ctx.lineTo(frontRight.x, frontRight.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(backRight.x, backRight.y);
  ctx.lineTo(frontLeft.x, frontLeft.y);
  ctx.stroke();
}
