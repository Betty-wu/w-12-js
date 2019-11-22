/* 
   1.获取数据，比较每个li的长度，把图片插入到最短的li中
   2.图片懒加载，当可视窗口的高度+滚动条的距离>=最短的li的绝对位置距离，就加载图片
   3.实现图片一直加载的效果，当可视窗口的高度+滚动条的距离>=最短的li的绝对位置距离，就重新请求数据
   4.当鼠标滚轮滑动时，会多次触发onscroll事件时，因此会发生非常多的请求，这样不止增加了服务器的压力，也降低了用户的体验，因此需要用到防抖或者节流
*/
/* 
  1.防抖(debounce):（停下来才触发）

      事件触发的频率很高，但是只要停下来再加载

   2.节流(throttle):(降低触发频率)
      
       每隔固定时间在加载，例如200ms

*/

// 防抖

function debounce(callBack, time) {
    let timer;
    return function (...arg) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            callBack.call(this, ...arg)
        }, time)
    }
}


//节流
function throttle(callBack, time) {
    let prevTime = 0,
        timer;
    return function (...arg) {
        let nowTime = +new Date();
        if (nowTime - prevTime > time) {
            callBack.call(this, ...arg)
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (+new Date - prevTime > time) {
                    callBack.call(this, ...arg)
                }
            }, time)
        }
        prevTime = nowTime;
    }

}

const box = document.querySelector('.body');

const head = document.querySelector('.head');
function minIndex(ary){
    let min = Math.min(...ary);
    let index = ary.findIndex(item=>item === min);
    return {
        index,
        min
    }
}

/* function minLi(lis) {
    let ary = [...lis].map((item) => item.scrollHeight);
    let minAry = Math.min(...ary);
    let minIndex = ary.findIndex((item) => item === minAry);
    return {
        minEle: lis[minIndex], //最短的li
        minAry, //最短li的scrollHeight
        minIndex //最短li的索引值
    }
} */

const picw = 236; //图片的宽度
const ml = 10; //margin-left
const boxt = 66;
let clientW = document.documentElement.clientWidth;//可视区的宽度

let len = Math.floor(clientW / (picw+ml));

//计算ul的宽度
box.style.width = (len * (picw+ml)) - ml + 'px';
// console.log(len)

let aryx = [];//求x
let aryy = [];//求y

for(let i=0;i<len;i++){
    aryx[i] =  i * (picw+ml);
    aryy[i] = 0;
}

function render(){
fetch('../data.json')
.then(d=>d.json())
.then(ary=>{
    ary.forEach((item,i)=>{
        
        let {index} = minIndex(aryy);//找出数组中top最小的
        let li = document.createElement('li');
        //设置li的left，top
        li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;

        let div = document.createElement('div');
        div.className = 'img_box';
        let img = document.createElement('img');
        img.src = item.pic;

        
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        p1.className = 'desc';
        p1.innerText = item.desc;
        p2.className = 'author';
        p2.innerText = item.author;
        div.append(img);
        div.append(p1);
        div.append(p2);
        li.append(div);
        box.append(li);
        setTimeout(() => {
            img.style.opacity = 1;   
        },200);

        //每次添加完一个li之后，把当前li的高度 + 间距 赋值到当前数组对应项中，以便于下次比较
        aryy[index] += (boxt + item.height*1 + 20); 
        // [100,0,0,0]
    });
});
}
render();

//滚轮的时候判断触底
let iH = window.innerHeight; //可视区的高度
window.onscroll = debounce(fn,200);
// window.onscroll = throttling(fn,1000);
// window.onscroll = fn;
function fn(){
//判断ul的高度是否比可视区要大，如果小于可视区高度，那么就终止加载代码执行
// if(box.scrollHeight < iH)return;
let {index} = minIndex(aryy);  //最短的距离
let scroll = window.pageYOffset; //滚动条的距离

// console.log(iH + scroll);
// console.log(aryy[index])

if(iH + scroll >= aryy[index]){
    console.log('触底了');
    render();
}

}

/*
window.onresize   当浏览器窗口缩放的时候触发
*/
//当浏览器缩放的时候重新计算一下，可视区能放多少张图片
window.onresize = function(){
// console.log(1);
clientW = document.documentElement.clientWidth;//可视区的宽度
len = Math.floor(clientW / (picw+ml));
box.style.width = (len * (picw+ml)) - ml + 'px';
aryx.length = 0;
aryy.length = 0;
iH = window.innerHeight;
for(let i=0;i<len;i++){
    aryx[i] =  i * (picw+ml);
    aryy[i] = 0;
}
//获取所有的li，然后给重新安排位置
const lis = box.querySelectorAll('li');
lis.forEach((ele,i)=>{
    let {index} = minIndex(aryy);
    ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
    aryy[index] += (ele.scrollHeight + 10); 
});

}