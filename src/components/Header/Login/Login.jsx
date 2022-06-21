import React, { useState } from 'react';
import './Login.css'
import "../../Trailer/Trailer.css"

function Login({closeModal}) {
    const [showForgot, setShowForgot] = useState(false)
    return (
        <div className="trailer-container container">
            <div className="trailer-content box-login__content">
        <div className="login-wrap">
                    <div className="trailer-head__close close-box-login" onClick={() => closeModal()}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </div>
            <div className="login-html">
                {!showForgot ? <>
                <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/><label htmlFor="tab-2" className="tab">Sign Up</label>
                </>: <label className="tab">FORGOT PASSWORD</label>}
                <input id="tab-3" type="radio" name="tab" className="forgot-password hidden-input"/><label htmlFor="tab-3" className="tab hidden-input">FORGOT</label>
                <div className="login-form">
                    <form className="sign-in-htm">
                        <div className="group">
                            <label htmlFor="user" className="label">Username</label>
                            <input id="user" type="text" className="input"/>
                        </div>
                        <div className="group">
                            <label htmlFor="pass3" className="label">Password</label>
                            <input id="pass3" type="password" className="input" data-type="password"/>
                        </div>
                        <div className="group">
                            <input id="check" type="checkbox" className="check" defaultChecked/>
                            <input id="tab-3" type="radio" name="tab" className="forgot-password"/>
                            <label htmlFor="tab-3" className="forgot-password-text" onClick={()=>setShowForgot(!showForgot)}>Forgot Password?</label>
                            {/* <label htmlFor="check" className="forgot-password"> Forgot Password?</label> */}
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Sign In"/>
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <span href="#forgot">Forgot Password?</span>
                        </div>
                    </form>
                    
                    <form className="sign-up-htm">
                        <div className="group">
                            <label htmlFor="user" className="label">Username</label>
                            <input id="user" type="text" className="input" />
                        </div>
                        <div className="group">
                            <label htmlFor="pass0" className="label">Password</label>
                            <input id="pass0" type="password" className="input" data-type="password"/>
                        </div>
                        <div className="group">
                            <label htmlFor="pass1" className="label">Repeat Password</label>
                            <input id="pass1" type="password" className="input" data-type="password"/>
                        </div>
                        <div className="group">
                            <label htmlFor="pass2" className="label">Email Address</label>
                            <input id="pass2" type="text" className="input"/>
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Sign Up"/>
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <label htmlFor="tab-1">Already Member?</label>
                        </div>
                    </form>

                    <form className="forgot-password-htm">
                        <div className="group">
                            <label htmlFor="user1" className="label">Username</label>
                            <input id="user1" type="text" className="input" />
                        </div>
                        <div className="group">
                            <label htmlFor="pass1" className="label">Email Address</label>
                            <input id="pass1" type="text" className="input"/>
                        </div>
                        <div className="group">
                            <label htmlFor="pass1" className="label">Email Address</label>
                            <input id="pass1" type="text" className="input"/>
                        </div>
                        <div className="group">
                            <input type="submit" className="button" value="Sign Up"/>
                        </div>
                        <div className="hr"></div>
                        <div className="foot-lnk">
                            <label htmlFor="tab-1" onClick={()=>setShowForgot(!showForgot)}>Login</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
        </div>

    );
}

export default Login;