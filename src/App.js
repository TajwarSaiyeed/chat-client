import "./App.css";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  { path: "/", element: <Join /> },
  { path: "/chat", element: <Chat /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
