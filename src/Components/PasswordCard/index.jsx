import React from 'react'
import './index.css'

const PasswordCard = (props) => {
    
    const handleDeleteBtnclick = () => props.handleDeletePassword(props.passwordDetails.id);

    return (
        <div className='password-card-container'>
            <div className="password-logo-text-container">
                <div className="password-logo-container">
                    <p>Y</p>
                </div>
                <div className="password-details-container">
                    <p>{props.passwordDetails.websiteName}</p>
                    <p>{props.passwordDetails.username}</p>
                    {props.showPassword ? <p>{props.passwordDetails.password}</p> : <img src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png" alt="stars" />}
                </div>
            </div>
            <div className="delete-button-container">
                <button type='button' className='password-delete-btn' onClick={handleDeleteBtnclick}>
                    <img alt="delete" src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png' />
                </button>
            </div>
        </div>
    )
}

export default PasswordCard