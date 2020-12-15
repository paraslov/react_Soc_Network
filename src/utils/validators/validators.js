export const fieldRequired = (value) => {
    if (value) return undefined;

    return 'Field is required!';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length < maxLength+1) return undefined;
    return `Max lenght of the post is ${maxLength} symbols!`;
}