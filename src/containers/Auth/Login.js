import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName</label>
                            <input 
                                type='text' 
                                className='form-control'
                                placeholder='Enter your email'    
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord</label>
                            <input  type='password' 
                                    className='form-control'
                                    placeholder='Enter your password'
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary w-100 px-1'>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='login-text-other'>Or Login with</span>
                        </div>
                        <div className='col-12 text-center login-social my-2'>
                            <i class="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                            <i class="fab fa-twitter twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//Redux
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};
//Redux
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
