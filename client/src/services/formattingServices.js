const formattingServices = {

  dateFormat: (string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let formatedDate = [];
    
    if(string.indexOf(',') !== -1) {
        const splitStr = string.split(' ');
        //console.log(splitStr);
        const monthNumber = months.indexOf(splitStr[1].slice(0, -1)) + 1;
        formatedDate.push(splitStr[2])
        formatedDate.push('-');
        monthNumber < 10 ? formatedDate.push(`0${monthNumber}`) : formatedDate.push(monthNumber);
        formatedDate.push('-');
        formatedDate.push(splitStr[0]);
        let result = formatedDate.join('');

        return result;
    }

    return this.state.target_go_live_date;
  },

  phoneNumberFormat: (s) => {
      if(s.length >= 9) {
          var s2 = (""+s).replace(/\D/g, '');
          var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
          return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
      }

      return this.state.phone_number;
  }
}

export default formattingServices;