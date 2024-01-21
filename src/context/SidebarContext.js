import React, { useState } from "react";
import PropTypes from 'prop-types';

const SidebarContext = React.createContext({});

const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
        console.log("toggle sidebar clicked")
    }

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            toggleSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

SidebarProvider.propTypes = {
    children: PropTypes.node
}

export { SidebarContext, SidebarProvider };
