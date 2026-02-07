import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EditorsLaunchpad from './pages/EditorsLaunchpad';

import SkillHub from './pages/SkillHub';
import Dropshipping from './pages/Dropshipping';
import DigitalProducts from './pages/DigitalProducts';

// 5 Unique Dropshipping Landing Page Designs
import DropshippingV1 from './pages/DropshippingV1';
import DropshippingV2 from './pages/DropshippingV2';
import DropshippingV3 from './pages/DropshippingV3';
import DropshippingV4 from './pages/DropshippingV4';
import DropshippingV5 from './pages/DropshippingV5';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SkillHub />} />
                <Route path="/editorslaunchpad" element={<EditorsLaunchpad />} />
                <Route path="/dropshipping" element={<Dropshipping />} />
                <Route path="/internationaldropshipping" element={<DropshippingV5 />} />
                <Route path="/digitalproducts" element={<DigitalProducts />} />

                {/* 5 Unique Dropshipping Course Landing Pages */}
                <Route path="/1" element={<DropshippingV1 />} />
                <Route path="/2" element={<DropshippingV2 />} />
                <Route path="/3" element={<DropshippingV3 />} />
                <Route path="/4" element={<DropshippingV4 />} />
                <Route path="/5" element={<DropshippingV5 />} />
            </Routes>
        </Router>
    );
}

export default App;
