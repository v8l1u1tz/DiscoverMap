using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DiscoverMap.Server.Common.Helpers;
using DiscoverMap.Server.Features.Auth.DTOs;
using DiscoverMap.Server.Features.Auth.Models;
using DiscoverMap.Server.Features.Auth.Repositories.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace DiscoverMap.Server.Features.Auth.Services
{
    public class AuthService
    {
        private readonly IUserRepository _repo;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        public async Task<bool> RegisterAsync(RegisterDTO dto)
        {
            var exists = await _repo.ExistsByEmailOrUsernameAsync(dto.Email, dto.Username);
            if (exists) return false;

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = PasswordHasher.Hash(dto.Password)
            };

            await _repo.AddAsync(user);
            return true;
        }

        public async Task<string?> LoginAsync(LoginDTO dto)
        {
            var user = await _repo.GetByEmailAsync(dto.Email);
            if (user == null) return null;

            if (!PasswordHasher.Verify(dto.Password, user.PasswordHash)) return null;

            return GenerateToken(user);
        }

        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    double.Parse(_config["Jwt:ExpiryMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}