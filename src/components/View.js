import React from 'react';
import io from 'socket.io-client';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

var currentValue = null;
var tradingApi = 'https://project.mh-jsramverk.me/tradings/';
var userApi = 'https://project.mh-jsramverk.me/users/';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();

        this.state = {
            id: null,
            userdepot: null,
            title: null,
            price: null,
            quantity: 1,
            userStock: 0
        };

        this.socket = io('https://socket-prices.mh-jsramverk.me');
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var postersApi = 'https://project.mh-jsramverk.me/posters/' + id;
        var userApi = 'https://project.mh-jsramverk.me/users/' + localStorage.getItem('user');
        // var tradingApi = 'https://project.mh-jsramverk.me/tradings/';

        fetch(userApi)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    userdepot: data.depot
                });
            });

        this.socket.on('stocks', (posters) => {
            var posterID = id-1;
            currentValue = posters[posterID].["startingPoint"];
        });

        fetch(postersApi)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    id: id,
                    title: data.data.title,
                    price: data.data.price
                });
            });

        this.makeGraph();

        fetch(tradingApi)
            .then((response) => response.json())
            .then(data => {
                for (var i = 0, l = data.length; i < l; i++) {
                    if (data[i].kundid == localStorage.getItem('user') && data[i].object == this.state.title && data[i].event == "Bought") {
                        this.setState(prevState => {
                            return { userStock: prevState.userStock + 1}
                        })
                    }
                }
            });
    }

    // CREATE GRAPH TO SHOW PRICE SIMULATION chartjs
    color = Chart.helpers.color;
    makeGraph() {
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              data: [],
              label: 'Värdeutveckling',
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              lineTension: 0,
            }]
          },
          options: {
              title: {
                  display: true,
                  text: ""
              },
              scales: {
                  xAxes: [{
                      type: 'realtime',
                      realtime: {
                          duration: 20000,
                          refresh: 2000,
                          onRefresh: function(chart) {
                            chart.data.datasets[0].data.push({
                              x: Date.now(),
                              y: currentValue
                            });
                            var statusUrl = window.location.href.split("/");
                            if (statusUrl[statusUrl.length-2] == "view") {
                                document.getElementById("currValue").textContent = currentValue;
                            };
                          },
                          delay: 5000
                      }
                  }],
                  yAexes: [{
                      scaleLabel: {
                          display: true,
                          labelString: 'value'
                      }
                  }]
              },
              tooltips: {
                  mode: 'nearest',
                  intersect: false
              },
              hover: {
                  mode: 'nearest',
                  intersect: false
              }
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const buy = {
            'kundid': localStorage.getItem('user'),
            'object': this.state.title,
            'event': "Bought",
            'price': currentValue,
            'quantity': this.state.quantity
        }

        if ((this.state.quantity * currentValue) > this.state.userdepot) {
            alert("Du behöver logga in alterantivt öka ditt saldo för att handla.");
            this.props.history.push("/mypage");
        } else {
            fetch(tradingApi, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify(buy)
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.errors) {
                    alert("Du måste vara inloggad för att handla");
                    this.props.history.push("/login")
                } else {
                    alert("Köp genomfört");
                    window.location.reload(false);
                };
            });

            const purchase = {
                'cost': this.state.quantity * currentValue,
                'id': localStorage.getItem('user')
            }

            fetch(userApi, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(purchase)
            })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                if (data.errors) {
                    console.log(data.errors);
                    this.routeChange();
                }
            })
        }
        // this.routeChange();
    }

    onSellSubmit = (e) => {
        // var tradingApi = 'https://project.mh-jsramverk.me/tradings/';
        var sellApi = 'https://project.mh-jsramverk.me/tradings/' + localStorage.getItem('user');
        // var userApi = 'https://project.mh-jsramverk.me/users/';

        e.preventDefault();

        const sell = {
            'deposit': this.state.userStock * currentValue,
            'id': localStorage.getItem('user')
        }

        const updateTradeRow = {
            'id': localStorage.getItem('user'),
            'object': this.state.title,
            'price': currentValue,
            'sold': "Sold"
        }

        fetch(userApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(sell)
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            if (data.errors) {
                console.log(data.errors)
            } else {
                console.log("userdepot updated");
            }
        })

        fetch(sellApi, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(updateTradeRow)
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            if (data.errors) {
                console.log(data.errors)
                this.routeChange();
            } else {
                alert("Försäljning genomförd");
                window.location.reload(false);
            }
        })
    }

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    routeChange() {
        let path = "/login";
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="App">
            <h2>Poster: {this.state.title}</h2>
            <article className="article-standard">
            <p>Utgångspris: {this.state.price} kr.</p>
            <p>Aktuellt pris SEK (uppdateras var femte sekund):</p> <p id="currValue" style={{color: "green", fontSize: "24px"}}>{currentValue}</p>
            <div className="canvas-wrapper"><canvas id="myChart"></canvas></div>
            <br/>
            <form onSubmit={this.onSubmit} style={{borderRadius: "20px", backgroundColor: "white", width: "60%", margin: "auto", padding: "10px"}}>
            <h3>Köp</h3>
                <p>Antal:</p>
                <input type='number' name='quantity' required onChange={this.handleInputChange}/>
                <br/><br/>
                <input className='button' type='submit' value='KÖP'/>
                <br/><br/>
                </form><br/><br/>
            <form onSubmit={this.onSellSubmit} style={{borderRadius: "20px", backgroundColor: "white", width: "60%", margin: "auto", padding: "10px"}}>
                <h3>Sälj</h3>
            <p>Du äger <b>{this.state.userStock} st</b> av denna poster.</p>
            <input className='button' type='submit' value='SÄLJ AV DESSA'/>
            <br/><br/>
            </form>
            </article>
            </div>
        )
    }
}


export default View;
