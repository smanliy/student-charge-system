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
    url:"http://101.200.73.250:31111/students/999",
    method:"get",
}).then((result)=>{
    getname[0].innerHTML=result.data.name
    getaccount[0].innerHTML=result.data.account
    getdirection[0].innerHTML=result.data.department
    getperiod[0].innerHTML=result.data.periodNum
    getposition[0].innerHTML=result.data.position
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
    url:"http://101.200.73.250:31111/students/999",
    method:"get",
}).then((result)=>{
    getname[1].value=result.data.name
    getaccount[1].value=result.data.account
    getdirection[1].value=result.data.department
    getperiod[1].value=result.data.periodNum
    getposition[1].innerHTML=result.data.position
    modifybtnInfor.addEventListener("click",function(){
        if(getpwd[0].value==result.data.pwd){
            axios({
                url:"http://101.200.73.250:31111/students/999",
                method:"put",
                data:{
                    name:getname[1].value,
                    pwd:getpwd[0].value,
                    account:getaccount[1].value,
                    position:getposition[1].innerHTML,
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
    url:"http://101.200.73.250:31111/awardsinfo/999",
    method:"get",
}).then((result)=>{
    getname[3].innerHTML=result.data.name
    getaccount[3].innerHTML=result.data.account
    getawards[2].innerHTML=result.data.awards
    getexperice[0].innerHTML=result.data.experience
}).catch((error)=>{
    console.log(error)
})
// 修改个人奖项
var modifyinforAwards=document.getElementById("modify-infor-awards")
axios({
        url:"http://101.200.73.250:31111/awardsinfo/2023002145",
        method:"get",
}).then((result)=>{
    getname[4].value=result.data.name
    getaccount[4].value=result.data.account
    getawards[3].value=result.data.awards
    getexperice[1].value=result.data.experience
}).catch((error)=>{console.log(error)})
modifyinforAwards.addEventListener("click",function(){
    axios({
        url:"http://101.200.73.250:31111/awardsinfo/2023002145",
        method:"put",
        data:{
            account: getaccount[4].value,
            name: getname[4].value,
            awards: getawards[3].value,
            experience: getexperice[1].value
            }
        }).then((result)=>{
        if(result.status===200){
            alert("修改个人奖项成功")
        }
        else alert("修改失败")
        }).catch((error)=>{console.log(error)})
})
// 删除信息
var deletebtn=document.getElementById("deletebtn")
axios({
    url:"http://101.200.73.250:31111/students/999",
    method:"get",
}).then((result)=>{   
    getname[2].innerHTML=result.data.name
    getaccount[2].innerHTML=result.data.account
    getdirection[2].innerHTML=result.data.department
    getperiod[2].innerHTML=result.data.periodNum
    getposition[2].innerHTML=result.data.position
}).catch((error)=>{
    console.log(error)
})
axios({
    url:"http://101.200.73.250:31111/awardsinfo/999"
}).then((result)=>{   
    getawards[1].innerHTML=result.data.awards
    getawards[0].value=result.data.awards
}).catch((error)=>{
    console.log(error)
})
deletebtn.addEventListener("click",function(){
    axios({
        method:"delete",
        url:"http://101.200.73.250:31111/students/999"
    }).then((result)=>{   
    if(result.status==200){
        alert("你的信息已经成功删除")
    }
    // console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})
// axios({
//     url:"http://101.200.73.250:31111/awardsinfo/",
    
// }).then((result)=>{   
    
//     console.log("获奖信息",result)
// }).catch((error)=>{
//     console.log(error)
// })
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