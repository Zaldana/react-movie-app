import React, { Component } from 'react'
import axios from "axios";

export class Omdb extends Component {

    state = {
        title: "",
        poster: "",
        ratingsArray: [],
        search: "",
        initialSearch: "",
        isError: false,
        errorMessage: "",
        isLoading: false,
    };

    async componentDidMount() {
        this.fetchMovieApi(this.state.initialSearch);
    }

    fetchMovieApi = async (search) => {

        //setting the state loading is true before api get
        this.setState({
            isLoading: true,
        });

        //api GET passing 'search' parameter at the end of the url
        try {
            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
            );

            //setting the state with the results of the api 'GET' and error and loading states
            this.setState({
                title: result.data.name,
                picture: result.data.sprites.front_default,
                ratingsArray: result.data.abilities,
                isError: false,
                errorMessage: "",
                isLoading: false,
            });

            //Error catch with'e.response' to get full error message response in console
        } catch (e) {

            console.log(e.response);

            //if 'e.response.status = 404 change state to display error
            if (e && e.response.status === 404) {
                this.setState({
                    isError: true,
                    errorMessage: e.response.data,
                    isLoading: false,
                });
            }
        }
    };

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Omdb
