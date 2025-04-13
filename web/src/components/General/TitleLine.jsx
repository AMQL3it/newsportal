const TitleLine = ({ title, children }) => {
    const style = {
        titleLine: {
            padding: "10px",
            border: "1px solid var(--header-body-color)",
            backgroundColor: "#e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        title: {
            color: "var(--header-body-hover-color)",
            fontWeight: "bold"
        }
    }

    return (
        <div style={style.titleLine}>
            <span style={style.title}>{title}</span>
            {children}
        </div>
    );
}

export default TitleLine;