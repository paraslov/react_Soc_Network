import classes from './ProfileInfo.module.css';
import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
    status: string
    updateUserStatus: (status: string)=> void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) =>  {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status)
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} >{props.status || 'your status'}</span> 
                </div>
            }
            {editMode &&
                <div>
                    <input onChange = {onInputChange} value = {status}
                        autoFocus = {true}  placeholder='print your status'
                        onBlur = {deactivateEditMode} />
                </div>
            }
        </div>
    )
}
    


export default ProfileStatusWithHooks;