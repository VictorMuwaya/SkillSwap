# SkillSwap: Hyperlocal Community Exchange

**SkillSwap** is a community-focused platform designed to facilitate the direct bartering of niche skills and time among neighbors. By removing financial barriers and corporate middlemen, SkillSwap empowers local communities to thrive through mutual aid and specialized expertise.

## 🌟 The Vision
In many neighborhoods, valuable skills—like plumbing, math tutoring, or artisan baking—often go underutilized because there is no easy way to find or trade them without high platform fees. SkillSwap provides a "time-bank" or direct barter system where the currency is community trust and human connection.

## ✨ Key Features

- **📍 Hyperlocal Discovery:** Find skilled neighbors within a 5-mile radius using geolocation-aware search.
- **🤝 AI-Powered Matching:** Leverages the **Google Gemini API** to analyze skill sets and suggest the most beneficial swap matches between users.
- **🛡️ Trust-Based Profiles:** Verification badges and community ratings ensure a safe and reliable exchange environment.
- **🔄 Seamless Swap Requests:** A streamlined interface for proposing trades, including custom messaging and skill selection.
- **📊 Community Time Bank:** Track your contributions and "swaps completed" to build your local reputation.

## 🛠️ Tech Stack

- **Frontend:** React (ES Modules), TypeScript
- **Styling:** Tailwind CSS (Modern, utility-first design)
- **Icons:** Font Awesome 6
- **AI Integration:** `@google/genai` (Gemini 3 Pro for matching advice)
- **Deployment Ready:** Clean, single-root architecture optimized for modern browsers.

## 📁 Project Structure

- `index.html`: Main entry point with import maps and global styles.
- `App.tsx`: Central application logic and view management.
- `services/geminiService.ts`: AI logic for generating match advice and skill categorization.
- `components/`: Modular UI components (Layout, SkillCards, etc.).
- `constants.ts`: Mock data and configuration for the prototype.
- `types.ts`: TypeScript definitions for core data models.

## 🚀 Getting Started

Since this project utilizes ES Modules directly in the browser:

1. Ensure you have an environment variable `API_KEY` configured for the Gemini API.
2. Open `index.html` through a local development server (like VS Code Live Server or `npx serve`).
3. Allow location permissions when prompted to enable hyperlocal features.

## 🛣️ Future Roadmap

- [ ] **Availability Calendar:** Full synchronization with personal calendars to schedule help sessions.
- [ ] **Real-time Chat:** Integrated messaging using WebSockets for instant communication.
- [ ] **Verification System:** Integration with local ID verification or community vouching.
- [ ] **Map View:** An interactive Leaflet/Google Maps view to visualize local skill density.

---

*Built with ❤️ for resilient communities.*
