import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginApi } from '../../services';
 
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: '',
            isShowPassword: false,
        }
    }


    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleLogin = async() => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message,
                })
            }else if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                
            }

            
        } catch (error) {
            console.log(error.response);
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage:error.response.data.message, 
                    })
                }
            }
            
            
        }
    }
    handleShowHidePassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }
    render() {
        //JSX



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
                                placeholder='Enter your userName'    
                                value={this.state.username}
                                onChange={(e)=>this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord</label>
                            <div className='custom-input-password'>
                                <input  type={this.state.isShowPassword ? 'text' : 'password'} 
                                        className='form-control'
                                        placeholder='Enter your password'
                                        onChange={(e)=>this.handleOnChangePassword(e)}/>
                                <span
                                    onClick={()=>{this.handleShowHidePassword()}}
                                > <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i></span>
                            </div>
                        </div>


                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button 
                                className='btn btn-primary w-100 px-1'
                                onClick={()=>{this.handleLogin()}}
                                >Login
                            </button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='login-text-other'>Or Login with</span>
                        </div>
                        <div className='col-12 text-center login-social my-2'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-twitter twitter"></i>
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
const mapDispatchToProps = dispatch => {//redux
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
