document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".search-system-item");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      // 移除其他元素的active类
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });
      //  给被点击的元素添加active类
      this.classList.add("active");
    });
  });
});
let input1 = document.getElementsByTagName("input")[0];
let input2 = document.getElementsByTagName("input")[1];
let input3 = document.getElementsByTagName("input")[2];
let input4 = document.getElementsByTagName("input")[3];
let input5 = document.getElementsByTagName("input")[4];
let input6 = document.getElementsByTagName("input")[5];
let input7 = document.getElementsByTagName("input")[6];
let button1 = document.getElementById('btn1');
let button2 = document.getElementsByTagName('button')[1];
input1.onclick = function () {
    if (input1.value =='请输入学生账号') {
    input1.value = "";
};
}
input2.onclick = function () {
    if (input2.value == '请输入姓名') {
    input2.value = "";
}
}
input3.onclick = function () {
    if (input3.value == '请输入学生期数') {
    input3.value = '';
}
}
input4.onclick = function () {
    if (input4.value == '请输入方向') {
    input4.value = "";
}
}
input5.onclick = function () {
    if (input5.value == '请输入职位') {
    input5.value = "";
}
}
input6.onclick = function () {
    if (input6.value == '请输入获奖名称') {
    input6.value = "";
}
}
input7.onclick = function () {
    if (input7.value == '请输入密码') {
        input7.value = "";
        input7.type = "password";
}
}
button1.onclick = () => {
    if (button1.innerHTML == '显示密码') {
        input7.type = "text";
        button1.innerHTML = '隐藏密码';
    }
   else if (button1.innerHTML == '隐藏密码') {
        input7.type = "password";
        button1.innerHTML = '显示密码';
    }
    
}

button2.onclick = function () {
    const data = {
    name: input2.value,
    position: input5.value,
    award: input6.value,
    account: input1.value,
        pwd: input7.value,
        periodNum: input3.value,
    department:input4.value
    
    }
    console.log(data);
    axios.post("http://101.200.73.250:31111/students/",data)
    .then(function (response) {
        // 处理成功情况
        
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .finally(function () {
      // 总是会执行
    });


}






