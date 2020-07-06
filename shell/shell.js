import { config } from "./config.js";
let loadedApps = [];
(() => {
  const iframeWin = document.getElementsByTagName("iframe")[0];
  const navElement = document.getElementsByTagName("nav")[0];

  // iframeWin.postMessage(myMessage.value);

  window.addEventListener("message", displayMessage, false);

  function displayMessage(e) {
    const { app, data } = e.data;
    if (app && history.state !== e.data) {
      history.pushState({ app, data }, app, `/${app}/${data}`);
      // if (e.origin !== location.origin) {
      iframeWin.contentWindow.postMessage({ app, data }, "*");
      // }
    }

    if (e.data.openModal) {
      alert(`i have a message from inside app: ${e.data.msg}`);
    }
  }

  document.addEventListener("navChange", (e) => {
    const data = e.detail.slot;
    const app = "react";
    if (app && history.state !== data) {
      history.pushState({ app, data }, app, `/${app}/${data}`);
      iframeWin.contentWindow.postMessage({ app, data }, "*");
    }
  });

  window.addEventListener("popstate", (e) => {
    iframeWin.contentWindow.postMessage(e.state, "*");
  });

  const loadSrc = (e) => {
    const { app } = e.target.dataset;
    history.replaceState({}, "/", "/");
    //cleanNav();
    navElement.innerHTML = "";
    const nav = document.createElement(config[app].component);
    navElement.appendChild(nav);
    if (!loadedApps.includes(app)) {
      appendScriptAsync(app, 0);
      loadedApps.push(app);
    }
    iframeWin.src = config[app].iframeSrc;
  };

  const cleanNav = () => {
    const scripts = document.querySelector("[activeApp]");
    scripts && scripts.forEach((Elem) => Elem.parentNode.removeChild(Elem));
  };

  const appendScriptAsync = async (app, index) => {
    if (config[app].src.length + 1 === index) return;
    const srcFile = config[app].src[index];
    if (!srcFile) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = () => {
      console.log("srcFile", srcFile);
      appendScriptAsync(app, ++index);
    };
    script.src = srcFile;
    script.dataset.activeApp;
    document.body.append(script);
  };

  function init() {
    Object.keys(config).forEach((key) => {
      const btn = document.createElement("button");
      btn.innerText = `${key} app`;
      btn.dataset.app = key;
      btn.addEventListener("click", loadSrc);
      document.body.prepend(btn);
    });
  }

  init();

  window.BeforeUnloadEvent = (e) => {
    e.preventDefault();
    debugger;
    window.location = "/";
  };
})();
