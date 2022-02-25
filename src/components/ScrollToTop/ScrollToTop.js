import React, {useEffect, useRef} from 'react';
import './ScrollToTop.css'

const ScrollToTop = () => {

    const scrollTop = useRef()

    useEffect(() => {
        const fixedScroll = () => {
            if (
                document.documentElement.scrollTop > 500
            ) {
                scrollTop.current.classList.add('show-scroll-top');
            } else {
                scrollTop.current.classList.remove('show-scroll-top');
            }
        };
        window.addEventListener('scroll', fixedScroll);
        return () => {
            window.removeEventListener('scroll', fixedScroll);
        };
    }, []);

    const handleScrollTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="scroll-to-top" ref={scrollTop} onClick={handleScrollTop}>
            <i className="fas fa-arrow-up"></i>
        </div>
    );
};

export default ScrollToTop;