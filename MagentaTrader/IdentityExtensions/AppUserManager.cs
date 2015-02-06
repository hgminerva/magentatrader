using MagentaTrader.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MagentaTrader.IdentityExtensions
{
    public class AppUserManager : UserManager<ApplicationUser>
    {
        public AppUserManager()
            : base(new UserStore<ApplicationUser>(new ApplicationDbContext()))
        {
            PasswordValidator = new MinimumLengthValidator(4);
        }
    }
}