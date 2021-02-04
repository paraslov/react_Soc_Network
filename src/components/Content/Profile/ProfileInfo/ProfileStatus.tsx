import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateUserStatus: (newStatus:string)=>void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType>  {

    activeteEditMode = () => {  // arrow syntax "name = () => {}" and .bind not needed - this.activateEditMode
        console.log("this:", this);
        this.setState({editMode: true});
    }

    deactiveteEditMode () {    // method syntax "name () {}" and I need to this.deactivateEditMode.bind(this)
        this.setState({editMode: false});
        this.props.updateUserStatus(this.state.status)
    }

    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    }

    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate (prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status, 
            })
        }
    }

    render () {
            return (
        <div>
            {!this.state.editMode && 
                <div>
                    <span onDoubleClick={this.activeteEditMode} >{this.props.status || 'your status'}</span> 
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input autoFocus = {true} onChange={this.onInputChange} placeholder='print your status'
                    onBlur = {this.deactiveteEditMode.bind(this)} value={this.state.status} />
                </div>
            }
        </div>
    )
}
    }


export default ProfileStatus;