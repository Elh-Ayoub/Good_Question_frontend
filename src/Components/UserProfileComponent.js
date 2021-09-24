import React, { useState, useEffect } from 'react'
import "../css/profile.css"

function UserProfileCard(props){

    return  <div class="profile">  
                <div class="profileContainer">
                    <div class="profile-picture">
                        <div>
                            <img id="profile-pic" class="user-picture img-center" src={props.user.profile_photo}/>
                            <p className="profile-field">@{props.user.login}</p>
                            <p className="text-center">{props.user.full_name}</p>
                            <p className="text-center">{props.user.email}</p>
                            <hr/>
                            <div className="profile-card-footer">
                                <span>Role: {props.user.role}</span>
                                <span>Rating: {props.user.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

export default UserProfileCard
