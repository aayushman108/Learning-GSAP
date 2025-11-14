# ScrollTrigger Animation Component

A reusable React component for creating beautiful scroll-triggered animations using GSAP ScrollTrigger. Perfect for portfolio websites!

## Features

- 🎨 **8 Animation Types**: fade, slideLeft, slideRight, slideUp, slideDown, scale, rotate, blur
- ⚙️ **Highly Customizable**: Control delay, duration, start/end points, and more
- 🔄 **Reversible Animations**: Optional reverse on scroll up
- 🎯 **Scrub Support**: Smooth parallax effects with scrub animations
- 📱 **Responsive**: Works great on all screen sizes
- 🎭 **TypeScript**: Fully typed for better developer experience

## Usage

### Basic Example

```tsx
import { ScrollTriggerAnimation } from "./components/scrollTriggerAnimation";

function MyComponent() {
  return (
    <ScrollTriggerAnimation animationType="fade">
      <h1>This will fade in on scroll</h1>
    </ScrollTriggerAnimation>
  );
}
```

### With Custom Options

```tsx
<ScrollTriggerAnimation
  animationType="slideLeft"
  delay={0.2}
  duration={1.5}
  start="top 90%"
  end="top 50%"
  once={false}
>
  <div>Custom animated content</div>
</ScrollTriggerAnimation>
```

### Scrub Animation (Parallax Effect)

```tsx
<ScrollTriggerAnimation
  animationType="blur"
  scrub={1}
  start="top bottom"
  end="bottom top"
>
  <div>This will blur/unblur as you scroll</div>
</ScrollTriggerAnimation>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `animationType` | `"fade" \| "slideLeft" \| "slideRight" \| "slideUp" \| "slideDown" \| "scale" \| "rotate" \| "blur"` | `"fade"` | Type of animation |
| `delay` | `number` | `0` | Animation delay in seconds |
| `duration` | `number` | `1` | Animation duration in seconds |
| `start` | `string` | `"top 80%"` | ScrollTrigger start position |
| `end` | `string` | `"top 20%"` | ScrollTrigger end position |
| `scrub` | `boolean \| number` | `false` | Enable scrub animation (number = smoothness) |
| `className` | `string` | `""` | Additional CSS classes |
| `once` | `boolean` | `true` | Animate only once (false = reverse on scroll up) |

## Animation Types

- **fade**: Fades in from transparent
- **slideLeft**: Slides in from the left
- **slideRight**: Slides in from the right
- **slideUp**: Slides in from the bottom
- **slideDown**: Slides in from the top
- **scale**: Scales up from 0.5x to 1x
- **rotate**: Rotates from -45° to 0°
- **blur**: Blurs in from 10px blur to sharp

## Demo Component

The `ScrollTriggerDemo` component showcases all animation types in a portfolio-style layout. Use it as inspiration or directly in your project!

```tsx
import { ScrollTriggerDemo } from "./components/scrollTriggerAnimation";

function App() {
  return <ScrollTriggerDemo />;
}
```

## Notes

- ScrollTrigger is a GSAP plugin. Make sure GSAP is installed: `npm install gsap`
- For production use, you may need a GSAP Club membership for ScrollTrigger (check GSAP licensing)
- The component automatically cleans up ScrollTrigger instances on unmount

## Portfolio Integration

This component is perfect for:
- Hero sections
- About sections
- Skills/technologies showcase
- Project galleries
- Testimonials
- Contact forms
- Any section that needs scroll-based animations

Enjoy creating beautiful scroll animations! 🚀

