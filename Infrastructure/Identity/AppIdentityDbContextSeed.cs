using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUserAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new AppUser
            {
                DisplayName = "Maru",
                Email = "Komaru@cat.com",
                UserName = "MAluuu",
                Address = new Address
                {
                    FirstName = "TYTY",
                    LastName = "Serral",
                    Street = "malluuuuuu",
                    City = "Dolgopa",
                    State = "SC2",
                    ZipCode = "141505"
                }
            };
            await userManager.CreateAsync(user, "Pa$$w0rd");
        }        
    }
}