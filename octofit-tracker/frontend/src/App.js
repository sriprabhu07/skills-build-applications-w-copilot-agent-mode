import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import logo from './octofitapp-small.svg';

function Welcome() {
  return (
    <div className="welcome-page py-5">
      <div className="card content-card p-4">
        <div className="card-body">
          <h1 className="card-title display-5 text-primary">Welcome to Octofit Tracker</h1>
          <p className="lead text-secondary mb-4">
            Explore the activities, leaderboard, teams, users, and workouts kept in your Octofit backend.
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <NavLink className="btn btn-primary" to="/activities">View Activities</NavLink>
            <NavLink className="btn btn-outline-light" to="/leaderboard">View Leaderboard</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Octofit" className="brand-logo me-2" />
            <span>Octofit Tracker</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
