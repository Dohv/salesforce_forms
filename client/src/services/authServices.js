import axios from 'axios';

const authServices = {

  isAuthenticated: () => {
    const result = localStorage.getItem('token');

   return result !== null && result !== 'undefined';
  },

  logIn: async (email, password) => {
    //console.log({email, password});
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
        localStorage.setItem('userAccountId', login.data.sfAccountId);
        localStorage.setItem('userAccountName', login.data.sfAccountName);
        localStorage.setItem("userAccountProducts", JSON.stringify(login.data.sfAccountProducts));
        localStorage.setItem("sfAccountName", login.data.sfAccountName);
        localStorage.setItem("sfAccountId", login.data.sfAccountId);
        localStorage.setItem("sfAccountType", login.data.sfAccountType);
        localStorage.setItem("sfContactName", login.data.sfContactName);
        localStorage.setItem("lockboxes", JSON.stringify(login.data.lockboxes));
       }
        
    } catch(error) {
      console.log("this is login error:", error);
    }
  },

  logOut: async (id) => {
    try {
      await axios.post('/users/logout',{ id });
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