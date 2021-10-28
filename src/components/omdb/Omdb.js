import React, { Component } from 'react'
import axios from "axios";
import OmdbDetails from './OmdbDetails';
// import Loading from "../common/Loading";
// import OmdbDetails from "./OmdbDetails";

export class Omdb extends Component {

    state = {
        moviesArray: [],
        ratingsArray: [],
        searchResult: "",
        // isError: false,
        // errorMessage: "",
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
                `http://www.omdbapi.com/?s=${searchResult}&apikey=${API_KEY}`
            );
            
            console.log("result", result);
         
            this.setState({
                moviesArray: result.data.Search,
                isError: false,
                errorMessage: "",
                isLoading: false,
            });

            //Error catch with'e.response' to get full error message response in console
        } catch (e) {
            
            // console.log(e.response);

            // if 'e.response.status = 404 change state to display error
            // if (e && e.response.status === 404) {
            //     this.setState({
            //         isError: true,
            //         errorMessage: e.response.data,
            //         isLoading: false,
            //     });
            // }
        }
    };

    fetchMovieRating = async (imdbID) => {

        const API_KEY = process.env.REACT_APP_OMDB_API_KEY;


        try {

            let result = await axios.get(
                `http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
            );

            console.log("rating", result.data.imdbRating);
            // return result.data.imdbRating
        
        } catch (e) {
            
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleOnClick = async () => {
        this.fetchMovieApi(this.state.searchResult);
        console.log("state", this.state);
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
                    <OmdbDetails
                        moviesArray={this.state.moviesArray}
                    />
                
            </div>
            </React.Fragment>
        )
    }
}

const styles = {

    blackBackground: {
        background: "radial-gradient(circle, rgba(32,53,62,1) 0%, rgba(0,0,0,1) 100%)"
    },

    searchDiv: {
        background: "linear-gradient(90deg, rgba(10,100,122,1) 0%, rgba(28,38,145,1) 50%, rgba(10,100,122,1) 100%)",
        padding: 30
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
