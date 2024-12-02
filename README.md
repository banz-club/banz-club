# Hypixel Ban Statistics Tracker

[![Release](https://github.com/kWAYTV/banz-club/actions/workflows/release.yml/badge.svg)](https://github.com/kWAYTV/banz-club/actions/workflows/release.yml)

A real-time dashboard for monitoring Hypixel's ban activity, built with Next.js
15 and Tailwind CSS. Features live updates, interactive visualizations, and
detailed metrics tracking.

## 🌟 Features

- **Live Updates**: Automatically fetches new ban data every minute
- **Interactive Dashboard**: Clean and modern UI with real-time visualizations
- **Detailed Statistics**: Track Watchdog and Staff ban metrics
- **Activity Log**: Chronological record of ban events
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Works decent on all devices
- **Advanced Routing**: Implements Next.js 15 parallel routing and route
  interception for smooth modal transitions

## 🚀 Getting Started

> **Note:** This project uses [Umami](https://umami.is/) for analytics. To
> enable analytics:
>
> 1. Set up your Umami instance
> 2. Set `NEXT_PUBLIC_ENABLE_UMAMI=true` in your `.env` file
> 3. Update in `src/app/layout.tsx`:
>    - `src` attribute with your Umami script URL
>    - `data-website-id` with your Umami website ID

First, clone the repository and install dependencies:

```bash
git clone https://github.com/kWAYTV/banz-club.git
cd banz-club
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## 🛠️ Built With

- [Next.js 15](https://nextjs.org/) - React framework
  - Parallel Routing
  - Route Interception
  - App Router
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Charts and visualizations
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Query](https://tanstack.com/query/latest) - Server state management
- [Zod](https://zod.dev/) - Data validation
- [Umami](https://umami.is/) - Metrics

## 📝 API Usage

This project uses the [Plancke API](https://plancke.io) for fetching Hypixel ban
statistics. The data is refreshed every minute to provide real-time updates.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🤖 Related Projects

If you find this useful, check out my
[Hypixel Ban Tracker Discord Bot](https://github.com/kWAYTV/hypixel-ban-tracker-bot) -
A Discord bot that provides real-time notifications for Hypixel bans directly in
your server.

## ⚠️ Disclaimer

This site is not affiliated with or endorsed by Hypixel Inc. All Hypixel related
content and assets are property of Hypixel Inc.
