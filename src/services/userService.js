import axios from '../axios';

const handleLoginApi = (userEmail, userPassword)=>{
     return axios.post('/api/login', {email: userEmail, password: userPassword});
}

export const getAllUsers = (inputId) =>{
     return axios.get(`/api/get-all-users?id=${inputId}`);
}
export const createNewUserService = (data) =>{
     return axios.post('/api/create-new-user', data);
}
export const deleteUserService = (userId) =>{
     return axios.delete('/api/delete-new-user', {
          data:{
               id: userId
          }
     });
}
export const editUserService = (inputData) =>{
     return axios.put('/api/edit-new-user', inputData);
}
export const getAllCodeService = (inputType) =>{
     return axios.get(`/api/allcode?type=${inputType}`);
}
export default handleLoginApi; 
 