let account=localStorage.getItem("k")
// console.log(account)
//导航栏
var search=document.getElementsByClassName("search")
var span=search[0].getElementsByTagName("span")
var noneBlock=document.getElementById("none-block")
var item=noneBlock.getElementsByClassName("item")
var getname=document.getElementsByClassName("getname")
var getaccount=document.getElementsByClassName("getaccount")
var getdirection=document.getElementsByClassName("getdirection")
var getperiod=document.getElementsByClassName("getperiodNum")
var getposition=document.getElementsByClassName("getposition")
var getawards=document.getElementsByClassName("getawards")
var getpwd=document.getElementsByClassName("getpwd")
var getexperice=document.getElementsByClassName("getexperice")
var left=document.getElementsByClassName("left")
var leftspan=left[0].getElementsByTagName("span")
var right=document.getElementsByClassName("right")
var modifybtnInfor=document.getElementById("modifybtn")
// 导航栏兼下部分显示与隐藏开始
for(var i=0;i<span.length;i++){
    span[i].setAttribute("index",i)
    span[i].addEventListener("click",function(){
        for(var j=0;j<span.length;j++){
            span[j].style.backgroundColor="transparent"
            span[j].style.color="white"
            item[j].style.display="none"
        }
        this.style.backgroundColor="white"
        this.style.color="#176BB9"
       var index=this.getAttribute("index")
       item[index].style.display="block"
    })
}
// 导航栏兼下部分显示与隐藏结束

