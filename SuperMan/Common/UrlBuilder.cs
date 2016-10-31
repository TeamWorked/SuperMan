using System.Web.Mvc;

namespace SuperMan.Common
{
    public static class UrlBuilder
    {
        private const string ImagePath = "../Content/Image/";

        private const string ScriptPath = "../Content/Script/";

        private const string CssPath = "../Content/Css/";

        private const string LandingImagePath = "../LandingPage/img/";

        private const string LandingScriptPath = "../LandingPage/js/";

        private const string LandingCssPath = "../LandingPage/css/";

        public static MvcHtmlString ImageUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(ImagePath + text);
        }

        public static MvcHtmlString ScriptUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(ScriptPath + text);
        }

        public static MvcHtmlString CssUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(CssPath + text);
        }

        public static MvcHtmlString LandingImageUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(LandingImagePath + text);
        }

        public static MvcHtmlString LandingScriptUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(LandingScriptPath + text);
        }

        public static MvcHtmlString LandingCssUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(LandingCssPath + text);
        }
    }
}