import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Sidebar = ({ onClose }) => {
    useEffect(() => {
        const sidebar = document.getElementById('mySidebar');

        return () => {
            if (sidebar) {
                document.body.removeChild(sidebar);
            }
        };
    }, []);

    return ReactDOM.createPortal(
        <div id="mySidebar" className="sidebar">
            <div className="sidebar-header">
                <h2>Snipboard</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="sidebar-content">
                <p>Content of the sidebar</p>
            </div>
        </div>,
        document.body
    );
};

export default Sidebar;
