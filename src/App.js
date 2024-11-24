import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipes } from './pages/create-recipepage';
import { Navbar } from './components/NavBar';
import "./App.css";

function App() {
  return (
    <div className='app' >
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/auth' element = {<Auth/>} />
        <Route path='/create-recipe' element = {<CreateRecipes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
