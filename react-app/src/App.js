import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import AboutRouter from "./pages/aboutRouter";
// import AppNav from "./component/appNav";
const AppNav = React.lazy(() =>
  import(/* webpackChunkName: "appNav" */ "./component/appNav")
);

let inIframe = false;
if (window.self !== window.top) {
  inIframe = true;
}

function App() {
  const openModal = () => {
    if (inIframe) {
      window.parent.postMessage(
        { openModal: true, msg: "hi from iframe" },
        "*"
      );
    } else {
      alert("hi from app stand alone");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {inIframe ? "run in iframe :|" : "run alone :)"}
        <button onClick={openModal}>open modal</button>
        <Router>
          <div>
            <React.Suspense fallback={<div>Loading...</div>}>
              <AppNav />
            </React.Suspense>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/about/:id" component={AboutRouter} />
              <Route>
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
