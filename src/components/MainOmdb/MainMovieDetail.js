import axios from "axios";
import React, { Component } from "react";
import Loading from "../common/Loading";

export class MainMovieDetail extends Component {
    state = {
        title: "",
        picture: "",
        year: "",
        rated: "",
        runtime: "",
        director: "",
        actors: "",
        plot: "",
        poster:"",
        errorMessage: "",
        isLoading: false,
    };

    async componentDidMount() {
        
        this.setState({
            isLoading: true,
        });
        
        try {

            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `http://www.omdbapi.com/?i=${this.props.match.params.imdbID}&type=movie&apikey=${API_KEY}`
            );

            console.log(result.data);

            this.setState({
                title: result.data.Title,
                year: result.data.Year,
                rated: result.data.Rated,
                runtime: result.data.Runtime,
                director: result.data.Director,
                actors: result.data.Actors,
                plot: result.data.Plot,
                poster: result.data.Poster,
                errorMessage: "",
                isLoading: false,
            });

        } catch (e) {
            
            console.log(e);
        
        }
    }

    render() {
        return (
            <div style={styles.blackBackground}>
                <div >
                    {this.state.isLoading ? (
                        <div style={styles.loading}>
                            <Loading />
                        </div>
                    ) : (
                        <div style={styles.row}>
                            <div style={styles.posterBox}>
                                    <img src={this.state.poster} alt="movie poster" style={styles.poster}/>
                            </div>
                            <div style={styles.textBox}>
                                <h1 style={styles.title}>{this.state.title}</h1>
                                <h4 style={styles.year}>
                                    {this.state.year}  •  {this.state.rated}  •  {this.state.runtime}
                                </h4>
                                <br />
                                <h4 style={styles.year}>{this.state.actors}</h4>
                                <br />    
                                <p style={styles.plot}>{this.state.plot}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const styles = {

    padding: {
        padding: 50,
    },

    error: {
        color: "red",
        fontSize: 30,
        fontWeight: 500,
        textTransform: "uppercase",
        textShadow: "0px 0px 10px Red",
    },

    loading: {
        height: "100vh",
        paddingTop: "12%",
        fontSize: 100,
        textShadow: "0px 0px 20px Red",
        fontWeight: 900
    },

    blackBackground: {
        background: "radial-gradient(circle, rgba(32,53,62,1) 0%, rgba(0,0,0,1) 100%)",
        height: "100vh",
        color: "white",
    },
    row: {
        display: "flex",
        paddingTop: 50
    },
    posterBox: {
        width: "30%",
        padding: "2%"
    },
    poster: {
        width: "85%",
        boxShadow: "1px 1px 30px rgba(0, 0, 0, 0.9)",
    },
    textBox: {
        width: "66% ",
        textAlign: "left",
        paddingTop: "2%",
        paddingRight: "5%"
    },
    title: {
        fontSize: 100,
        fontWeight: 900
    },
    year: {
        fontSize: 30,
        fontWeight: 500
    },
    plot: {
        fontSize: 30,
    }

}

export default MainMovieDetail;