import classes from './Paginator.module.css'
import { useState } from 'react';


const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(totalUsersCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    console.log(portionCount);

    return (
        <div className={classes.pages}>
            {portionNumber>10 &&
            <button onClick = { () => setPortionNumber(portionNumber-10)}>{'<<'} </button>}

            {portionNumber>1 &&
            <button onClick = { () => setPortionNumber(portionNumber-1)}>{'<'} </button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span
                        className={currentPage === p && classes.selectedPage}
                        onClick={(e) => { onPageChanged(p) }}
                    >{p}</span>
                })}

            {portionCount/10 > portionNumber &&
            <button onClick = { () => setPortionNumber(portionNumber+1)}>{'>'}</button>}
            {portionCount/10 -10 > portionNumber &&
            <button onClick = { () => setPortionNumber(portionNumber+10)}>{'>>'}</button>}
        </div>
    )
}

export default Paginator;