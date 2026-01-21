import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditorsLaunchpad from './pages/EditorsLaunchpad';

import SkillHub from './pages/SkillHub';
import Dropshipping from './pages/Dropshipping';
import DigitalProducts from './pages/DigitalProducts';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SkillHub />} />
                <Route path="/editorslaunchpad" element={<EditorsLaunchpad />} />
                <Route path="/dropshipping" element={<Dropshipping />} />
                <Route path="/digitalproducts" element={<DigitalProducts />} />
            </Routes>
        </Router>
    );
}

export default App;
