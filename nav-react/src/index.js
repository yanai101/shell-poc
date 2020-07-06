import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

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

class NavComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    navTemplate.innerHTML += styleNav;
    let navHtml = "<ul id='navApp'>";
    this.routerLink = this.getAttribute("routerSlot");
    const slotes = (this.routerLink && this.routerLink.split(",")) || false;
    if (slotes) {
      this.routerLink.split(",").forEach((link) => {
        navHtml += `<li>${
          inIframe
            ? `<span data-link="${link.trim()}">${link.trim()} </span> `
            : `<slot name="${link.trim()}"/>`
        }</li>`;
      });
    } else {
      navHtml += "<li> slotes are empty<li>";
    }

    navHtml += "</ul>";
    navTemplate.innerHTML += navHtml;
    this.shadowRoot.appendChild(navTemplate.content, this.cloneNode(true));

    this.links = this.shadowRoot.querySelectorAll("#navApp li");
    console.log("this.links", this.links);

    this.shadowRoot.dispatchEvent(new Event("done", {}));

    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        link.dispatchEvent(
          new CustomEvent("navChange", {
            detail: e.target,
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
      });
    });
  }
}

customElements.define("nav-component", NavComponent);

class XNav extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    ReactDOM.render(
      <nav-component routerSlot="home,about,about/myId">
        <Router>
          <Link slot="home" to="/">
            Home
          </Link>
          <Link slot="about" to="/about">
            About
          </Link>
          <Link slot="about/myId" to="/about/myId">
            About with id
          </Link>
        </Router>
      </nav-component>,
      mountPoint
    );
  }
}
customElements.define("x-nav", XNav);
