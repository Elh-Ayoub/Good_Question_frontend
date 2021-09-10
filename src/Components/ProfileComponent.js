import React from 'react';
import "../css/profile.css"
import Avatar from './AvatarComponent';
import UpdateUser from './UpdateUserComponent';
import UpdatePassword from './UpdatePasswordComponent';

function ProfileCard(props){
    
    return <div className="profile">
    <div className="profileContainer">
        <Avatar user={props.user}/>
        <div className="forms">
            <UpdateUser user={props.user}/>
            <UpdatePassword user={props.user}/>
        </div>
    </div>
    </div>
}

export default ProfileCard
