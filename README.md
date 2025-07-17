# Lambda - Decentralized GPU Renting Platform

![Lambda Logo](https://img.shields.io/badge/Lambda-BNB%20Chain-F0B90B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K)

> **Rent or Share GPUs on the Decentralized Cloud**

Lambda is a cutting-edge, fully decentralized GPU renting platform built on BNB Chain. Access powerful GPU computing or monetize your hardware on the world's first crypto-native GPU marketplace.

## ✨ Features

### 🚀 For GPU Renters
- **Instant Access** - Deploy workloads on high-performance GPUs worldwide
- **Docker Integration** - Run any containerized application
- **Flexible Pricing** - Pay only for what you use
- **Global Network** - Choose from providers across different regions
- **Real-time Monitoring** - Track job progress with live logs

### 💰 For GPU Providers
- **Monetize Hardware** - Earn passive income from your GPUs
- **Automated Management** - Set pricing and availability preferences
- **Secure Payments** - Smart contract-based payment system
- **Performance Analytics** - Track earnings and utilization
- **Reputation System** - Build trust through verified performance

### 🔗 Blockchain Features
- **BNB Chain Integration** - Fast, low-cost transactions
- **Smart Contracts** - Transparent and secure escrow system
- **Wallet Support** - MetaMask and WalletConnect integration
- **Decentralized** - No single point of failure

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom BNB Chain theme
- **Animations**: Framer Motion
- **Web3**: Wagmi, Viem, Web3Modal
- **State Management**: React Hooks, TanStack Query
- **Styling**: Custom CSS with BNB-inspired design
- **Icons**: Lucide React

## 🎨 Design System

### Color Palette
- **Primary**: `#F0B90B` (BNB Yellow)
- **Secondary**: `#FFD700` (Gold)
- **Background**: `#0B0B0B` (Deep Black)
- **Text**: `#FFFFFF` (White)

### Typography
- **Primary Font**: Inter (300-900)
- **Secondary Font**: Space Grotesk (300-700)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lambda-gpu-platform.git
   cd lambda-gpu-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_BNB_CHAIN_ID=56
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lambda-gpu-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── marketplace/        # GPU marketplace
│   │   ├── rent/              # Job submission
│   │   ├── provider/          # Provider portal
│   │   ├── dashboard/         # User dashboard
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── shared/            # Custom shared components
│   ├── lib/
│   │   ├── api/               # API client and endpoints
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── .github/                   # GitHub configuration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Adding New Components

1. **UI Components** (using shadcn/ui)
   ```bash
   npx shadcn@latest add component-name
   ```

2. **Custom Components**
   Create in `src/components/shared/` following the existing patterns

### API Integration

API utilities are located in `src/lib/api/`. Each service has its own file:
- `gpu.ts` - GPU node operations
- `jobs.ts` - Job management
- `provider.ts` - Provider operations
- `client.ts` - Base API client

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with animated GPU
- Platform statistics
- Feature highlights
- Call-to-action sections

### Marketplace (`/marketplace`)
- Browse available GPU nodes
- Advanced filtering and search
- Real-time availability
- Instant rental options

### Rent GPU (`/rent`)
- Job submission form
- Docker image specification
- Resource requirements
- Budget and duration settings

### Provider Portal (`/provider`)
- Node registration wizard
- Earnings dashboard
- Performance analytics
- Withdrawal interface

### Dashboard (`/dashboard`)
- Unified view for renters and providers
- Job history and status
- Wallet integration
- Settings and preferences

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.lambda-gpu.com](https://docs.lambda-gpu.com)
- **Discord**: [Join our community](https://discord.gg/lambda-gpu)
- **Email**: support@lambda-gpu.com

## 🗺 Roadmap

- [ ] **Q1 2025**: MVP Launch on BNB Testnet
- [ ] **Q2 2025**: Mainnet deployment
- [ ] **Q3 2025**: Advanced job scheduling
- [ ] **Q4 2025**: Multi-chain support

---

**Built with ❤️ for the decentralized future**

*Powered by BNB Chain • Made by developers, for developers*
