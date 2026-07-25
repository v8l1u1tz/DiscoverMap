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
using Microsoft.AspNetCore.RateLimiting;
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

            // Get JWT configuration with fallback
            var jwtKey = configuration["Jwt:Key"] ??
                        Environment.GetEnvironmentVariable("Jwt__Key") ??
                        "DevelopmentKeyWith32Characters!!!";

            var jwtIssuer = configuration["Jwt:Issuer"] ??
                            Environment.GetEnvironmentVariable("Jwt__Issuer") ??
                            "DiscoverMap";

            var jwtAudience = configuration["Jwt:Audience"] ??
                            Environment.GetEnvironmentVariable("Jwt__Audience") ??
                            "DiscoverMapUsers";

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
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtKey))
                    };

                    /** read the JWT from the httpOnly cookie instead of the
                        authorization header... **/
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (context.Request.Cookies.ContainsKey("access_token"))
                            {
                                context.Token = context.Request.Cookies["access_token"];
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization();
            services.AddControllers();
            services.AddOpenApi();
            services.AddCorsPolicy();

            //rate limiting
            services.AddRateLimiter(options =>
            {
                options.AddFixedWindowLimiter("AuthPolicy", opt =>
                {
                    opt.PermitLimit = 5;
                    opt.Window = TimeSpan.FromMinutes(1);
                    opt.QueueLimit = 0;
                });
                options.RejectionStatusCode = 429;
            });
        }
    }
}