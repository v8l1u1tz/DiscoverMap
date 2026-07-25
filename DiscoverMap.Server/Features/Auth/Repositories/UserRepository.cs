using DiscoverMap.Server.Data;
using DiscoverMap.Server.Features.Auth.Models;
using DiscoverMap.Server.Features.Auth.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscoverMap.Server.Features.Auth.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> GetByEmailAsync(string email)
            => await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<bool> ExistsByEmailAsync(string email)
            => await _dbContext.Users.AnyAsync(u => u.Email == email);

        public async Task<bool> ExistsByUsernameAsync(string username)
            => await _dbContext.Users.AnyAsync(u => u.Username == username);

        public async Task AddAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}