import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../css/navbar.css";

export const Navbar = () =>{
  const[cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="name-tag">
          <h1>RECIPE Ideas</h1>
        </div>
        <div className="pages">
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/create-recipe">CreateRecipes</Link>
          {!cookies.access_token ? (
            <Link className="links"  to="/auth">Login/Register</Link>
          ) : (
            <button className="links log-button"  onClick={logout}>logout</button>
          )}
        </div>
      </div>
    </div>
  );
}