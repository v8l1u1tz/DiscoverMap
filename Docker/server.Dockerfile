# Stage 1: build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY DiscoverMap.Server/*.csproj ./
RUN dotnet restore --no-cache

COPY DiscoverMap.Server/. .
RUN dotnet publish -c Release -o out

# Stage 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5227
ENTRYPOINT ["dotnet", "DiscoverMap.Server.dll"]