import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import CommentsPage from "./pages/CommentsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/feed"
          element={<Feed />}
        />

        <Route
          path="/posts/:postId/comments"
          element={<CommentsPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
