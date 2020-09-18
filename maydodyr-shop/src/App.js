import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.css";

import PagesRouter from "./pages/PagesRouter";
import HeadMenu from "./components/HeadMenu";



class App extends React.PureComponent {
  render() {
    return (
      <Container>
        <HeadMenu />
        <PagesRouter />
      </Container>
    );
  }
}

export default App;
