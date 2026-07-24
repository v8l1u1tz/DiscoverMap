# discovermap.client 🗺️

The frontend. Takes all the credit. Does very little math.

Built with React + TypeScript + Tailwind CSS + Leaflet, because someone decided a plain HTML file with a `<div id="map">` wasn't good enough. They were right, but also, look at what we've become.

> *"It's just a map with some pins."*
> — the developer at the start
> 
> *"Why do I have 14 components for a map page?"*
> — the developer now

## What this does

Shows a map. Shows pins on the map. Has a sidebar that slides. Has a search bar that doesn't search yet (it's decorative, like a throw pillow). Has category chips that look great and do nothing to the map (yet).

- **React 19** - because 18 was so last year
- **TypeScript** - so the compiler can tell you you're wrong before the user does
- **Tailwind CSS** - utility classes only, no custom CSS except where Leaflet refuses to cooperate (and it will refuse)
- **Leaflet** - the map library that works great until you try to style it, at which point it becomes a negotiation
- **Vite** - fast. very fast. suspiciously fast.

## Folder Structure

```
src/
├── components/
│   ├── layout/      <- PageLayout, PageBody, Navbar, Sidebar - the skeleton of the app
│   ├── map/         <- MapView, MapFrame, MapOverlay, PinMarker, PinList - map-specific stuff
│   └── ui/          <- Button, PinCard, SearchBar, CategoryChip, Dropdown - reusable, children-based, no backend knowledge
├── hooks/           <- usePins, useAuth (coming soon, I promise)
├── pages/           <- MapPage - surprisingly short now that I refactored
├── services/        <- pinService, authService - fetch calls live here, not in hooks, not in components
└── types/           <- Pin, User - TypeScript interfaces so I know what I am working with
```

## Rules of this codebase

1. Components are reusable. They take `children`. They do not fetch data. They do not know what a `Pin` is.
2. Fetching belongs in `services/`. State belongs in `hooks/`. Rendering belongs in components.
3. No spaghetti. I may work with complex legacy codebases professionally, but this project is my creative outlet for clean architecture. Please respect the folder structure - it took emotional effort.
4. If your component is longer than 50 lines, ask yourself why.
5. Everything is reusable. Everything has a place. This is intentional and I am very proud of it.

## How to run

```bash
docker compose up --build
```

Then open `http://localhost:5173` and pretend you're a cartographer.

## Known issues

- The search bar is beautiful and does nothing. This is intentional (for now).
- Category chips filter your enthusiasm but not the pins yet. Coming soon.
- Leaflet's `+/-` zoom buttons cannot be styled with Tailwind. This is Leaflet's fault. I've moved on.
