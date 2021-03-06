import { PostsDataType, ProfileType } from "../../components/Common/Types/types";
import profileReducer from "../profile_reducer"
import { profileActions } from '../profile_reducer';

let state = {
    postsData: [
        { message: 'Hi, wasup broh?', likeCounter: 13, id: 1 },
        { message: "It's my first post, lol", likeCounter: 27, id: 2 },
        { message: "Ulty approved it, maan", likeCounter: 41, id: 3 },
        { message: "Props was succesfully integrated!", likeCounter: 66, id: 4 }
    ] as Array<PostsDataType>,
    profile: null as ProfileType | null,
    status: '' as string,
}

it('new post should be added', () => {
    // 1. start data
    let action = profileActions.addPost('https://www.para-slov.ru');


    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectaitions

    expect(newState.postsData[4].message).toBe('https://www.para-slov.ru');
});

it('likes count should be zero', () => {
    // 1. start data
    let action = profileActions.addPost('https://www.para-slov.ru');


    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectaitions

    expect(newState.postsData[4].likeCounter).toBe(0);
});

it('after deleting messages array should be decremented', () => {
    // 1. start data
    let action = profileActions.deletePost(1);


    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectaitions

    expect(newState.postsData.length).toBe(3);
});