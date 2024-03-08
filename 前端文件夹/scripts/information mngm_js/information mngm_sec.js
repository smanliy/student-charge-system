window.onload =function (){
    var fanhui=document.getElementById("fanhui")
    fanhui.addEventListener("click",function(){
      window.location.href="http://101.200.73.250/direction_number.html"
    })
  }


//交互部分
let datas = '';
            //获取数据
            async function data() {
                window.shujv =
                    await axios({
                        url: "http://101.200.73.250:31111/students/getinfo_all/",
                        method: "get",

                    }).then((result) => {
                        datas = result;
                        

                    }).catch((error) => {
                        console.log(error)
                    })
            }
            data();

            // 由于异步函数，要延时返回数组
            setTimeout(function(){
                console.log(datas.data); 
                
                //将个人信息中的方向单独放到一个数组中
                let dpt = [];
                for(a = 0;a<datas.data.length;a++){
                dpt.push(datas.data[a].student_Model.department);               
                }
                console.log(dpt);

                //将秘书处方向分出
                let quanzhan = [];
                for (b = 0; b < dpt.length; b++){
                    if (dpt[b] == '秘书处') {
                        quanzhan.push(datas.data[b])
                    }
                }
                console.log(quanzhan);
                
                //根据数据动态创造信息框

                var info = document.querySelector('.info');
                // 为每个数据项创建一个新的div元素作为box
                for (var m = 0; m < quanzhan.length; m++) {
                    console.log(quanzhan.length);
                    // 创建一个新的box元素
                    var box = document.createElement('div');
                    box.className = 'box';


                    // 将box添加到info中
                    info.appendChild(box);

                    // 创建photo元素
                    var photo = document.createElement('div');
                    photo.className = 'photo';
                    // photo.src = datas[m].photoUrl; // 假设每个数据对象都有一个photoUrl属性
                    box.appendChild(photo);

                    // 创建name元素并设置文本内容
                    var ming = document.createElement('div');
                    ming.className = 'name';
                    ming.textContent = quanzhan[m].student_Model.name;
                    // 假设每个数据对象都有一个name属性

                    // 创建intro元素并设置文本内容
                    var intro = document.createElement('p');
                    intro.className = 'intro';
                    // intro.textContent = datas[m].introduction; // 假设每个数据对象都有一个introduction属性

                    // 创建msg元素并设置文本内容
                    var msg = document.createElement('p');
                    msg.className = 'msg';
                    // 假设每个数据对象都有一个message属性

                    // 创建按钮元素并设置文本内容
                    var btn = document.createElement('label');
                    btn.className = 'button';
                    btn.textContent = '查看详情';
                    btn.id = m;



                    // 将创建的元素添加到box中

                    box.appendChild(ming);
                    box.appendChild(intro);

                    //添加具体信息
                    for (var n = 0; n < 4; n++) {
                        var clonedBox = msg.cloneNode(true);
                        intro.appendChild(clonedBox);
                        if (n == 0) {
                            clonedBox.textContent = `期数：${quanzhan[m].student_Model.periodNum}`;
                        }
                        else if (n == 1) {
                            clonedBox.textContent = `方向：${quanzhan[m].student_Model.department}`;
                        }
                        else if (n == 2) {
                            clonedBox.textContent = `职位：${quanzhan[m].student_Model.position}`;
                        }
                        else if (n == 3) {
                            clonedBox.textContent = `获奖经历：${quanzhan[m].student_Model.awards}`;
                        }
                    }


                    box.appendChild(btn);

                }

                //点击左上角按钮实现信息框中按钮的改变
            var shan = document.getElementById('delete');
            var buttons = document.getElementsByClassName('button');
            var flag = 0;
            shan.onclick = function () {
                if (flag == 0) {
                    shan.innerHTML = '查看信息';
                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].innerHTML = '删除信息';
                    }

                    flag = 1;
                } else {
                    shan.innerHTML = '批量删除';
                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].innerHTML = '查看详情';
                    }
                    flag = 0;
                }
            }

            

                
            
                //根据信息框中按钮的不同触发不同display状态
                var check = "查看详情";
                var dele = "删除信息"
                var information = document.querySelector('.information');
                var verify = document.querySelector('.verify')
                var msg1 = document.getElementsByClassName('msg1');
                var name1 = document.getElementsByClassName('name1');

                for (var j = 0; j < buttons.length; j++) {
                        
                        buttons[j].onclick = function () {
                            var button = Array.from(buttons);
                            button.forEach(function (element) {
                                var elementText = element.innerText;
                                let index = event.target.id;
                                console.log(index)
                                if (elementText == check) {
                                    information.style.display = 'block';
                                    
                                    // console.log(index);
                                    console.log(name1);
                                    for (var p = 0; p < 4; p++) {
                                        
                                        if (p == 0) {
                                            msg1[0].textContent = `期数：${quanzhan[index].student_Model.periodNum}`;
                                        }
                                        else if (p == 1) {
                                            msg1[1].textContent = `方向：${quanzhan[index].student_Model.department}`;
                                        }
                                        else if (p == 2) {
                                            msg1[2].textContent = `职位：${quanzhan[index].student_Model.position}`;
                                        }
                                        else if (p == 3) {
                                            msg1[3].textContent = `获奖经历：${quanzhan[index].student_Model.awards}`;
                                        }
                                    }
                                    name1[0].textContent = quanzhan[index].student_Model.name;
                                 

                                } else if (elementText == dele) {
                                    verify.style.display = 'block';

                                    
                                    //在确认框中删除信息
                                    let dele_verify = document.querySelector('.yes');
                                    dele_verify.onclick = function(){
                                        window.acc = quanzhan[index].student_Model.account;
                                        
                                        shanchu();
                                        
                                        verify.style.display = 'none';
                                    }

                                }
                                
                            });
                        }; 
                        
                }; window.length = quanzhan.length;
                
                


           


               //关闭查看详情
                // const information = document.querySelector('.information');
                var close_check = document.querySelector('.button1');
                close_check.onclick = function () {
                    information.style.display = 'none';
                }
                //关闭确认信息
                // const verify = document.querySelector('.verify');
                var close_verify = document.querySelector('.no');
                close_verify.onclick = function () {
                    verify.style.display = 'none';
                }




            //删除信息的函数
        function shanchu(){
            axios({
                url: `http://101.200.73.250:31111/students/${acc}`,
                method: "delete",

            }).then((result) => {
                console.log("成功")
                console.log(quanzhan);
                location.reload();


            }).catch((error) => {
                console.log(error)
            })
        }

            // function centerBox() {
            //         const bg = document.getElementsByClassName('bg')
            //         const information = document.querySelector('.information');
            //         const verify = document.querySelector('.verify')

            //         const bgWidth = bg.offsetWidth;
            //         const bgHeight = bg.offsetHeight;

            //         const informationWidth = information.offsetWidth;
            //         const informationHeight = information.offsetHeight;

            //         // const verifyWidth = verifyWidth.offsetWidth;
            //         // const verifyHeight = verifyHeight.offsetHeight;


            //         const left1 = (bgWidth - informationWidth) / 2;
            //         const top1 = (bgHeight - informationHeight) / 2;



            // }


            // centerBox();





        
        //通过人名查找信息
        let search = document.getElementsByClassName('search_img');
        let msg2 = document.getElementsByClassName('msg2');
        let name2 = document.getElementsByClassName('name2');
        let search_pop = document.getElementsByClassName('search_pop');
        
                //点击事件
            search[0].onclick = function(){
            // console.log('点击了');
            let search_text = document.getElementById("search_text").value;

            let names = [];
            for(a = 0;a<quanzhan.length;a++){
                names.push(quanzhan[a].student_Model.name);
                
            }
            console.log(names);
            sousuo = Array.from(names);
            // console.log(sousuo);

            let found = false;

            //遍历数组
            sousuo.forEach(function (ele,index1) {
                // let eleText = ele.innerText;
                console.log(ele)
                
                console.log(index1)
                if(search_text == ele){

                    msg2[0].textContent = `期数：${quanzhan[index1].student_Model.periodNum}`;
                
                
                    msg2[1].textContent = `方向：${quanzhan[index1].student_Model.department}`;
                
                
                    msg2[2].textContent = `职位：${quanzhan[index1].student_Model.position}`;
                
                
                    msg2[3].textContent = `获奖经历：${quanzhan[index1].student_Model.awards}`;

                    name2[0].textContent = ele;

                    search_pop[0].style.display = 'block';

                    found = true;
                    
                }
                 
                
                
            });
                    if(!found){
                        console.log("错啦");
                        

                        alert('该用户不存在！');

        }
}

        //关闭搜索后的弹框
            
            let close_search = document.querySelector('.button2');
            close_search.onclick = function () {
                search_pop[0].style.display = 'none';
}
            

// window.onload = function () {
//     setInterval(showTime, 4000);
                //         }

                

            }, 3000);
            


//              // 获取盒子元素
//     const fullDocumentBox = document.querySelector('.bg');
    
//     // 计算文档的总高度
//     const documentHeight = Math.max(
//       document.body.scrollHeight, document.body.offsetHeight,
//       document.documentElement.clientHeight, document.documentElement.scrollHeight,
//       document.documentElement.offsetHeight
//     );
    
//     // 设置盒子的高度
// fullDocumentBox.style.height = documentHeight + 'px';
//     console.log(fullDocumentBox.style.height)