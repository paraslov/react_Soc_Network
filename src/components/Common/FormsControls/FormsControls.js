import classes from './FormsControls.module.css'
import { Field } from 'redux-form';

export const Textarea = ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error;
    return (
        <div className={hasError ? classes.error : ''}>
            <textarea {...input} {...props} /> <br></br>
            {hasError && <span>{error}</span>}
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

export const myCreateField = (placeholder, name, component, validators, props = {}, text = '') => {
    return             <div>
    <Field placeholder={placeholder} name={name} component = {component}
    validate={validators} {...props}/> {text}
</div>
}