import classes from './ProfileInfo.module.css';
import React, { useEffect, useState } from 'react';


const ProfileStatusWithHooks = (props) =>  {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

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
    const onInputChange = (e) => {
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