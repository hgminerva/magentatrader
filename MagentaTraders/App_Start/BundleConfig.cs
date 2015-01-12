using System.Web;
using System.Web.Optimization;

namespace MagentaTraders
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/css/css").Include(
                      "~/css/home.css",
                      "~/css/ie9.css",
                      "~/css/theme.css"));
            bundles.Add(new ScriptBundle("~/js/js").Include(
                      "~/js/jquery-1.11.1.min.js",
                      "~/js/jquery.min.js",
                      "~/js/bootstrap.min.js",
                      "~/js/jquery.cycle2.js",
                      "~/js/modernizr.custom.js"));
            bundles.Add(new ScriptBundle("~/js/global").Include(
                      "~/js/global.js"));
        }
    }
}
