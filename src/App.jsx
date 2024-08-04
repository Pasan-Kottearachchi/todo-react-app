import './App.css';
import HomeScreen from "./pages/Homescreen";
import { useEffect } from "react";
import { fetchTaskList } from "./store/routines";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTaskList());
    }, [dispatch]);
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn Reactsss*/}
      {/*  </a>*/}
      {/*</header>*/}
      <HomeScreen />
    </div>
  );
}

export default App;
