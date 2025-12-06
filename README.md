# Sui Freelancer Web Platform

A decentralized freelancer marketplace built on Sui blockchain using Move language, featuring GitHub IPA-based freelancer tier system (Diamond, Gold, Silver, Bronze).

## Project Overview

This project implements a freelancer marketplace on the Sui blockchain where:
- Freelancers are categorized into four tiers: **Diamond**, **Gold**, **Silver**, and **Bronze**
- Tier classification is based on GitHub IPA (GitHub Integrated Performance Analytics)
- Smart contracts manage freelancer profiles, ratings, and transactions
- Web interface for browsing and hiring freelancers

## Tier System

### Diamond Tier
- Highest tier freelancers
- Verified on GitHub with exceptional contribution history
- Premium rates and priority visibility

### Gold Tier
- Mid-level freelancers
- Solid GitHub presence and track record
- Competitive rates

### Silver Tier
- Emerging freelancers
- GitHub profile verification required
- Accessible entry-level pricing

### Bronze Tier
- New or onboarding freelancers
- Basic GitHub verification and identity checks
- Introductory pricing with limited initial visibility

## Project Structure

```
sui-freelancer-web/
├── move/                  # Sui Move smart contracts
│   ├── sources/          # Contract source files
│   │   ├── freelancer.move
│   │   ├── marketplace.move
│   │   └── github_ipa.move
│   ├── tests/            # Contract tests
│   └── Move.toml         # Move config
├── web/                  # Web frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── .github/              # GitHub workflows
│   └── workflows/
├── docs/                 # Documentation
└── README.md
```

## Technology Stack

- **Blockchain**: Sui Network
- **Smart Contracts**: Move Language
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Integration**: GitHub IPA

## Quick Start

```bash
# Install web dependencies
cd web
npm install
npm run dev

# Build smart contracts (in another terminal)
cd move
sui move build
sui move test
```

## Documentation

See [docs/](./docs/) folder for complete documentation:
- [Getting Started](./docs/getting-started.md)
- [Architecture](./docs/architecture.md)
- [Smart Contracts](./docs/smart-contracts.md)
- [Frontend](./docs/frontend.md)
- [GitHub IPA Integration](./docs/github-ipa.md)
- [Deployment Guide](./docs/deployment.md)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./docs/contributing.md) for guidelines.

## License

MIT License
