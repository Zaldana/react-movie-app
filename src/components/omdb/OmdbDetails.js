import PropTypes from "prop-types"

function OmdbDetails(props) {

    return (
        <div>
            <div style={styles.display}>
                {props.movieDetailsArray.map((item) => (
                        <div key={item.data.imdbID} style={styles.row}>
                        <img src={item.data.Poster} style={styles.poster} alt="poster" />
                            <p>{item.data.Title} <b>Rating:</b> {item.data.imdbRating}</p>
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
        color: "white"
    },
    row: {
        display: "flex",
        flexDirection: "column",
        width: "15%",
        padding: 50
    },
    poster: {
        boxShadow: "0px 0px 5px white",
    }
}

OmdbDetails.propTypes = {
    movieDetailsArray: PropTypes.array.isRequired,
};

export default OmdbDetails
