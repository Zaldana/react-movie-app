import React, { Component } from 'react'
import axios from "axios";
import OmdbDetails from './OmdbDetails';
import Loading from "../common/Loading";
// import OmdbDetails from "./OmdbDetails";

export class Omdb extends Component {

    state = {
        moviesArray: [],
        searchResult: "",
        movieDetailsArray: [],
        id: [],
        isError: false,
        errorMessage: "",
        isLoading: false,

    };


        
    initialSearch() {
        
        const initialSearchArray = ["superman", "lord of the rings", "batman", "pokemon", "harry potter", "star wars", "avengers", "terminator"]
        
        const randomMovie = Math.floor(Math.random() * initialSearchArray.length);
        
        return initialSearchArray[randomMovie];

    }
    
    async componentDidMount() {
        this.fetchMovieApi(this.initialSearch());
    }

    fetchMovieApi = async (searchResult) => {

        //setting the state loading is true before api get
        this.setState({
            isLoading: true,
        });

        //api GET passing 'search' parameter at the end of the url
        try {
            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `http://www.omdbapi.com/?s=${searchResult}&type=movie&apikey=${API_KEY}`
            );

            console.log(result);

            if (result.data.Error) {

                throw result.data.Error


            } else {
                let idArray = result.data.Search.map(({ imdbID }) => (imdbID))

                let movieDetails = []

                for (let i = 0; i < 8; i++) {
                    movieDetails.push(await axios.get(
                        `http://www.omdbapi.com/?i=${idArray[i]}&type=movie&apikey=${API_KEY}`
                    ))
                }
     
                this.setState({
                    moviesArray: result.data.Search,
                    id: idArray,
                    movieDetailsArray: movieDetails,
                    isError: false,
                    errorMessage: "",
                    isLoading: false,
                })
            }

        //Error catch with'e.response' to get full error message response in console
        } catch (e) {
            
            if (e === "Incorrect IMDb ID.") {
            
                this.setState({
                    errorMessage: "Please do not leave search field blank",
                    isError: true,
                    isLoading: false
                });
            
            } else {
                
                this.setState({
                    errorMessage: e + " Please try again.",
                    isError: true,
                    isLoading: false
                })

            }
        }
    };

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleOnClick = async () => {
        this.fetchMovieApi(this.state.searchResult);
    };


    render() {
        return (
            <React.Fragment>
                <div style={styles.blackBackground}>
                    <div style={styles.searchDiv}>
                        <input
                            name="searchResult"
                            value={this.state.searchResult}
                            onChange={this.handleOnChange}
                            style={styles.search}
                        />
                        <button style={styles.button} onClick={this.handleOnClick} >Search</button>
                    </div>
                    {this.state.errorMessage &&
                        <div style={styles.padding}>
                            <span style={styles.error}>{this.state.errorMessage}</span>
                        </div>
                    }
                    <div >
                    {this.state.isLoading ? (
                        <div style={styles.loading}>
                            <Loading />
                        </div>
                        ) : (
                        <OmdbDetails
                            movieDetailsArray={this.state.movieDetailsArray}
                        />
                    )}
                    </div>
                </div>
            </React.Fragment>
        )
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
        color: "white",
        height: "100vh",
        paddingTop: "12%",
        fontSize: 100,
        textShadow: "0px 0px 20px Red",
        fontWeight: 900
    },

    blackBackground: {
        background: "radial-gradient(circle, rgba(32,53,62,1) 0%, rgba(0,0,0,1) 100%)",
    },

    searchDiv: {
        background: "linear-gradient(90deg, rgba(10,100,122,1) 0%, rgba(28,38,145,1) 50%, rgba(10,100,122,1) 100%)",
        padding: 30,
    },

    search: {
        height: 30,
        marginRight: "1%",
        width: "50%",
    },
    button: {
        height: 33,
        width: 70,
    }
}

export default Omdb
