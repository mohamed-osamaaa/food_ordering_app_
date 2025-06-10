import React, { ReactNode } from 'react';
import Header from '@/components/header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <main className="">{children}</main>
        </div>
    );
};

export default Layout;
