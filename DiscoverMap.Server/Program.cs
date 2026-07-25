using DiscoverMap.Server.Common.Helpers;
using DiscoverMap.Server.Extensions;
using DiscoverMap.Server.Routes;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

await app.SeedDatabaseAsync();

// Security / transport
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
app.UseHttpsRedirection();

// Middleware
app.UseCors("AllowFrontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// Routes
app.MapControllers();
app.MapPinRoutes();
app.MapAuthRoutes();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapFallbackToFile("/index.html");

app.Run();