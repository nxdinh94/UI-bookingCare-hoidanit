
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
class ModelEditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            email:'',
            password:'',
            firstName: '',
            lastName:'',
            address:'',
        };
        
    }
    
    componentDidMount() {// a function of react, will run after component mount
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            console.log('dfd')
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }
    toggle = () => {this.props.toggle()}

    handleOnchangeInput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        });
    }
    checkValidate =() =>{
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing params', + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveChanges = () => {
        let isValid = this.checkValidate();
        if(isValid === true){
            this.props.editUser(this.state);

        }
    }
    render() {
        return (
            
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}}  
                className={'modal-user-container'}
                size='lg'
            >

                    <ModalHeader toggle={()=>{this.toggle()}}>Edit New User</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input 
                                    type='email' 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'email')}}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input 
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'password')}}
                                    disabled
                                />
                                    
                            </div>
                            <div className='input-container'>
                                <label>First name</label>
                                <input 
                                    type='text' 
                                    value={this.state.firstName} 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'firstName')}}/>
                            </div>
                            <div className='input-container'>
                                <label>Last name</label>
                                <input 
                                    type='text' 
                                    value={this.state.lastName} 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'lastName')}}/>
                            </div>
                            <div className='input-container'>
                                <label>Address</label>
                                <input 
                                    type='text' 
                                    value={this.state.address} 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'address')}}/>
                            </div>
                        </div>

                        
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' className='px-3' onClick={()=>{this.handleSaveChanges()}}>Save changes</Button>{' '}
                        <Button color='secondary' className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
                    </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);


