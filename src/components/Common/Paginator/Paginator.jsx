import classes from './Paginator.module.css'


const Paginator = ({totalUsersCount, pageSize, currentPage,  onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.pages}>
        {pages.map(p => {
            return <span
                className={currentPage === p && classes.selectedPage}
                onClick={(e) => { onPageChanged(p) }}
            >{p}</span>
        })}
    </div>
    )
}

export default Paginator;