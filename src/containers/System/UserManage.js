import React, { Component } from 'react';
import { connect } from 'react-redux';

import  './UserManager.scss';
import { getAllUsers } from '../../services/userService'
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
        }
    }

    async componentDidMount() {

        let response =await getAllUsers('ALL');
        console.log('response', response)
        if(response && response.errCode === 0 ){
            console.log(true)
            this.setState({
                arrUsers: response.users
            });
        }
    }

    handleAddNewUser() {
        this.setState({
            isOpenModelUser:!this.state.isOpenModelUser,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModelUser: !this.state.isOpenModelUser
        })
    }
/** Life cycle 
 * Run component -> init state
 * Did mount (set state)
 * Render
 * 
 */
     render() {
        let arrUsers = this.state.arrUsers;
        
        return (
            <div className="users-container">
                <ModalUser 
                    isOpen={this.state.isOpenModelUser}
                    toggle={this.toggleUserModal}
                />
                <div className = "title text-center">Manager with me</div>
                <div className='m-1'>
                    <button className='btn btn-primary px-2'
                        onClick={()=>this.handleAddNewUser()}
                    >
                        Add new user
                        <i className="fas fa-plus ms-3"></i>
                    </button>
                </div>
                <div className='users-table'>
                    <table id="customers">
                        <tr>
                            <th>Email</th> 
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) =>{
                            return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                    <button className='btn-delete'><i className='fas fa-trash'></i></button>
                                </td>
                            </tr>)
                        })}

                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
