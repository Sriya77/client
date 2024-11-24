import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";
import "./App.css";

// Lazy load pages
const Home = lazy(() => import("./pages/home"));
const Auth = lazy(() => import("./pages/auth"));
const CreateRecipes = lazy(() => import("./pages/create-recipepage"));

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/create-recipe" element={<CreateRecipes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
);

export default App;
