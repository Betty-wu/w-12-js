class Tools {
    getMinLi(lis) {
        let ary;
        if (!Array.isArray(lis)) {
            ary = [...lis].map((item) => {
                return item.scrollHeight
            });
        }
        let minLi = Math.min(...ary);
        let minIndex = ary.findIndex(item => item === minLi);
        return {
            minLi,
            minIndex
        }
    }
    debounce(callBack, time) {
        let timer;
        return function (...arg) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                callBack.call(this, ...arg);
            }, time)
        }
    }
    throttle(callBack, time) {
        let prevTime = 0;
        return function (...arg) {
            let nowTime = +new Date();
            if (nowTime - prevTime > time) {
                callBack.call(this, ...arg);
            }
            prevTime = nowTime;
        }
    }
}

class Waterfall extends Tools {
    constructor(name) {
        super();
        this.box = document.querySelector(name);
        this.imgLis = this.box.children;
        this.winH = window.innerHeight;
        this.boxT = this.box.offsetTop;
        this.onOff = true;
        this.loading = document.getElementById("loading");
    }

    api(url, callBack) {
        let that = this;
        fetch(url).then(d => d.json()).then(data => {
            callBack.call(that, data)
        })
    }

    render() {
        this.loadOn();
        this.loadingChange();
        this.api("./data.json", function (data) {
            this.loadOff();
            this.loadingChange();
            data.forEach((item, index) => {
                let {
                    minIndex
                } = this.getMinLi(this.imgLis);
                let div = this.create(item);
                this.imgLis[minIndex].appendChild(div);
                setTimeout(() => {
                    div.children[0].style.opacity = 1
                }, index * 100)
            })
        })
    }

    create({
        pic,
        desc,
        author,
        height
    }) {
        let imgDiv = document.createElement("div");
        imgDiv.className = "img_box";
        imgDiv.innerHTML = `
        <img height="${height}" src="${pic}" alt="">
        <p class="desc">${desc}</p>
        <p class="author">${author}</p>
        `;
        return imgDiv;
    }

    scroll() {
        let fn = () => {
            let {
                minIndex
            } = this.getMinLi(this.imgLis);
            if (window.pageYOffset + this.winH > this.imgLis[minIndex].scrollHeight + this.boxT) {
                this.render()
            }
        }
        window.onscroll = this.debounce(fn, 200);
        window.onresize = () => {
            this.winH = window.innerHeight
        };
    }

    loadingChange() {
        this.loading.style.display = this.onOff ? "block" : "none";
    }

    loadOn() {
        this.onOff = true;
    }

    loadOff() {
        this.onOff = false;
    }
}
let w = new Waterfall(".body");
w.render();
w.scroll()