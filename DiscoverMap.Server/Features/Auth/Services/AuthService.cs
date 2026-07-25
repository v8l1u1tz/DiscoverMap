using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DiscoverMap.Server.Common.Helpers;
using DiscoverMap.Server.Common.Models;
using DiscoverMap.Server.Features.Auth.DTOs;
using DiscoverMap.Server.Features.Auth.Models;
using DiscoverMap.Server.Features.Auth.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DiscoverMap.Server.Features.Auth.Services
{
    public class AuthService
    {
        private readonly IUserRepository _repo;
        private readonly IConfiguration _config;
        private const string DummyHash = "$2a$11$CwTycUXWumAMam0BluEM0uJ8dQ0lY.9NpP5Kk3aP0hYlF.KTAA2cS";

        public AuthService(IUserRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        public async Task<AuthResult> RegisterAsync(RegisterDTO dto)
        {
            var result = new AuthResult();

            result.Errors.AddRange(PasswordValidator.Validate(dto.Password));

            if (await _repo.ExistsByEmailAsync(dto.Email))
                result.Errors.Add("Email is already registered.");

            if (await _repo.ExistsByUsernameAsync(dto.Username))
                result.Errors.Add("Username is already taken.");

            if (result.Errors.Count > 0)
                return result;

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = PasswordHasher.Hash(dto.Password)
            };

            try
            {
                await _repo.AddAsync(user);
            }
            catch (DbUpdateException)
            {
                result.Errors.Add("Username or email is already taken.");
                return result;
            }

            result.Succeeded = true;
            return result;
        }

        public async Task<string?> LoginAsync(LoginDTO dto)
        {
            var user = await _repo.GetByEmailAsync(dto.Email);

            var hashToCheck = user?.PasswordHash ?? DummyHash;
            var isValid = PasswordHasher.Verify(dto.Password, hashToCheck);

            if (user == null || !isValid) return null;

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
