import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditorsLaunchpad from './pages/EditorsLaunchpad';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/editorslaunchpad" element={<EditorsLaunchpad />} />
                <Route path="/" element={<Navigate to="/editorslaunchpad" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
