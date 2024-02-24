// Google Tag Manager code
const googleTagHeadScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKNCBRGH');`;

// const googleTagBodyScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKNCBRGH"
// height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

export default ({ app }) => {
  if (process.client) {
    const script = document.createElement('script');
    script.innerHTML = googleTagHeadScript;
    document.head.appendChild(script);

    // const noscript = document.createElement('noscript');
    // noscript.innerHTML = googleTagBodyScript;
    // document.body.appendChild(noscript);

    // Add Google Tag Manager noscript iframe
    const noscriptIframe = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.googletagmanager.com/ns.html?id=GTM-NKNCBRGH');
    iframe.setAttribute('height', '0');
    iframe.setAttribute('width', '0');
    iframe.setAttribute('style', 'display:none;visibility:hidden');
    noscriptIframe.appendChild(iframe);
    document.body.appendChild(noscriptIframe);
  }
};
