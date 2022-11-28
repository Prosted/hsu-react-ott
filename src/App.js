import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Routes/Home";
import { Join } from "./Routes/Join";
import { Login } from "./Routes/Login";
import { Logout } from "./Routes/Logout";
import { Welcome } from "./Routes/Welcome";
import {MovieDetail} from "./Routes/MovieDetail";
import { WishList } from "./Routes/WishList";
import { CartList } from "./Routes/CartList";
import { Search } from "./Routes/Search";
import { Pay } from "./Routes/Pay";
import { MyMovies } from "./Routes/MyMovies";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/join" element={<Join />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/:username/movies" element={<MyMovies />} />
        <Route path="/*" element={<Navigate replace="true" to="/" />} />
        </Routes>
    </div>
  );
}

export default App;
