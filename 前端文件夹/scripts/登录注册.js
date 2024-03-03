function check() {
  // 获取输入信息
  let account = document.getElementById("account").value;
  let password = document.getElementById("password").value;
  let msg;
  axios.get('http://101.200.73.250:31111/students/getinfo_all/')
    .then(function (response) {
      // 处理成功情况
      //将获取的所有用户信息放在变量msg里
      msg = response.data;
      console.log(msg);
      //判断用户是否存在
      let x = true;
      for (let j = 0; j < msg.length; j++){
        if (msg[j].student_Model.account == account) {
          x = false;
        }
      }
      if (x) {
        alert("用户不存在");
      }
      else {
        //用户存在，判断输入的账户密码是否正确
      let t = true;
      let user;
      for (let i = 0; i < msg.length; i++){
        if (msg[i].student_Model.account == account && msg[i].student_Model.pwd == password) {
          t = false;
          user = msg[i].student_Model.account;
          break;
      }
      }
      if (t) {
        alert("密码错误，请重新输入");
      }
      else {
        console.log("成功");
        // 将账户存进i内
        localStorage.setItem('i', user)
        // let i=localStorage.getItem("i")
        // console.log(i)
      }
      }
      
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .finally(function () {
      // 总是会执行
    });
} 