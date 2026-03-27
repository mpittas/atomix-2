# Glass/Shine Hover Effect Animation

## Overview

This effect creates a glass-like shine animation that sweeps across a card on hover. Two semi-transparent white rectangles with blur effects move from right to left across the card, creating a polished, modern shine effect.

## Visual Description

- **Two white blurred rectangles** positioned off-screen to the right
- On hover, they **sweep across the card from right to left** at slightly different speeds
- The rectangles are **rotated 15 degrees** to create a diagonal shine effect
- Creates a **glass reflection/shine** appearance similar to premium UI designs

## Dependencies

- **GSAP** (GreenSock Animation Platform) - for smooth animations
- **React** - for refs and component structure
- **Tailwind CSS** - for styling (optional, can use regular CSS)

## Code Implementation

### 1. React Component Setup

```tsx
import { useRef } from "react";
import gsap from "gsap";

function CardWithShineEffect() {
  // Refs for the two shine elements
  const shineRef1 = useRef<HTMLDivElement>(null);
  const shineRef2 = useRef<HTMLDivElement>(null);

  // Prevent animation from running multiple times simultaneously
  const isAnimatingRef = useRef(false);

  const handleMouseEnter = () => {
    // Guard: Don't start new animation if one is already running
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Animate first shine element (narrower, faster)
    tl.fromTo(
      shineRef1.current,
      {
        x: "140", // Start position (off-screen right)
        opacity: 1,
      },
      {
        x: "-400", // End position (off-screen left)
        duration: 0.5, // Animation duration
        ease: "power2.inOut",
      },
      0, // Start at timeline position 0
    )
      // Animate second shine element (wider, slower, delayed)
      .fromTo(
        shineRef2.current,
        {
          x: "180", // Start position (further right)
          opacity: 1,
        },
        {
          x: "-600", // End position (further left)
          duration: 0.7, // Slightly longer duration
          ease: "power2.inOut",
        },
        0.15, // Start 0.15s after first animation (creates staggered effect)
      );
  };

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[20px] px-6 py-7"
      onMouseEnter={handleMouseEnter}
    >
      {/* Shine effect container - positioned absolutely, covers entire card */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] overflow-hidden">
        {/* First shine element - narrow, more opaque */}
        <div
          ref={shineRef1}
          className="absolute -top-10 -bottom-10 w-8 bg-white/40 blur-xl"
          style={{
            transform: "translateX(150%) rotate(15deg)",
            right: "0",
          }}
        />

        {/* Second shine element - wider, less opaque */}
        <div
          ref={shineRef2}
          className="absolute -top-10 -bottom-10 w-24 bg-white/30 blur-2xl"
          style={{
            transform: "translateX(150%) rotate(15deg)",
            right: "0",
          }}
        />
      </div>

      {/* Card content goes here - must have relative z-10 to appear above shine */}
      <div className="relative z-10">{/* Your card content */}</div>
    </div>
  );
}
```

### 2. Plain CSS Version (without Tailwind)

```css
.card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
}

.shine-container {
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
}

.shine-element-1 {
  position: absolute;
  top: -2.5rem;
  bottom: -2.5rem;
  width: 2rem;
  background-color: rgba(255, 255, 255, 0.4);
  filter: blur(24px);
  transform: translateX(150%) rotate(15deg);
  right: 0;
}

.shine-element-2 {
  position: absolute;
  top: -2.5rem;
  bottom: -2.5rem;
  width: 6rem;
  background-color: rgba(255, 255, 255, 0.3);
  filter: blur(40px);
  transform: translateX(150%) rotate(15deg);
  right: 0;
}

.card-content {
  position: relative;
  z-index: 10;
}
```

## How It Works

### Structure

1. **Container** (`relative`, `overflow-hidden`) - The card wrapper
2. **Shine Container** (`absolute`, `inset-0`, `pointer-events-none`) - Overlay layer for shine elements
3. **Shine Elements** - Two white rectangles with blur, positioned off-screen
4. **Content** (`relative`, `z-10`) - Card content appears above shine effect

### Animation Breakdown

**Initial State:**

- Both shine elements are positioned off-screen to the right (`translateX(150%)`)
- Rotated 15 degrees for diagonal effect
- Opacity set to 1

**On Hover:**

- **Shine 1** (narrow): Moves from `x: 140` to `x: -400` in 0.5s
- **Shine 2** (wide): Moves from `x: 180` to `x: -600` in 0.7s, starts 0.15s later
- Creates a **staggered sweep** effect across the card

**Key Details:**

- `pointer-events-none` prevents shine from blocking interactions
- `overflow-hidden` on containers clips the shine elements
- `-top-10` and `-bottom-10` extend shine beyond card height
- `isAnimatingRef` prevents animation spam on rapid hovers

### Customization Options

**Speed:**

```tsx
duration: 0.5,  // Faster: 0.3, Slower: 0.8
```

**Blur Amount:**

```tsx
blur - xl; // More blur: blur-2xl, Less blur: blur-lg
```

**Opacity:**

```tsx
bg - white / 40; // More opaque: /60, More transparent: /20
```

**Width:**

```tsx
w - 8; // Narrower: w-4, Wider: w-12
```

**Rotation:**

```tsx
rotate(15deg)  // Steeper: 25deg, Flatter: 10deg
```

**Stagger Delay:**

```tsx
0.15; // More stagger: 0.3, Less stagger: 0.05
```

## Installation

```bash
npm install gsap
```

## Usage Tips

1. **Performance**: The animation is GPU-accelerated via transforms
2. **Accessibility**: Shine is decorative, doesn't affect screen readers
3. **Dark Backgrounds**: Works best on colored/gradient backgrounds
4. **Multiple Cards**: Each card has independent animation state
5. **Mobile**: Consider disabling on touch devices if needed

## Common Issues

**Shine not visible:**

- Check `overflow-hidden` is set on containers
- Verify `z-index` on content is higher than shine
- Ensure background isn't white (shine is white)

**Animation stutters:**

- Check GSAP is properly imported
- Verify refs are attached to correct elements

**Animation runs multiple times:**

- Ensure `isAnimatingRef` guard is in place
