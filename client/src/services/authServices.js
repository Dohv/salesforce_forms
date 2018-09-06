import axios from 'axios';

const authServices = {
  isAuthenticated: () => {
    const result = localStorage.getItem('token');

   return result !== null && result !== 'undefined';
  },

  logIn: async (email, password) => {
    try {
      let login = await axios.post('/users/signin', {
         email,
         password
       })
       if (login) {
         //console.log(login.data);
        localStorage.setItem("flashMessage", login.data.message)
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("email", login.data.email);
        localStorage.setItem("id", login.data.id);
        localStorage.setItem("sfAccountId", login.data.sfAccountId);
        localStorage.setItem("sfAccountType", login.data.sfAccountType);
        localStorage.setItem("sfAccountProducts", JSON.stringify(login.data.sfAccountProducts));
       } 
    } catch(error) {
      console.log("this is login error:", error);
    }
  },

  logOut: async () => {
    try {
      await axios.post('/users/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem("sfAccountId");
      localStorage.clear();
    } 
    catch (error) {
      console.log("this is logout error:", error);
    }
  }
}

export default authServices;