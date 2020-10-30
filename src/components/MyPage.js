import React from 'react';

class MyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            email: null,
            depot: null,
            deposit: null,
            buys: []
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.state.email = localStorage.getItem('email');
            var id = localStorage.getItem('user');
            var userUrl = 'https://project.mh-jsramverk.me/users/' + id;
            var tradeUrl = 'https://project.mh-jsramverk.me/tradings/' + id;

            fetch(userUrl)
                .then((response) => response.json())
                .then(data => {
                    this.setState({
                        id: id,
                        email: data.email,
                        depot: data.depot
                    });
                });

                fetch(tradeUrl)
                    .then((response) => response.json())
                    .then(data => {
                        data.map(row => {
                            if (row.event == "Bought") {
                                // console.log(row);
                                this.setState(prevState => ({
                                    buys: [...prevState.buys, row]
                                }))
                            }
                        })
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
    }

    regDeposit = (e) => {
        e.preventDefault();
        var userUrl = 'https://project.mh-jsramverk.me/users/'

        const desposit = {
            'id': this.state.id,
            'deposit': this.state.deposit
        }

        fetch(userUrl, {
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
            <div style={{borderRadius: "20px", backgroundColor: "white", width: "60%", margin: "auto", padding: "10px"}}>
            <p>Användare: {this.state.email}</p>
            <p style={{fontSize: "24px"}}>Saldo: {this.state.depot} kr</p>
            <h3>SÄTT IN PENGAR</h3>
            <input type='number' name='deposit' onChange={this.handleInputChange}/><br/><br/>
            <input className='button' type='submit' value='BEKRÄFTA INSÄTTNING' onClick={this.regDeposit}/>
            <br/><br/></div><br/>
            <div style={{borderRadius: "20px", backgroundColor: "white", width: "60%", margin: "auto", padding: "10px"}}>
            <Items items={this.state.buys}/>
            </div>
            </article>
            </div>
        )
    }
}

function Items(props) {
    if (props.items.length === 0) {
        return (<p>Du har inga registrerade köp.</p>)
    } else {
        return (
            <div>
            <h3>DINA NUVARANDE POSTERS</h3>
            {props.items.map(item => (
                <p><b>{item.object}</b> (köpt för {item.price} kr)</p>
            ))}
            </div>
        )
    }
}

export default MyPage;
