import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pagesNumber = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pagesNumber.push(i);
    }
    return (
        <nav className="pagination-nav">
            <ul className="pagination-container">
                {pagesNumber.map(num =>
                    <li className="pagination-elem"><a onClick={() => paginate(num)} href={`#${num}`}>{num}</a></li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination
