// PRACTISING CLASS COMPONENTS AND/OR JSX

import React from 'react';


const Header = () => {
    return React.createElement(
        'header',
        {className: 'App-header'},
        React.createElement('p', {style: {fontSize:'36px', fontFamily:'Poiret One'}}, 'INVEST IN RETRO POSTERS'),
        React.createElement('img', {
            className: 'App-logo',
            src: require('./img/poster4.jpg'),
            alt: 'poster4'
        }),
        React.createElement('p', {style: {fontSize:'36px', fontFamily:'Lobster'}}, 'the POSTER | BANK')
    )
}

export default Header;
