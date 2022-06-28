import React, { useState } from 'react';
import './Login.css'
import "../../Trailer/Trailer.css"
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import ForgotPassword from './ForgotPassword/ForgotPassword';

function Login({closeModal}) {
    const [showForgot, setShowForgot] = useState(false)

    const handleCloseModal = () => {
        closeModal()
    }
    
    return (
        <div className="trailer-container container">
            <div className="trailer-content box-login__content">
        <div className="login-wrap">
            <div className="trailer-head__close close-box-login" onClick={handleCloseModal}>
                <i className="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="login-html">
                {!showForgot ? <>
                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
                </>: <label className="tab">FORGOT PASSWORD</label>}
                <input id="tab-3" type="radio" name="tab" className="forgot-password hidden-input"/><label htmlFor="tab-3" className="tab hidden-input"></label>
                <div className="login-form">
                    {/* <form className="sign-in-htm"> */}
                   <LoginForm showForgot={showForgot} setShowForgot={setShowForgot} handleCloseModal={handleCloseModal} />
                   <RegisterForm showForgot={showForgot} setShowForgot={setShowForgot} />
                   <ForgotPassword showForgot={showForgot} setShowForgot={setShowForgot} />
                </div>
            </div>
        </div>
            </div>
        </div>

    );
}

export default Login;