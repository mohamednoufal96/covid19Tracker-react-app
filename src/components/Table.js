import React from "react";
import "../styles/Table.css";

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({ country, cases }) => {
                return (
                    <tr>
                        <td> {country} </td>
                        <td>
                            <strong>{cases}</strong> cases
                        </td>
                    </tr>
                );
            })}
        </div>
    );
}

export default Table;
