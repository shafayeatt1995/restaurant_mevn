export default function () {
  function loadScript() {
    // Load google font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap";
    document.head.appendChild(link);

    // Load font awesome
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
    document.head.appendChild(fa);

    // Load gtag
    const noscriptIframe = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      "https://www.googletagmanager.com/ns.html?id=GTM-5LTXXCZ6"
    );
    iframe.setAttribute("height", "0");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("style", "display:none;visibility:hidden");
    noscriptIframe.appendChild(iframe);
    document.body.appendChild(noscriptIframe);
  }

  window.addEventListener("load", loadScript);
}
