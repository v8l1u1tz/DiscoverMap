using DiscoverMap.Server.Features.Auth.Models;
using DiscoverMap.Server.Features.Pins.Models;
using Microsoft.EntityFrameworkCore;

namespace DiscoverMap.Server.Data.Seeders
{
    public static class PinSeeder
    {
        public static async Task SeedAsync(AppDbContext dbContext)
        {
            await dbContext.Database.MigrateAsync();

            //-- seed dummy user --
            if (!await dbContext.Users.AnyAsync())
            {
                var dummyUser = new User
                {
                    Username = "lutz",
                    Email = "lutzydummy@discovermap.local",
                    PasswordHash = "not-a-real-hash"
                };
                await dbContext.Users.AddAsync(dummyUser);
                await dbContext.SaveChangesAsync();
            }

            //-- seed pins under dummy user --
            if (!await dbContext.Pins.AnyAsync())
            {
                var userId = (await dbContext.Users.FirstAsync()).Id;

                var pins = new List<Pin>
                {
                    new Pin
                    {
                        Title = "First Pin",
                        Description = "This is the first real pin",
                        Category = "Landmark",
                        Latitude = 14.5995,
                        Longitude = 120.9842,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Second Pin",
                        Description = "Another cool location",
                        Category = "Restaurant",
                        Latitude = 14.5800,
                        Longitude = 120.9900,
                        UserId = userId
                    },

                    //-- Luzon --
                    new Pin
                    {
                        Title = "Rizal Park",
                        Description = "Historic urban park honoring national hero Jose Rizal",
                        Category = "Landmark",
                        Latitude = 14.5832,
                        Longitude = 120.9794,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Baguio Highland Cafe",
                        Description = "Cozy mountain cafe with a view of the pine forests",
                        Category = "Cafe",
                        Latitude = 16.4023,
                        Longitude = 120.5960,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Vigan Heritage Village",
                        Description = "Cobblestone streets and preserved Spanish colonial houses",
                        Category = "Hidden Gems",
                        Latitude = 17.5747,
                        Longitude = 120.3869,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Tagaytay Skyline Lounge",
                        Description = "Rooftop lounge overlooking Taal Volcano",
                        Category = "Lounge",
                        Latitude = 14.1153,
                        Longitude = 120.9621,
                        UserId = userId
                    },

                    //-- Visayas --
                    new Pin
                    {
                        Title = "Larsian BBQ Cebu",
                        Description = "Famous open-air BBQ food stalls in downtown Cebu",
                        Category = "Restaurant",
                        Latitude = 10.3157,
                        Longitude = 123.8854,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Boracay Beachfront Lounge",
                        Description = "Sunset lounge along White Beach",
                        Category = "Lounge",
                        Latitude = 11.9674,
                        Longitude = 121.9248,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Chocolate Hills",
                        Description = "Iconic rolling hills landmark in Bohol",
                        Category = "Landmark",
                        Latitude = 9.8267,
                        Longitude = 124.1442,
                        UserId = userId
                    },

                    //-- Mindanao --
                    new Pin
                    {
                        Title = "Davao Fitness Hub",
                        Description = "Full-service gym near Davao's business district",
                        Category = "Gym",
                        Latitude = 7.1907,
                        Longitude = 125.4553,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "CDO Riverside Grill",
                        Description = "Local grill restaurant along the Cagayan de Oro river",
                        Category = "Restaurant",
                        Latitude = 8.4822,
                        Longitude = 124.6472,
                        UserId = userId
                    },
                    new Pin
                    {
                        Title = "Pasonanca Nature Spot",
                        Description = "Quiet hidden park tucked in the hills of Zamboanga",
                        Category = "Hidden Gems",
                        Latitude = 6.9214,
                        Longitude = 122.0790,
                        UserId = userId
                    }
                };

                await dbContext.Pins.AddRangeAsync(pins);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}