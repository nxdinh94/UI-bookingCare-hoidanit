import React, { Component } from 'react';
import { connect } from 'react-redux';

import  './UserManager.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModelEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelUser: false,
            isOpenModelEditUser: false,
            userEdit: {},   
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async() =>{
        let response =await getAllUsers('ALL');
            // console.log('response', response)
            if(response && response.errCode === 0 ){
                // console.log(true)
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
    toggleUserEditModal = () =>{
         this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        })
    }
    createNewUser = async(data) => {
        try {
            let response= await createNewUserService(data);
            if(response && response.errCode !== 0){
                
            }else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModelUser: !this.state.isOpenModelUser
                })
                emitter.emit("EVENT_MODAL_DATA");
            }
        } catch (error) {
            console.error(error);
        }
    }
    handleDeleteUser = async(user) =>{
        try {
            let response = await deleteUserService(user.id);
            if(response && response.errCode !== 0){
                
            }else {
                await this.getAllUsersFromReact();
            }
        } catch (error) {
            console.error(error);
        }
    }
    handleEditUser = (user) =>{
        // console.log(user);
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async(user)=>{

        let response = await editUserService(user);
        if(response && response.errCode !== 0){
                
        }else {
            await this.getAllUsersFromReact();
        }
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
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModelEditUser && 
                <ModalEditUser 
                    isOpen={this.state.isOpenModelEditUser}
                    toggle={this.toggleUserEditModal}
                    currentUser= {this.state.userEdit}
                    editUser = {this.doEditUser}
                />}
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
                        <tbody>
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
                                        <button 
                                            className='btn-edit' 
                                            onClick={()=>this.handleEditUser(item)}
                                            ><i className='fas fa-pencil-alt'></i></button>
                                        <button 
                                            className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                            ><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
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
