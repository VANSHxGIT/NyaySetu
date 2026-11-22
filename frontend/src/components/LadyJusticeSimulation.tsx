import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  phase: number;
  isTriangle: boolean;
  group: 'head' | 'blindfold' | 'scales' | 'sword' | 'robes' | 'pedestal' | 'ambient';
}

export const LadyJusticeSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFocus, setActiveFocus] = useState<'all' | 'scales' | 'sword'>('all');
  const [isInteractive, setIsInteractive] = useState(true);

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const animFrameRef = useRef<number | null>(null);

  // Build the Lady Justice 3D point cloud
  const generateLadyJusticeParticles = useCallback((): Particle[] => {
    const particles: Particle[] = [];

    const COLOR_IRIS = '#8052ff';     // Electric Iris
    const COLOR_SAFFRON = '#ffb829';  // Saffron Spark
    const COLOR_VERDANT = '#15846e';  // Deep Verdant
    const COLOR_WHITE = '#ffffff';    // Bone White
    const COLOR_SILVER = '#bdbdbd';   // Silver Mist

    // 1. Head & Blindfold (Cranial contour and blindfold wrapping)
    const headCount = 220;
    for (let i = 0; i < headCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 26 + (Math.random() - 0.5) * 4;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = 290 + r * Math.cos(phi) * 1.15;
      const z = r * Math.sin(phi) * Math.sin(theta);

      const isBlindfold = Math.abs(y - 290) < 9 && z > -5;
      const color = isBlindfold ? COLOR_SAFFRON : (Math.random() > 0.4 ? COLOR_WHITE : COLOR_IRIS);

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color,
        size: isBlindfold ? 2.2 : (Math.random() > 0.6 ? 2.0 : 1.4),
        phase: Math.random() * Math.PI * 2,
        isTriangle: Math.random() > 0.4,
        group: isBlindfold ? 'blindfold' : 'head'
      });
    }

    // 2. Classical Flowing Robes & Torso (Chiton folds down to plinth)
    const robeCount = 1400;
    for (let i = 0; i < robeCount; i++) {
      const t = Math.random(); // 0 (waist) to 1 (hem)
      const y = 250 - t * 370; // 250 down to -120
      
      // Robes flare out gracefully at the bottom
      const widthFactor = 22 + t * 56 + Math.sin(t * 12) * 6;
      const angle = Math.random() * Math.PI * 2;
      const depthFactor = 0.55 + Math.cos(angle * 3) * 0.15; // fluted drapery folds

      const x = Math.cos(angle) * widthFactor;
      const z = Math.sin(angle) * widthFactor * depthFactor;

      const randColor = Math.random();
      let color = COLOR_WHITE;
      if (randColor < 0.28) color = COLOR_IRIS;
      else if (randColor < 0.38) color = COLOR_VERDANT;
      else if (randColor < 0.46) color = COLOR_SILVER;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color,
        size: Math.random() > 0.5 ? 1.8 : 1.2,
        phase: Math.random() * Math.PI * 2,
        isTriangle: Math.random() > 0.35,
        group: 'robes'
      });
    }

    // 3. Left Arm & The Scales of Justice (Extended arm, balance beam, cords, weighing pans)
    // Left arm reaching outward and up: (0, 240, 0) to (-150, 260, 20)
    for (let i = 0; i <= 60; i++) {
      const frac = i / 60;
      const x = -frac * 150 + (Math.random() - 0.5) * 8;
      const y = 240 + Math.sin(frac * Math.PI * 0.8) * 35 + (Math.random() - 0.5) * 8;
      const z = frac * 25 + (Math.random() - 0.5) * 8;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_WHITE,
        size: 1.8,
        phase: Math.random() * Math.PI * 2,
        isTriangle: false,
        group: 'scales'
      });
    }

    // Hand & Central Fulcrum ring at (-150, 265, 25)
    const fulcrumX = -150;
    const fulcrumY = 265;
    const fulcrumZ = 25;

    // Horizontal balance beam from (-240, 260) to (-60, 270)
    const beamLength = 180;
    for (let i = 0; i < 90; i++) {
      const frac = (i / 90) - 0.5; // -0.5 to +0.5
      const x = fulcrumX + frac * beamLength;
      // Slight default tilt of justice beam
      const y = fulcrumY - frac * 14 + (Math.random() - 0.5) * 3;
      const z = fulcrumZ + (Math.random() - 0.5) * 4;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_SAFFRON,
        size: 2.2,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'scales'
      });
    }

    // Left Pan at x: -240, suspended by 3 strings
    const leftPanX = fulcrumX - 0.5 * beamLength;
    const leftPanY = fulcrumY + 7 - 85; // ~187
    const leftPanZ = fulcrumZ;

    // Suspension cords left
    for (let s = 0; s < 3; s++) {
      const cordAngle = (s / 3) * Math.PI * 2;
      const panEdgeX = leftPanX + Math.cos(cordAngle) * 24;
      const panEdgeZ = leftPanZ + Math.sin(cordAngle) * 24;
      for (let step = 0; step < 24; step++) {
        const f = step / 24;
        const x = leftPanX * (1 - f) + panEdgeX * f;
        const y = (fulcrumY + 7) * (1 - f) + leftPanY * f;
        const z = leftPanZ * (1 - f) + panEdgeZ * f;

        particles.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          color: COLOR_SILVER,
          size: 1.2,
          phase: Math.random() * Math.PI * 2,
          isTriangle: false,
          group: 'scales'
        });
      }
    }

    // Left Pan dish ring
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const x = leftPanX + Math.cos(a) * 26;
      const y = leftPanY - Math.sin(a * 2) * 2;
      const z = leftPanZ + Math.sin(a) * 26;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_SAFFRON,
        size: 2.0,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'scales'
      });
    }

    // Right Pan at x: -60, suspended by 3 strings
    const rightPanX = fulcrumX + 0.5 * beamLength;
    const rightPanY = fulcrumY - 7 - 85; // ~173
    const rightPanZ = fulcrumZ;

    for (let s = 0; s < 3; s++) {
      const cordAngle = (s / 3) * Math.PI * 2;
      const panEdgeX = rightPanX + Math.cos(cordAngle) * 24;
      const panEdgeZ = rightPanZ + Math.sin(cordAngle) * 24;
      for (let step = 0; step < 24; step++) {
        const f = step / 24;
        const x = rightPanX * (1 - f) + panEdgeX * f;
        const y = (fulcrumY - 7) * (1 - f) + rightPanY * f;
        const z = rightPanZ * (1 - f) + panEdgeZ * f;

        particles.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          color: COLOR_SILVER,
          size: 1.2,
          phase: Math.random() * Math.PI * 2,
          isTriangle: false,
          group: 'scales'
        });
      }
    }

    // Right Pan dish ring
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const x = rightPanX + Math.cos(a) * 26;
      const y = rightPanY - Math.sin(a * 2) * 2;
      const z = rightPanZ + Math.sin(a) * 26;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_IRIS,
        size: 2.0,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'scales'
      });
    }

    // 4. Right Arm & The Upright Sword of Justice
    // Right arm holding sword hilt: (0, 230, 0) to (105, 170, 20)
    for (let i = 0; i <= 40; i++) {
      const frac = i / 40;
      const x = frac * 105 + (Math.random() - 0.5) * 6;
      const y = 230 - frac * 60 + (Math.random() - 0.5) * 6;
      const z = frac * 20 + (Math.random() - 0.5) * 6;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_WHITE,
        size: 1.8,
        phase: Math.random() * Math.PI * 2,
        isTriangle: false,
        group: 'sword'
      });
    }

    // Sword: Crossguard at (115, 170, 25), Blade vertical down to (115, -110, 25)
    const swordX = 115;
    const swordZ = 25;

    // Crossguard horizontal bar
    for (let i = 0; i < 35; i++) {
      const frac = (i / 35) - 0.5;
      const x = swordX + frac * 42;
      const y = 175;
      const z = swordZ + (Math.random() - 0.5) * 3;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_SAFFRON,
        size: 2.2,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'sword'
      });
    }

    // Pommel at top
    for (let i = 0; i < 15; i++) {
      const a = (i / 15) * Math.PI * 2;
      const x = swordX + Math.cos(a) * 6;
      const y = 195 + Math.sin(a) * 6;
      const z = swordZ;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color: COLOR_SAFFRON,
        size: 1.8,
        phase: Math.random() * Math.PI * 2,
        isTriangle: false,
        group: 'sword'
      });
    }

    // Sword Blade (double-edged, luminous center fuller)
    const bladeSteps = 120;
    for (let i = 0; i < bladeSteps; i++) {
      const frac = i / bladeSteps;
      const y = 170 - frac * 270; // 170 down to -100

      // Blade edges
      const bladeHalfWidth = 5.5 * (1 - frac * 0.4);
      particles.push({
        x: swordX - bladeHalfWidth,
        y,
        z: swordZ,
        baseX: swordX - bladeHalfWidth,
        baseY: y,
        baseZ: swordZ,
        color: COLOR_WHITE,
        size: 1.8,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'sword'
      });
      particles.push({
        x: swordX + bladeHalfWidth,
        y,
        z: swordZ,
        baseX: swordX + bladeHalfWidth,
        baseY: y,
        baseZ: swordZ,
        color: COLOR_WHITE,
        size: 1.8,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'sword'
      });
      // Center fuller spine
      if (i % 2 === 0) {
        particles.push({
          x: swordX,
          y,
          z: swordZ,
          baseX: swordX,
          baseY: y,
          baseZ: swordZ,
          color: COLOR_IRIS,
          size: 2.0,
          phase: Math.random() * Math.PI * 2,
          isTriangle: false,
          group: 'sword'
        });
      }
    }

    // 5. Plinth / Stepped Pedestal Base (Rule of Law Foundation)
    for (let layer = 0; layer < 3; layer++) {
      const y = -125 - layer * 18;
      const radius = 80 + layer * 28;
      const count = 90 + layer * 25;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const x = Math.cos(a) * radius + (Math.random() - 0.5) * 6;
        const z = Math.sin(a) * radius * 0.7 + (Math.random() - 0.5) * 6;

        particles.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          color: Math.random() > 0.4 ? COLOR_SILVER : COLOR_VERDANT,
          size: 1.5,
          phase: Math.random() * Math.PI * 2,
          isTriangle: Math.random() > 0.5,
          group: 'pedestal'
        });
      }
    }

    // 6. Ambient Constellation Particles (Drifting subtly across the black void)
    const ambientCount = 350;
    for (let i = 0; i < ambientCount; i++) {
      const x = (Math.random() - 0.5) * 900;
      const y = (Math.random() - 0.5) * 750;
      const z = (Math.random() - 0.5) * 400;

      const pick = Math.random();
      let color = COLOR_IRIS;
      if (pick < 0.25) color = COLOR_SAFFRON;
      else if (pick < 0.5) color = COLOR_VERDANT;
      else if (pick < 0.75) color = COLOR_SILVER;

      particles.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        color,
        size: Math.random() > 0.6 ? 1.6 : 1.0,
        phase: Math.random() * Math.PI * 2,
        isTriangle: true,
        group: 'ambient'
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = generateLadyJusticeParticles();

    // Resize handling with devicePixelRatio
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Continuous rotation parameters
    let rotationAngleY = 0.15;
    let rotationAngleX = 0.05;
    let targetAngleY = 0.15;
    let targetAngleX = 0.05;
    let lastTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 0.45;
      mouseRef.current.targetY = -ny * 0.35;
      mouseRef.current.isHovering = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Render loop
    const render = (currentTime: number) => {
      const dt = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Pure black clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Smooth camera interpolation
      if (mouseRef.current.isHovering) {
        targetAngleY += 0.0015; // Slow ambient yaw
        rotationAngleY += (mouseRef.current.targetX + targetAngleY - rotationAngleY) * 0.05;
        rotationAngleX += (mouseRef.current.targetY - rotationAngleX) * 0.05;
      } else {
        targetAngleY += 0.0025;
        rotationAngleY += (targetAngleY - rotationAngleY) * 0.05;
        rotationAngleX += (0.04 - rotationAngleX) * 0.05;
      }

      const cosY = Math.cos(rotationAngleY);
      const sinY = Math.sin(rotationAngleY);
      const cosX = Math.cos(rotationAngleX);
      const sinX = Math.sin(rotationAngleX);

      const fov = 460;
      const cameraDistance = 640;
      const centerX = width * 0.5;
      const centerY = height * 0.52;

      // Draw particles sorted by Z for depth
      const projected = [];
      const timeSec = currentTime * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic organic breathing
        let breath = Math.sin(timeSec * 1.4 + p.phase) * 2.5;
        if (p.group === 'scales') {
          // Subtle gentle sway of the scales
          breath += Math.sin(timeSec * 0.9 + p.baseX * 0.01) * 3.2;
        }

        const px = p.baseX + (p.group === 'ambient' ? Math.cos(timeSec * 0.3 + p.phase) * 12 : 0);
        const py = p.baseY + breath;
        const pz = p.baseZ + (p.group === 'ambient' ? Math.sin(timeSec * 0.3 + p.phase) * 12 : 0);

        // 3D Yaw Rotation (around Y axis)
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        // 3D Pitch Rotation (around X axis)
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const depth = z2 + cameraDistance;
        if (depth <= 10) continue;

        const scale = fov / depth;
        const screenX = centerX + x1 * scale;
        const screenY = centerY - y2 * scale; // invert Y for screen coords

        // Focus mode opacity modulation
        let opacity = 0.85;
        if (p.group === 'ambient') opacity = 0.28;
        if (activeFocus === 'scales' && p.group !== 'scales') opacity = 0.22;
        if (activeFocus === 'sword' && p.group !== 'sword') opacity = 0.22;

        projected.push({
          x: screenX,
          y: screenY,
          size: p.size * scale * (p.group === 'ambient' ? 1.0 : 1.35),
          color: p.color,
          opacity,
          isTriangle: p.isTriangle,
          zOrder: z2
        });
      }

      // Sort back-to-front
      projected.sort((a, b) => a.zOrder - b.zOrder);

      // Render triangles and points
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        if (pt.x < -20 || pt.x > width + 20 || pt.y < -20 || pt.y > height + 20) continue;

        ctx.globalAlpha = Math.max(0.1, Math.min(1.0, pt.opacity));

        if (pt.isTriangle) {
          // Crisp outlined triangular particle (Dala signature)
          const s = Math.max(1.8, pt.size * 1.8);
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y - s);
          ctx.lineTo(pt.x + s * 0.866, pt.y + s * 0.5);
          ctx.lineTo(pt.x - s * 0.866, pt.y + s * 0.5);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Sharp luminous point-light
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1.0, pt.size * 0.8), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [generateLadyJusticeParticles, isInteractive, activeFocus]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', backgroundColor: '#000000', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
      />
      
      {/* Simulation Controls Overlay (Minimal Ghost Text, No Harsh Box) */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: 10
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#9a9a9a',
          fontWeight: 600
        }}>
          JUSTITIA CONSTELLATION:
        </span>
        <button
          onClick={() => setActiveFocus('all')}
          style={{
            background: 'none',
            border: 'none',
            color: activeFocus === 'all' ? '#ffffff' : '#9a9a9a',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            padding: '4px 0',
            fontWeight: activeFocus === 'all' ? 600 : 400
          }}
        >
          FULL STATUE
        </button>
        <button
          onClick={() => setActiveFocus('scales')}
          style={{
            background: 'none',
            border: 'none',
            color: activeFocus === 'scales' ? '#ffb829' : '#9a9a9a',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            padding: '4px 0',
            fontWeight: activeFocus === 'scales' ? 600 : 400
          }}
        >
          SCALES OF JUSTICE
        </button>
        <button
          onClick={() => setActiveFocus('sword')}
          style={{
            background: 'none',
            border: 'none',
            color: activeFocus === 'sword' ? '#8052ff' : '#9a9a9a',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            padding: '4px 0',
            fontWeight: activeFocus === 'sword' ? 600 : 400
          }}
        >
          SWORD OF LAW
        </button>
      </div>

      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        fontSize: '11px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: '#9a9a9a',
        zIndex: 10
      }}>
        3,280 PARTICLES · PROCEDURAL 3D
      </div>
    </div>
  );
};
