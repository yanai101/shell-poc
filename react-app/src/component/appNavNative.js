let inIframe = false;
if (window.self !== window.top) {
  inIframe = true;
}

let navTemplate = document.createElement("template");
const styleNav = `
<style>
  #navApp li span{
    cursor: pointer;
  }
</style>`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    navTemplate.innerHTML += styleNav;
    let navHtml = "<ul id='navApp'>";
    this.routerLink = this.getAttribute("routerSlot");
    this.routerLink.split(",").forEach((link) => {
      navHtml += `<li>${
        inIframe
          ? `<span data-link="${link.trim()}">${link.trim()} </span> `
          : `<slot name="${link.trim()}"/>`
      }</li>`;
    });
    navHtml += "</ul>";
    navTemplate.innerHTML += navHtml;
    this.shadowRoot.appendChild(navTemplate.content, this.cloneNode(true));

    if (inIframe) {
      this.links = this.shadowRoot.querySelectorAll("#navApp li");
      console.log(this.links);
      this.links.forEach((link) => {
        link.addEventListener("click", this.linkClicked);
      });
    }
  }

  disconnectedCallback() {
    this.links.forEach((link) => {
      link.removeEventListener("click", this.linkClicked);
    });
  }

  linkClicked(e) {
    let data;
    if (e.target.nodeName === "A") {
      const data = e.target.getAttribute("slot");
    } else {
      data = e.target.dataset.link;
    }
    window.parent.postMessage({ data, app: "react" }, "*");
  }
}

customElements.define("nav-component", MyComponent);
