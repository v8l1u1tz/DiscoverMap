using DiscoverMap.Server.Features.Auth.Models;

namespace DiscoverMap.Server.Features.Auth.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> ExistsByUsernameAsync(string username);
        Task AddAsync(User user);
    }
}