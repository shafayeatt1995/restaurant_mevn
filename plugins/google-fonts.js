export default function () {
  function loadScript() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap";
    document.head.appendChild(link);

    const gtag = document.createElement("script");
    gtag.async = true;
    gtag.src = "https://www.googletagmanager.com/gtag/js?id=G-LT5BZHN3QJ";
    document.body.appendChild(gtag);

    const gtagTrigger = document.createElement("script");
    gtagTrigger.type = "text/javascript";
    gtagTrigger.src = "/gtag.js";
    document.body.appendChild(gtagTrigger);
  }

  window.addEventListener("load", setTimeout(loadScript(), 1000));
}
