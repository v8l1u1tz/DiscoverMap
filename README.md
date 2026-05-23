# DiscoverMap 🗺️

> *For people who want to explore the world - from their chair.*

A personal full-stack GIS app for discovering introvert-friendly spots: quiet cafes, hidden gyms, rooftop lounges, and places where the barista won't remember your name (a feature, not a bug). Built with C# + React + PostgreSQL because apparently making a list in Notes wasn't enough - we needed a full-stack application with JWT auth, Docker, and a database migration history longer than some people's therapy journals.

Originally started as "I just want to see pins on a map." It is no longer just pins on a map.

**Tech Stack**
- **Backend** - C# / ASP.NET Core 10 (.NET 10, because living on the edge)
- **Frontend** - React + TypeScript + Tailwind CSS (reusable components only, I don't do spaghetti here)
- **Database** - PostgreSQL (via Docker, because local installs are for people with more patience)
- **Auth** - JWT + BCrypt (your password is hashed, your secrets are safe, your social anxiety is valid)
- **Maps** - Leaflet + OpenStreetMap (free, open source, and doesn't judge your search history)

**Features**
- 🗺️ Interactive map with pin markers for introvert-approved spots
- 🔍 Search and filter by category (Cafe, Gym, Lounge, Hidden Gems, and more)
- 🔐 User authentication - register, login, get a token, feel secure
- 📌 Add your own secret spots (and keep them secret, or don't, we're not your mom)
- 🚪 Sidebar that slides in and out, just like your social energy

**⚠️ Disclaimer**

This app was built to avoid going outside. Ironically, you may need to go outside to verify the pins. We not responsible for any unexpected human interaction, unsolicited small talk, or accidental eye contact that may occur as a result of using this app. Touch grass at your own risk.

The developer (me) assumes no liability for: getting lost, finding a cafe that closed six months ago, or realizing the "hidden gem" is just a 7-Eleven.

**🐳 A note on `docker-compose.yml`**

Yes, it's committed. Yes, it has a hardcoded password. No, I am not embarrassed - this is a local development setup and `discovermap123` was never going to fool anyone anyway. When this hits production (if it hits production, I am still deciding if the outside world deserves this app), credentials will be moved to environment variables like responsible adults. For now, I live dangerously.
