import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidemenubar from './components/Sidemenubar';
import FileUploadAndDataTable from './components/FileUploadAndDataTable';
import Weight from './components/WeightManager';
import Login from './components/Login';
import Rate from './components/RatesComponent';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidemenubar /> {/* Always show Sidemenubar, but it won't render on the login page due to logic inside Sidemenubar */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/Rate"
              element={
                <PrivateRoute>
                  <Rate />
                </PrivateRoute>
              }
            />
            <Route
              path="/Weight"
              element={
                <PrivateRoute>
                  <Weight />
                </PrivateRoute>
              }
            />
            <Route
              path="/FileUploadAndDataTable"
              element={
                <PrivateRoute>
                  <FileUploadAndDataTable />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
