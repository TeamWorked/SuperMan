using System.Web.Mvc;

namespace SuperMan.Common
{
    public static class UrlBuilder
    {
        private const string ImagePath = "../Content/Image/";

        private const string ScriptPath = "../Content/Script/";

        private const string CssPath = "../Content/Css/";

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
    }
}