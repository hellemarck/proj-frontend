import React from 'react';

class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            image: null,
            description: null,
        };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var apiUrl = 'https://project.mh-jsramverk.me/posters/' + id;

        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    title: data.data.title,
                    image: data.data.image,
                    description: data.data.description
                });
            });
    }

    render() {
        var url = window.location.href.slice(0, -1);
        var id = this.props.match.params.id;
        return (
            <div className="App">

            <nav className="reports">
                <a href={`${url}1`}>Poster1</a>
                <a href={`${url}2`}>Poster2</a>
                <a href={`${url}3`}>Poster3</a>
                <a href={`${url}4`}>Poster4</a>
                <a href={`${url}5`}>Poster5</a>
                <a href={`${url}6`}>Poster6</a>
                <a href={`${url}6`}>Poster7</a>
                <a href={`${url}6`}>Poster8</a>
                <a href={`${url}6`}>Poster9</a>
                <a href={`${url}6`}>Poster10</a>
            </nav><br/>
            <a href={"/buy/" + id} className="button">Investera</a>
            <br/><br/>
            <h2>{this.state.title}</h2>
            <article className="article-standard"
                dangerouslySetInnerHTML={{__html: this.state.description}} >
            </article>
            </div>
        )
    }
}


// ALT2 - ARROW FUNCTIONS:
// const Reports = () => <article className="article-standard"><p>hejsaaan</p></article>

// exporting as default allows us to import with any name in App.js
export default Reports;
