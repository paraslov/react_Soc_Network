import classes from './FormsControls.module.css'
import { Field, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta: { touched, error }, ...props }) => {

    const hasError = touched && error;
    return (
        <div className= { hasError? classes.error : ''} >
        <textarea { ...input } {...props } /> <br></br >
            { hasError && <span>{ error } </span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className= { hasError? classes.error : ''} >
        <input { ...input } {...props } /> <br></br >
            { hasError && <span>{ meta.error } </span>}
        </div>
    )
}

export function myCreateField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    component: string | React.Component | React.FC<WrappedFieldProps>,
    validators: Array<FieldValidatorType>,
    props = {},
    text = '') {
    return <div>
        <Field placeholder={ placeholder } name = { name } component = { component }
    validate = { validators } {...props } /> {text}
        </div>
}