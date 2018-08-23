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
        localStorage.setItem("flashMessage", login.data.message)
        localStorage.setItem("token", login.data.token);
        localStorage.setItem("email", login.data.email);
        localStorage.setItem("id", login.data.id);
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
    } 
    catch (error) {
      console.log("this is logout error:", error);
    }
  }
}

export default authServices;