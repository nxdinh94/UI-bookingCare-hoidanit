

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
class ModelUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers:[],
            
        };
    }
    componentDidMount() {
    }
    toggle = () => {this.props.toggle()}

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
                                <input type='email'/>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password'/>
                            </div>
                            <div className='input-container'>
                                <label>First name</label>
                                <input type='text'/>
                            </div>
                            <div className='input-container'>
                                <label>Last name</label>
                                <input type='text'/>
                            </div>
                            <div className='input-container'>
                                <label>Address</label>
                                <input type='text'/>
                            </div>
                        </div>

                        
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' className='px-3' onClick={()=>{this.toggle()}}>Save</Button>{' '}
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


