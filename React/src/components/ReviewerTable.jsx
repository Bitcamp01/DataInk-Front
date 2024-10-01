import React from 'react';

const ReviewerTable = () => {
    return (
        <div className="review-table-container">
            <table className="review-table">
                {[...Array(24)].map((_, index) => (
                    <tr key={index}>
                        <td className="review-row-item">Row name <span></span></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ReviewerTable;
