import styles from "./Table.module.css"; // যদি styles ইউজ করো
import React, { Children } from "react";

const Table = ({ theadInfo, children }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {theadInfo.map((head, index) => (
                        <th key={index}>{head}</th>
                    ))}
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {displayedtags.length > 0 ? (
                    displayedtags.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.description}</td>
                            <td>{row.response}</td>
                            <td>
                                <button className={styles.viewBtn} onClick={() => tabMethods.onView(row.id)}>
                                <i className="fa fa-eye" title="View"></i>
                                </button>
                                <button className={styles.editBtn} onClick={() => tabMethods.onEdit(row.id)}>
                                <i className="fa fa-edit" title="Edit"></i>
                                </button>
                                <button className={styles.deleteBtn} onClick={() => tabMethods.onDelete(row.id)}>
                                <i className="fa fa-trash" title="Delete"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={theadInfo.length} style={{ textAlign: "center" }}>
                            No data found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
