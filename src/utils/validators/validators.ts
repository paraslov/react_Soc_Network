export type FieldValidatorType = (value: string) => string | undefined

export const fieldRequired: FieldValidatorType = (value) => {
    if (value) return undefined;

    return 'Field is required!';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if(value.length < maxLength+1) return undefined;
    return `Max lenght of the post is ${maxLength} symbols!`;
}