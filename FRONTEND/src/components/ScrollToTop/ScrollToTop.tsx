import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Tenta subir o elemento raiz do HTML
        document.documentElement.scrollTo(0, 0);

        // Tenta subir o body
        document.body.scrollTo(0, 0);

        // Se você usa uma div 'Content', vamos subir ela também!
        const mainContent = document.querySelector('main') || document.querySelector('.content');
        if (mainContent) {
            mainContent.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;