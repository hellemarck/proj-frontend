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

const Header = () => {
    return React.createElement(
        'header',
        {className: 'App-header'},
        React.createElement('p', {style: {fontStyle:'italic'}}, 'Invest in retro posters'),
        React.createElement('img', {
            className: 'App-logo',
            src: require('./img/me.jpg'),
            alt: 'mette'
        }),
        React.createElement('p', null, 'POSTER | BANK')
    )
}

export default Header;
