import React, { useState } from 'react';
import '../styles/index.css';

/* global chrome */

const Extension = () => {
    return (
        <div className="popup">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <p>Popup</p>
            {/* Add some sample talwind css code to test */}
            <div className="bg-blue p-4">
                <p className="text-darkRed">Sample text</p>
            </div>
        </div>
    );
}

export default Extension;
