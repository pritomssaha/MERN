import { useRoutes } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import List from "./component/List";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Register from "./component/Register";

function App() {
  const element = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/loadall", element: <List /> },
    { path: "/logout", element: <Logout /> },
  ]);

  return (
    <>
      <h1>Welcome to my App</h1>
      <div>
        <Layout />
        {element}
      </div>
    </>
  );
}

export default App;
