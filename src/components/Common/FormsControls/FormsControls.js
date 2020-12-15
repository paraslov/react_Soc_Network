import classes from './FormsControls.module.css'

export const Textarea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? classes.error : ''}>
            <textarea {...input} {...props} /> <br></br>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={hasError ? classes.error : ''}>
            <input {...input} {...props} /> <br></br>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
} 