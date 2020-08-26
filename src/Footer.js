import React from 'react';

const Footer = () => {
    return (
        <div className="text-center py-3 text-warning">
            &copy; {new Date().getFullYear()} Matthew Pan: Thanks for visiting my page :)
        </div>
    );
}

export default Footer;