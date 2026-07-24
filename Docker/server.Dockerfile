# Stage 1: build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY DiscoverMap.Server/*.csproj ./DiscoverMap.Server/
WORKDIR /src/DiscoverMap.Server
RUN dotnet restore

# Copy all source and build
WORKDIR /src
COPY DiscoverMap.Server/. ./DiscoverMap.Server/
WORKDIR /src/DiscoverMap.Server
RUN dotnet publish -c Release -o /app/publish

# Stage 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Copy published app
COPY --from=build /app/publish .

# Copy configuration files
COPY --from=build /src/DiscoverMap.Server/appsettings.json ./appsettings.json
COPY --from=build /src/DiscoverMap.Server/appsettings.Development.json ./appsettings.Development.json

EXPOSE 8080
ENTRYPOINT ["dotnet", "DiscoverMap.Server.dll"]