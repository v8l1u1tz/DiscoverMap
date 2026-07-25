namespace DiscoverMap.Server.Common.Models
{
    public class AuthResult
    {
        public bool Succeeded { get; set; }
        public List<string> Errors { get; set; } = new();
    }
}