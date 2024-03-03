//search颜色改变函数
document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".search-system-item");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      // 移除其他元素的active类
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });
      // 给被点击的元素添加active类
      this.classList.add("active");
    });
  });
});
//kind颜色改变函数
document.addEventListener("DOMContentLoaded", function () {
  var kinds = document.querySelectorAll(".kind");
  kinds.forEach(function (kind) {
    kind.addEventListener("click", function () {
      kinds.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
//将后台数据渲染至前台函数
function creatStudents(students, containerId) {
  // 获取容器
  const container = document.getElementById(containerId);
  // 清空容器内容
  container.innerHTML = "";
  // console.log(typeof students);
  // console.log(Array.isArray(students));
  // 遍历数组并创建盒子
  students.forEach((student, index) => {
    const dataBox = document.createElement("div");
    dataBox.classList.add("stu-data");
    // dataBox.style.maxHeight = "0"; //初始状态

    // 名字name
    const nameText = document.createElement("p");
    nameText.style.marginLeft = "12px";
    nameText.textContent = `${student.student_Model.name}`;
    dataBox.appendChild(nameText);

    // 期数periodNum
    const periodNumText = document.createElement("p");
    periodNumText.textContent = `${student.student_Model.periodNum}`;
    dataBox.appendChild(periodNumText);

    // 方向department
    const departmentText = document.createElement("p");
    departmentText.textContent = `${student.student_Model.department}`;
    dataBox.appendChild(departmentText);
    //  margin-right: ;
    //margin-left: ;
    //在awards中封装函数

    // 获奖经历awards   experience
    const awardsText = document.createElement("p");
    awardsText.style.flexGrow = "2268";
    awardsText.textContent = `${student.student_Model.awards}`;
    dataBox.appendChild(awardsText);

    //添加展开盒子的按钮
    const studatabutton = document.createElement("div");
    studatabutton.classList.add("stu-data-button");
    studatabutton.addEventListener("click", () => {
      dataBox.classList.toggle("expend");
    });
    dataBox.appendChild(studatabutton);

    // 职位position
    const positionText = document.createElement("p");
    positionText.style.marginRight = "12px";
    positionText.textContent = `${student.student_Model.position}`;
    dataBox.appendChild(positionText);

    // 将数据盒子添加到容器中
    container.appendChild(dataBox);
  });
}
// axios
//   .get("http://101.200.73.250:31111/students/getinfo_all/")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//全部学生函数
function getAllStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      console.log(response.data);
      console.log(response.data.AwardsInfo_model);
      creatStudents(response.data, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//提前调用防止页面无内容
getAllStudent();
//调用用全部学生
const allstudent = document.getElementById("all-kind");
allstudent.addEventListener(`click`, function () {
  getAllStudent();
});
//全栈学生函数FullStack
function getFullStackStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const fullStackStudents = response.data.filter(
        (student) => student.student_Model.department === "全栈"
      );
      console.log(fullStackStudents);
      creatStudents(fullStackStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用全栈学生
const FullStackstudent = document.getElementById("kind-FullStack");
FullStackstudent.addEventListener(`click`, function () {
  getFullStackStudent();
});
//数据科学学生函数 Datascientist
function getDatascientistStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const DatascientistStudents = response.data.filter(
        (student) => student.student_Model.department === "数据科学"
      );
      console.log(DatascientistStudents);
      creatStudents(DatascientistStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用数据科学学生
const Datascientiststudent = document.getElementById("kind-Datascientist");
Datascientiststudent.addEventListener(`click`, function () {
  getDatascientistStudent();
});
//Java学生函数 Java
function JavaStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const JavaStudents = response.data.filter(
        (student) => student.student_Model.department === "JAVA"
      );
      console.log(JavaStudents);
      creatStudents(JavaStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用Java学学生
const Javatudent = document.getElementById("kind-Java");
Javatudent.addEventListener(`click`, function () {
  JavaStudent();
});
//CPUOS学生函数
function CPUOSStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const CPUOSStudents = response.data.filter(
        (student) => student.student_Model.department === "CPU&OS"
      );
      console.log(CPUOSStudents);
      creatStudents(CPUOSStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用CPUOS学学生
const CPUOSStudents = document.getElementById("kind-CPUOS");
CPUOSStudents.addEventListener(`click`, function () {
  CPUOSStudent();
});
//devise学生函数
function deviseStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const deviseStudents = response.data.filter(
        (student) => student.student_Model.department === "设计"
      );
      console.log(deviseStudents);
      creatStudents(deviseStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用devise学学生
const deviseStudents = document.getElementById("kind-devise");
deviseStudents.addEventListener(`click`, function () {
  deviseStudent();
});
//devise学生函数  secretary
function secretaryStudent() {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const secretaryStudents = response.data.filter(
        (student) => student.student_Model.department === "秘书处"
      );
      console.log(secretaryStudents);
      creatStudents(secretaryStudents, "stu-ctr");
    })
    .catch((err) => {
      console.log(err);
    });
}
//调用devise学学生
const secretaryStudents = document.getElementById("kind-secretary");
secretaryStudents.addEventListener(`click`, function () {
  secretaryStudent();
});
//等待dom加载完毕之后获得元素
document.addEventListener("DOMContentLoaded", function () {
  var searchimg = document.getElementById("search-img");
  var studentNameInput = document.getElementById("kind-search-input");
  searchimg.addEventListener("click", function () {
    studentname = studentNameInput.value;
    searchstudet(studentname);
  });
});
//查询学生函数
function searchstudet(studentname) {
  axios
    .get("http://101.200.73.250:31111/students/getinfo_all/")
    .then((response) => {
      const getsearchstuden = response.data.filter(
        (student) => student.student_Model.name === studentname
      );
      if (getsearchstuden.length > 0) {
        console.log(getsearchstuden);
        creatStudents(getsearchstuden, "stu-ctr");
      } else {
        //为找到
        alert("没有找到名为" + studentname + "的学生。");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
