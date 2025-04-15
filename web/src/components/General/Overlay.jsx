const Overlay = ({ children }) => {
    const style = {
        overlay: {
            position: "absolute",
            bottom: "0",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
            padding: "15px",
            width: "calc(100% - 10px)"
        }
    }
    return (
        <div style={style.overlay}>{children}</div>
    );
};

export default Overlay;