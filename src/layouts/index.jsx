import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
                {children}
            </main>
        </div>
    );
};

export default Layout;