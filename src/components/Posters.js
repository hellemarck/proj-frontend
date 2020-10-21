import React from 'react';
// import poster1 from './img/poster1.jpg'
const poster = require('./img/poster1.jpg');
console.log(poster);


class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // title: null,
            // image: null,
            // description: "hej",
            posters: [],
        };
    }

    componentDidMount() {
        console.log(this.state.posters);
        var id = 1;
        var apiUrl = 'https://project.mh-jsramverk.me/posters/';

        fetch(apiUrl)
            .then((response) => response.json())
            .then(rows => {
                console.log(rows[0]);
                this.setState({
                    posters: rows,
                    // description: "hellu"
                });
            });
    }

    // <a href={"/buy/" + id} className="button">Investera</a>
    render() {
        return (
            <div className="App">
            <br/><br/>
            <h2>POSTERS</h2>
            <article className="article-standard">

                {this.state.posters.map((poster) => (
                    <div className="posterBox">
                   <h3>{poster.title}</h3>
                   <img src={require(`./img/${poster.image}`)} alt={"bild"} />
                   <p>{poster.description}</p>
                   <p><b>Utgångspris: {poster.price} kr</b></p><br/>
                   <a href={"/view/" + poster.id} className="button">Följ värdeutveckling</a>
                   <br/><br/><br/></div>
               ))}
            </article>
            </div>
        )
    }
}


// ALT2 - ARROW FUNCTIONS:
// const Reports = () => <article className="article-standard"><p>hejsaaan</p></article>

// exporting as default allows us to import with any name in App.js
export default Reports;
