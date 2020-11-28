import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import TagGrid from "./Components/TagGrid/TagGrid";
import Problems from "./Components/Problems/Problems";

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      tags : []
    }
  }

  handleCallback = (childData) =>{
    console.log(childData);
    this.setState({tags: childData})
}

  render() {
    let tagRoute = null;
    if(this.state.tags.length!=0)
    {
      tagRoute = <Route exact path="/" component={()=>
        <TagGrid tags={this.state.tags}/>
      }  />;
    }
    return (
      <div className="App">
        <Router>
          <Home parentCallback = {this.handleCallback.bind(this)} />
          {
            console.log(this.state.tags)
          }
          {tagRoute}
          <Route exact path="/problems/:tags" component={Problems} />
        </Router>
      </div>
    );
  }
}

export default App;
