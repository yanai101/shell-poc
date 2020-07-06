import React from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./appNavNative";
// import(/* webpackChunkName: "appNav" */ "./appNavNative").catch((e) =>
//   console.log(e)
// );

// const navPoint = document.createElement("div");
// ReactDOM.appendChild(navPoint);
function AppNav(props) {
  console.log(props);
  let history = useHistory();

  const handelMessage = (e) => {
    if (e.origin !== window.location.origin) {
      console.log("ifram", e);
      if (e.data.app) {
        history.replace(`/${e.data.data}`);
      }
    }
  };
  window.addEventListener("message", handelMessage, false);

  return (
    <nav-component routerSlot="home,about,about/myId">
      <Link slot="home" to="/">
        Home
      </Link>
      <Link slot="about" to="/about">
        About
      </Link>
      <Link slot="about/myId" to="/about/myId">
        About with id
      </Link>
    </nav-component>
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <AppNav />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

export default AppNav;
