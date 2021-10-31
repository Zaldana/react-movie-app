import PropTypes from "prop-types"
import { Link } from "react-router-dom";

function OmdbDetails(props) {

    return (
        <div>
            <div style={styles.display}>
                {props.movieDetailsArray.map((item) => (
                    <div key={item.data.imdbID} style={styles.row}>
                        <Link to={`/fetch-movie/${item.data.imdbID}`} >
                            <img src={item.data.Poster} style={styles.poster} alt="movie poster" />
                        </Link>
                        <h1 style={styles.title}>{item.data.Title}</h1>
                        <p><b>Rating:</b> {item.data.imdbRating}</p>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

const styles = {

    display: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "white",
        paddingTop: 70
    },
    row: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 460,
        height: 555,
        paddingBottom: "2%"

    },
    poster: {
        boxShadow: "1px 1px 30px rgba(0, 0, 0, 0.9)",
    },
     title: {
        fontSize: 18,
        fontWeight: 700,
        width: "50%"
    },
}

OmdbDetails.propTypes = {
    movieDetailsArray: PropTypes.array.isRequired,
};

export default OmdbDetails
