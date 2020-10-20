// PRACTISING CLASS COMPONENTS AND/OR JSX

import React from 'react';


// class Header extends Component {
//     render() {
//         return <header className="App-header">
//         <p><i>En sida byggd i React för kursen jsramverk, BTH.</i></p>
//           <img src={require('././img/me.jpg')} className="App-logo" alt="mette" />
//           <p>
//             Hej hopp, Mette heter jag!
//           </p>
//         </header>
//     }
// }

// Arapey
// Oswald
// Prata
// Vidaloka
// Lobster
// Poiret One

const Header = () => {
    return React.createElement(
        'header',
        {className: 'App-header'},
        React.createElement('p', {style: {fontSize:'36px', fontFamily:'Poiret One'}}, 'INVEST IN RETRO POSTERS'),
        React.createElement('img', {
            className: 'App-logo',
            src: require('./img/poster4.jpg'),
            alt: 'mette'
        }),
        React.createElement('p', {style: {fontSize:'36px', fontFamily:'Lobster'}}, 'the POSTER | BANK')
    )
}

export default Header;
