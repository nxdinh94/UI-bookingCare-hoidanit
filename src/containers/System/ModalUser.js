

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
class ModelUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            firstName: '',
            lastName:'',
            address:'',
            
        };
    }
    componentDidMount() {
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
    handleAddNewUser = () => {
        let isValid = this.checkValidate();
        if(isValid === true){
            this.props.createNewUser(this.state);

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

                    <ModalHeader toggle={()=>{this.toggle()}}>Create New User</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input 
                                    type='email' 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'email')}}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input 
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={(e) =>{this.handleOnchangeInput(e, 'password')}}/>
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
                        <Button color='primary' className='px-3' onClick={()=>{this.handleAddNewUser()}}>Add</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);


