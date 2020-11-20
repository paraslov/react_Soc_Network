import classes from './Dialogs.module.css'

const Dialogs = (props) => {
	return (
		<div className={classes.dialogs}>
			<div className={classes.dialog__items}>
				<div className={`${classes.item} ${classes.active}`}>
					Rezvych
				</div>
				<div className={classes.item}>
					Rizvanych
				</div>
				<div className={classes.item}>
					Rezvyi
				</div>
				<div className={classes.item}>
					TRezvych
				</div>
				<div className={classes.item}>
					Rizvandos
				</div>
				<div className={classes.item}>
					Rizvan Rizvaych
				</div>
			</div>
			<div className={classes.messages}>
				<div className={classes.messages__item}>
					Hi!
				</div>
				<div className={classes.messages__item}>
					Hiow are ya, bro?!
				</div>
				<div className={classes.messages__item}>
					Is that legal?!
				</div>
			</div>
		</div>
	)
}

export default Dialogs;