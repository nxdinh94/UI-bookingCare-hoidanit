import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import './TableManageUser.scss';
class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux:[],
        }
    }
    componentDidMount(){
        this.props.fetchAllUsersRedux();
    }
    componentDidUpdate(prevProps, prevState ){
        
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    } 
    handleDeleteUser = (user) =>{
        this.props.deleteUsersRedux(user.id);
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserFromParentKey(user);
    }
    
/** Life cycle 
 * Run component -> init state
 * Did mount (set state)
 * Render
 * 
 */
     render() {
        let arrUsers = this.state.usersRedux;
         return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Email</th> 
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {
                        arrUsers && arrUsers.length> 0 &&
                        arrUsers.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                <button 
                                    onClick={() =>this.handleEditUser(item)}
                                    className='btn-edit'>
                                        <i className='fas fa-pencil-alt'></i>
                                    </button>
                                    <button 
                                        onClick={() =>this.handleDeleteUser(item)}
                                        className='btn-delete'>
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersRedux:()=>dispatch(actions.fetchAllUsersStart()),
        deleteUsersRedux:(id)=>dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
