# DiscoverMap.Server 🖥️

The backend. The one doing all the actual work while the frontend takes all the credit.

Built with C# / ASP.NET Core 10 because someone looked at Node.js and said "no thank you, I prefer my types at compile time and my errors before production."

> *"It's not legacy code if you wrote it last week."*
> — the developer, probably

## What this does

Serves pins. Authenticates users. Judges no one (except unauthenticated requests, which get a 401).

- **REST API** - because GraphQL was too much commitment
- **JWT Auth** - your token expires in 60 minutes, just like your motivation after lunch
- **BCrypt** - passwords are hashed, salted, and completely unrecoverable if you forget them. Good luck.
- **Entity Framework Core** - writing raw SQL is a skill. Not using it is a choice.
- **PostgreSQL** - via Docker, because installing databases locally is a form of self-harm

## Folder Structure

```
DiscoverMap.Server/
├── Common/          <- helpers and things that didn't fit anywhere else
├── Configurations/  <- CORS, because the browser is suspicious of everything
├── Data/            <- database context and seeders (dummy data lives here, judging you)
├── Extensions/      <- service registrations, organized so you don't have to scroll through Program.cs crying
├── Features/        <- where the actual features live, separated by domain like an adult
│   ├── Auth/        <- login, register, JWT - the bouncer of this app
│   └── Pins/        <- the whole reason this app exists
├── Migrations/      <- EF migration history, a graveyard of past mistakes and column renames
├── Routes/          <- because MapControllers() was too mainstream
└── Program.cs       <- the entry point, surprisingly short for something so important
```

## How to run

Make sure Docker is running. If it's not, that's on you.

```bash
docker compose up --build
```

If something breaks, check the logs:
```bash
docker compose logs server
```

If the logs don't help, take a walk. Come back. Try again.

## Environment

Secrets live in `appsettings.json` which is gitignored because I learned my lesson. Copy from `appsettings.example.json` and fill in the blanks. Yes, you need a JWT key. No, "password123" is not a JWT key.

To generate a JWT key that won't make security engineers cry, run this in PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Copy the output. Paste it as your `Jwt:Key`. Do not share it. Do not commit it. Do not use it as your WiFi password. Treat it like your deepest secret - which, ironically, it kind of is.

## Migrations

```bash
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

If EF complains about pending model changes, it's right and you're wrong. Add a migration.
