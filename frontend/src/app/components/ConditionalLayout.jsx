"use client";
import { usePathname } from 'next/navigation';
import NavbarModern from './NavbarModern';
import SearchForm from './SearchForm';
import Footer from './Footer';
import BackToTopBtn from './BackToTopBtn';

const ConditionalLayout = ({ children }) => {
    const pathname = usePathname();
    
    // Pages qui ne doivent pas afficher la navbar/footer
    const authPages = ['/login', '/signup', '/forgot-password', '/reset-password'];
    const isAuthPage = authPages.includes(pathname);

    if (isAuthPage) {
        return children;
    }

    return (
        <>
            <SearchForm />
            <NavbarModern />
            {children}
            <Footer />
            <BackToTopBtn />
        </>
    );
};

export default ConditionalLayout;
