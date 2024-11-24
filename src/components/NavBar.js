import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>RECIPE Ideas</h1>
      </div>
      <div style={styles.navItems}>
        <Link style={styles.link} to="/">
          Home
        </Link>
        <Link style={styles.link} to="/create-recipe">
          Create Recipes
        </Link>
        {!cookies.access_token ? (
          <Link style={styles.link} to="/auth">
            Login/Register
          </Link>
        ) : (
          <button style={{ ...styles.link, ...styles.logoutButton }} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1f2833",
    boxShadow: "0 2px 15px rgba(0, 0, 0, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "background-color 0.3s ease-in-out",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoText: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#66fcf1",
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
  },
  navItems: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  link: {
    fontSize: "1rem",
    fontFamily: "'Poppins', sans-serif",
    textDecoration: "none",
    color: "#c5c6c7",
    padding: "8px 16px",
    borderRadius: "5px",
    fontWeight: "500",
    transition: "color 0.3s ease, background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#45a29e",
    color: "#ffffff",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "8px 16px",
    borderRadius: "5px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    color: "#c5c6c7",
    transition: "color 0.3s ease, background-color 0.3s ease",
  },
};
