# Lambda - Decentralized GPU Renting Platform

This is a Next.js 14 project for a fully decentralized GPU renting platform called "Lambda" built with TypeScript, Tailwind CSS, shadcn/ui components, and Framer Motion animations.

## Project Structure

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom BNB Chain theme (black, yellow, gold)
- **Components**: shadcn/ui components with custom styling
- **Animations**: Framer Motion for smooth interactions
- **State Management**: React hooks and context
- **Web3**: Wagmi + Viem for blockchain interactions
- **API**: Axios with TypeScript for API calls

## Theme Guidelines

- **Primary Colors**: `#F0B90B` (BNB yellow), `#0B0B0B` (deep black), `#FFFFFF` (white), `#FFD700` (gold)
- **Design**: Ultra-modern, futuristic with dark mode first approach
- **Fonts**: Inter and Space Grotesk
- **Effects**: Subtle neumorphism, glowing hover states, neon borders

## Key Features

1. **Homepage** - Hero section with animated GPU, stats, and features
2. **Marketplace** - Browse and filter available GPU nodes
3. **Rent GPU** - Submit compute jobs with Docker containers
4. **Provider Portal** - Register and manage GPU nodes
5. **Dashboard** - Unified view for renters and providers
6. **Wallet Integration** - BNB Chain wallet connection

## Custom CSS Classes

- `.text-gradient` - BNB yellow to gold gradient text
- `.bnb-gradient` - BNB yellow to gold background gradient
- `.card-dark` - Dark glass morphism card
- `.gpu-glow` - Glowing effect for GPU-related elements
- `.neon-border` - Neon yellow border effect

## Component Architecture

- Shared components in `/components/shared/`
- UI components in `/components/ui/` (shadcn/ui)
- Type definitions in `/types/`
- API utilities in `/lib/api/`
- Utils and helpers in `/lib/utils.ts`

## Development Notes

- Use TypeScript for all components and utilities
- Follow React best practices with functional components and hooks
- Implement responsive design with mobile-first approach
- Use Framer Motion for page transitions and micro-interactions
- Maintain consistent BNB Chain branding throughout

When working on this project, focus on creating a premium, professional feel that resembles crypto-native applications with modern UX patterns.
