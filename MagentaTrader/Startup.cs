using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MagentaTrader.Startup))]
namespace MagentaTrader
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
