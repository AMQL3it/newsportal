const Divider = () => {
    const style = {
        divider: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
            border: "none",
            borderTop: "1px solid #ccc",
            margin: "10px 0"
        },
        slideBtn: {
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            border: "none",
            outline: "none",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "3px",
            backgroundColor: "var(--header-body-color)"
        }
    }

    return (
        <div style={style.divider}>
            <button style={style.slideBtn}>Previous</button>
            <button style={style.slideBtn}>Next</button>
        </div>
    );
}

export default Divider;