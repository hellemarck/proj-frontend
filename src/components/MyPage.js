import React from 'react';

class MyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            email: null,
            depot: null,
            deposit: null,
            buys: [],
            sales: []
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.state.email = localStorage.getItem('email');
            var id = localStorage.getItem('user');
            var apiUrl = 'https://project.mh-jsramverk.me/users/' + id;

            fetch(apiUrl)
                .then((response) => response.json())
                .then(data => {
                    this.setState({
                        id: id,
                        email: data.email,
                        depot: data.depot
                    });
                });
        } else {
            let path = "/login";
            this.props.history.push(path);
        }
    }

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state);
    }

    regDeposit = (e) => {
        e.preventDefault();
        var apiUrl = 'https://project.mh-jsramverk.me/users/'

        const desposit = {
            'id': this.state.id,
            'deposit': this.state.deposit
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(desposit)
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                alert("Sessionen har gått ut, logga in på nytt");
                this.props.history.push("/login")
            } else {
                alert("Insättning registrerad");
                document.getElementsByName('deposit')[0].value = '';
                var newBalance = parseInt(this.state.depot) + parseInt(this.state.deposit);
                this.setState({
                    depot: newBalance
                });
            };
        });
    }

    render() {
        return (
            <div className="App">
            <br/><br/>
            <h2>MIN SIDA</h2>
            <article className="article-standard">

            <p>Användare: {this.state.email}</p>
            <p style={{fontSize: "24px"}}>Saldo: {this.state.depot} kr</p>
            <h3>SÄTT IN PENGAR</h3>
            <input type='number' name='deposit' onChange={this.handleInputChange}/><br/><br/>
            <input className='button' type='submit' value='BEKRÄFTA INSÄTTNING' onClick={this.regDeposit}/>

            </article>
            </div>
        )
    }
}

export default MyPage;
