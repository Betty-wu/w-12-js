fetch("./json/product.json").then((data) => data.json()).then((data) => {
    //复制原数据，避免处理数据时，污染原数据
    let newData = data.concat()
    //渲染页面
    function render() {
        let lis = newData.map(({
            id,
            img,
            title,
            price,
            time,
            hot
        }, index) => {
            return `<li>
            <img src="${img}">
            <p>商品名称:<span>${title}</span></p>
            <p>上架时间:<span>${time}</span></p>
            <p>商品热度:<span>${hot}</span></p>
            <p>商品价格::<span>${price}</span></p>
        </li>`
        }).join("") //将lis转变成去掉 ""的字符串

        ul.innerHTML = lis;
    }
    render(newData)
    //排序:循环每个a标签绑定点击事件，给每个a标签增加一个开关，作为升降序的开关
    const menuA = document.querySelectorAll("a");
    menuA.forEach((item) => {
        item.onOff = true; //默认从小到大
        item.onclick = function () {
            if (this.onOff) {
                newData.sort((a, b) => {
                    if (this.dataset.name === "time") {
                        return new Date(a.time) - new Date(b.time)
                    }
                    return a[this.dataset.name] - b[this.dataset.name]
                })
                this.children[1].classList.remove("actived");
                this.children[0].classList.add("activep")
            } else {
                newData.sort((a, b) => {
                    if (this.dataset.name === "time") {
                        return new Date(b.time) - new Date(a.time)
                    }
                    return b[this.dataset.name] - a[this.dataset.name]
                })
                this.children[1].classList.add("actived");
                this.children[0].classList.remove("activep")
            }
            this.onOff = !this.onOff
            render(newData)
        }
    })
})