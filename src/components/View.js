import React from 'react';

class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: null,
            image: null,
            description: null,
            price: null,
        };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var apiUrl = 'https://project.mh-jsramverk.me/posters/' + id;

        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    id: id,
                    title: data.data.title,
                    image: data.data.image,
                    description: data.data.description,
                    price: data.data.price
                });
            });
    }

    buyObject() {
        console.log("wanna buy")
    }

    render() {
        var image = this.state.image;
        return (
            <div className="App">
            <h2>Poster: {this.state.title}</h2>
            <article className="article-standard">
            <p>Utgångspris: {this.state.price} kr.</p>
            <input className='button' type='submit' value='KÖP' onClick={this.buyObject}/>            </article>
            </div>
        )
    }
}

export default View;
