import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.routeChange = this.routeChange.bind(this);


        this.state = {
            email: "",
            pw: ""
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const apiUrl = 'https://project.mh-jsramverk.me/register/';
        // const apiUrl = 'http://localhost:3002/register/';

        const user = {
            'email': this.state.email,
            'pw': this.state.pw
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(data => {
            console.log("user: ", user);
            console.log(data);
        });
        this.routeChange();
    };

    routeChange() {
        alert("Användare skapad");
        // let path = "/login";
        // this.props.history.push(path);
    }

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
          <div className="App">

            <article className="article-standard">
                <h3>Registrera ny användare</h3>
                    <form onSubmit={this.onSubmit}>
                        <p>E-post:</p>
                        <input type='text' name='email' required onChange={this.handleInputChange}/>
                        <p>Lösenord:</p>
                        <input type='password' name='pw' required onChange={this.handleInputChange}/>
                        <br/><br/><br/>
                        <input className='button' type='submit' value='Registrera'/>
                    </form>
            </article>
          </div>
        );
    }
}

export default Register;
