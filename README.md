# poc-appShell

![enter image description here](./gifs/demo.gif)

This app id a POC for shell that receive an Object and build navigation base on the config - all the app are in main iframe and the source is replace when you change app view .
Every app it can stand alone

## navigation

implementation - the app listening to post Message from the shell and routing to the inside url - in this way you get all benefit of the inside routing.
The shell are using the history api to manage the state and adding to every state additional information based on the app.

## web component

Every app in export a native web component to the shell to display - that is the app responsibility to give the shell the inside route - the shell is stupid component.

**In the vue app** - the vue cli can export native web component.
[https://cli.vuejs.org/guide/build-targets.html#web-component](https://cli.vuejs.org/guide/build-targets.html#web-component)
**In the react app** -we need to wrap a react render with our web component
[https://reactjs.org/docs/web-components.html](https://reactjs.org/docs/web-components.html)

we have a base web component that add functionality to the routine - that every app are use it.

to run the demo - run every app and open the shell

![enter image description here](https://media.giphy.com/media/TLPSABPMW52wNx8aeZ/giphy.gif)
