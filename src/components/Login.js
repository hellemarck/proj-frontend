import React from 'react';

function logOut() {
    localStorage.clear();
    alert("Du har loggats ut")
}

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            pw: ""
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const apiUrl = 'https://project.mh-jsramverk.me/login/';

        const login = {
            'email': this.state.email,
            'pw': this.state.pw
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        .then((response) => response.json())
        .then(data => {
            if (data.data) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', data.data.userid);
                alert("Du är nu inloggad");
                this.props.history.push("/mypage");
            } else {
                alert("Fel användare eller lösenord, försök igen.");
            }
        });
    };

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }


    render() {
        return(
            <div className="App">

              <article className="article-standard">
              <h2>LOGGA IN</h2>
              <div style={{borderRadius: "20px", backgroundColor: "white", width: "60%", margin: "auto", padding: "10px"}}>
                  <form onSubmit={this.onSubmit}>
                      <p>E-post:</p>
                      <input type='text' name='email' required onChange={this.handleInputChange}/>
                      <p>Lösenord:</p>
                      <input type='password' name='pw' required onChange={this.handleInputChange}/>
                      <br/><br/><br/>
                      <input className='button' type='submit' value='Logga in'/>
                  <br/><br/>
                  </form>
                  <input className='button' type='submit' value='Logga ut' onClick={logOut}/>
                  <br/><br/>
                  </div>
              </article>
            </div>
        );
    }
}


export default Login;
