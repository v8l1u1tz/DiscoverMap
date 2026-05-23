using System.Text;
using DiscoverMap.Server.Configurations;
using DiscoverMap.Server.Data;
using DiscoverMap.Server.Features.Auth.Repositories;
using DiscoverMap.Server.Features.Auth.Repositories.Interfaces;
using DiscoverMap.Server.Features.Auth.Services;
using DiscoverMap.Server.Features.Pins.Repositories;
using DiscoverMap.Server.Features.Pins.Repositories.Interfaces;
using DiscoverMap.Server.Features.Pins.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DiscoverMap.Server.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            // Repositories & Services
            services.AddScoped<IPinRepository, PinRepository>();
            services.AddScoped<PinService>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<AuthService>();

            // JWT Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
                    };
                });

            services.AddAuthorization();

            // Controllers, OpenAPI, CORS
            services.AddControllers();
            services.AddOpenApi();
            services.AddCorsPolicy();
        }
    }
}