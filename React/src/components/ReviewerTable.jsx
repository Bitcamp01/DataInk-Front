import React from 'react';

const ReviewerTable = () => {
    return (
        <div className="table-container">
            <table className="table">
                {[...Array(12)].map((_, index) => (
                    <tr key={index}>
                        <td className="row-item">Row name <span></span></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ReviewerTable;