// 个人中心开始
// 个人信息
axios({
    url:`http://101.200.73.250:31111/students/getinfo_acc/${account}`,
    method:"get",
}).then((result)=>{
    getname[0].innerHTML=result.data.student_Model.name
    getaccount[0].innerHTML=result.data.student_Model.account
    getdirection[0].innerHTML=result.data.student_Model.department
    getperiod[0].innerHTML=result.data.student_Model.periodNum
    getposition[0].innerHTML=result.data.student_Model.position
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

// 个人中心右侧的显示与隐藏
for(var i=1;i<leftspan.length;i++){
    leftspan[i].setAttribute("index",i)
    leftspan[i].addEventListener("click",function(){
        for(var j=1;j<leftspan.length;j++){
            leftspan[j].style.backgroundColor="transparent"
            leftspan[j].style.color="black"
            right[j-1].style.display="none"
        }
        this.style.backgroundColor="#D9D9D9"
        this.style.color="#15448c"
       var index=this.getAttribute("index")
       right[index-1].style.display="block"
    
    })
}
// 修改个人信息
axios({
    url:`http://101.200.73.250:31111/students/getinfo_acc/${account}`,
    method:"get",
}).then((result)=>{
    setTimeout(()=>{getawards[0].value=result.data.student_Model.awards},100)
    getname[1].value=result.data.student_Model.name
    getaccount[1].value=result.data.student_Model.account
    getdirection[1].value=result.data.student_Model.department
    getperiod[1].value=result.data.student_Model.periodNum
    getposition[1].innerHTML=result.data.student_Model.position
    console.log(result.data.student_Model.awards)
    
    modifybtnInfor.addEventListener("click",function(){
        if(getpwd[0].value==result.data.student_Model.pwd){
            axios({
                url:`http://101.200.73.250:31111/students/${account}`,
                method:"put",
                data:{
                    name:getname[1].value,
                    pwd:getpwd[0].value,
                    account:getaccount[1].value,
                    position:getposition[1].value,
                    periodNum:getperiod[1].value,
                    department:  getdirection[1].value,
                    awards:getawards[0].value
                }
            }).then((result)=>{
                if(result.status===200){
                    alert("修改个人信息成功")
                }
            }).catch((error)=>{console.log(error)})
                
        }else alert("失败！请检查你的密码输入是否正确")
    })
}
).catch((error)=>{
    console.log(error)
})
// 查看个人奖项
axios({
    url:`http://101.200.73.250:31111/students/getinfo_acc/${account}`,
    method:"get",
}).then((result)=>{
    getname[3].innerHTML=result.data.student_Model.name
    getaccount[3].innerHTML=result.data.student_Model.account
    getawards[2].innerHTML=result.data.student_Model.awards
    getexperice[0].innerHTML+=result.data.awardsInfo_Model[0].experience
}).catch((error)=>{
    console.log(error)
})
// 修改个人奖项
var q=0
var t=0
var arrarr = [];
var sum = 0
var modifyinforAwards=document.getElementById("modify-infor-awards")
var pwdd=document.getElementById("passwordvalue")
axios({
        url:`http://101.200.73.250:31111/awardsinfo/${account}`,
        method:"get",
}).then((result)=>{
    getname[4].value=result.data[0].AwardsInfo_model.name
    getaccount[4].value=result.data[0].AwardsInfo_model.account
    // 获取获奖经历的id并存在数组中
    for(let f=0;f<result.data.length;f++){
        let id=result.data[f].id
        arrarr.push(id)
    }
    console.log(arrarr)
    sum = result.data.length;
    let h = getexperice[1].value+result.data[0].AwardsInfo_model.experience
        getexperice[1].value=h;
        modifyinforAwards.addEventListener("click",function(){
            for(let i = 0;i<sum;i++){
            axios({
                url:`http://101.200.73.250:31111/awardsinfo/${arrarr[i]}`,
                method:"put",

                data:{
                    account: getaccount[4].value,
                    name: getname[4].value,
                    experience: getexperice[1].value
                    }
                }).then((result)=>{
                    // 控制只发送一次修改成功的信息
                        if(result.status===200&&i==sum-1){
                            alert("修改个人奖项成功")
                        }
                                }
                ).catch((error)=>{
                    if(i==sum-1)
                {alert("请检查密码输入是否正确")
                console.log("修改个人奖项失败",error)}})
            }
            }
        )
}).catch((error)=>{
    console.log(error,"没有改用户的awards信息")
    modifyinforAwards.addEventListener("click",function(){
        console.log("111")
    axios({
        url:"http://101.200.73.250:31111/awardsinfo/",
        method:"post",
        data:{
            account: getaccount[4].value,
            name: getname[4].value,
            experience: getexperice[1].value
            }
    }).then((result)=>{
        if(result.status===200){
            alert("已经为该用户获奖经历相关信息")
        }}).catch((error)=>{alert("请检查你的密码输入是否正确",error)})
})})
axios({
    url:`http://101.200.73.250:31111/students/getinfo_acc/${account}`,
        method:"get",
}).then((result)=>{console.log(result)}).catch((error)=>{console.log(error)})

// 删除信息
var deletebtn=document.getElementById("deletebtn")
axios({
    url:`http://101.200.73.250:31111/students/getinfo_acc/${account}`,
    method:"get",
}).then((result)=>{   
    getname[2].innerHTML=result.data.student_Model.name
    getaccount[2].innerHTML=result.data.student_Model.account
    getdirection[2].innerHTML=result.data.student_Model.department
    getperiod[1].innerHTML=result.data.student_Model.periodNum
    getposition[2].innerHTML=result.data.student_Model.position
    getawards[1].innerHTML=result.data.student_Model.awards
}).catch((error)=>{
    console.log(error)
})
axios({
    url:`http://101.200.73.250:31111/awardsinfo/${account}`
}).then((result)=>{   
    getawards[1].innerHTML=result.data.awards
    getawards[0].value=result.data.awards
}).catch((error)=>{
    console.log(error)
})
deletebtn.addEventListener("click",function(){
    // student表删除信息
    axios({
        method:"delete",
        url:`http://101.200.73.250:31111/students/${account}`
    }).then((result)=>{   
    if(result.status==200){
        alert("你的信息已经成功删除")
    }
    }).catch((error)=>{
        console.log(error)
    })
    }
)
//研学查询开始
var studysearch=document.getElementsByClassName("study-search")
var studysearchDiv=studysearch[0].getElementsByTagName("div")
for(var i=1;i<studysearchDiv.length;i++){
    studysearchDiv[i].addEventListener("click",function(){
        for(var j=1;j<studysearchDiv.length;j++){
            studysearchDiv[j].style.backgroundColor="transparent"
            studysearchDiv[j].style.color="black"
        }
        this.style.backgroundColor="#D9D9D9"
        this.style.color="#176BB9"
    })
}
// 研学查询结束

// 联系我们开始
var corrleteWithUs=document.getElementsByClassName("corrlete-with-us")
var corrleteWithUsDiv=corrleteWithUs[0].getElementsByTagName("div")
var content=document.getElementsByClassName("content")
var contentDiv=content[0].getElementsByTagName("div")
for(var i=1;i<corrleteWithUsDiv.length;i++){
    corrleteWithUsDiv[i].setAttribute("index",i)        
    corrleteWithUsDiv[i].addEventListener("click",function(){
        for(var j=1;j<corrleteWithUsDiv.length;j++){
            corrleteWithUsDiv[j].style.backgroundColor="transparent"
            corrleteWithUsDiv[j].style.color="black"
            contentDiv[j-1].style.display="none"
        }
        this.style.backgroundColor="#D9D9D9"
        this.style.color="#176BB9"
        var index=this.getAttribute("index")
        contentDiv[index-1].style.display="block"
    })
}
// 联系我们结束