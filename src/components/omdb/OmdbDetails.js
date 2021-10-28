import PropTypes from "prop-types"

function OmdbDetails(props) {

    return (
        <div>
            <div style={styles.display}>
                {props.moviesArray.filter((item, index) => index < 8).map(({ Poster, Title, imdbID }) => {
                    return (
                        <div key={imdbID} style={styles.row}>
                            <img src={Poster} alt="poster" />
                            <h3 key={imdbID}>{Title}</h3>
                        </div>
                        )
                    })
                }
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
    }
}

OmdbDetails.propTypes = {
    moviesArray: PropTypes.array.isRequired,
};

export default OmdbDetails
