import { FaCalendarCheck, FaUserTie } from "react-icons/fa";
const Meta = ({date, author}) => {
    const style = {
        meta: {
            fontSize: "13px",
            display: "flex",
            gap: "10px",
            opacity: "0.8"
        },
        span: {
            display: "flex",
            alignItems: "center",
            gap: "5px"
        }
    }

    return (
        <div style={style.meta}>
            <span style={style.span}>
                <FaCalendarCheck /> 
                {date}
            </span>
            <span style={style.span}>
                <FaUserTie />
                {author}
            </span>
        </div>
    );
}

export default Meta;