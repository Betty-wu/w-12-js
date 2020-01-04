// editing completed
// editing ''
// ''
//completed

new Vue({
    el: '.todoapp',
    data: {
        ary: [],
        val: "",
        hash: window.location.hash || "#/all"
    },
    created() {
        this.ary = getItem();
        window.onhashchange =  ()=> {
            this.hash = window.location.hash
        }
    },
    directives: {
        focus(el) {
            el.select();
        }
    },
    methods: {
        add() {
            this.ary.unshift({
                id: +new Date,
                txt: this.val,
                checked: false,
                onoff: false
            });
            this.val = "";
        },
        isAll(e) {
            this.ary.forEach(item => {
                item.checked = e.target.checked
            })
        },
        switcher(id) {
            this.restore(id, true)
        },
        restore(id, b = false) {
            this.ary.forEach(item => {
                if (item.id === id) {
                    item.onoff = b
                }
            })
        },
        blur({
            id,
            txt,
            onoff
        }, ev) {
            if (!onoff) return
            let {
                value
            } = ev.target;
            if (value && value != txt) {
                this.ary.forEach(item => {
                    if (item.id === id) {
                        item.txt = value
                    }
                })
            };
            this.restore(id, false)
        },
        remove(id) {
            this.ary = this.ary.filter(item => item.id !== id)
        }
    },
    computed: {
        setAry() {
            let {
                ary,
                hash
            } = this;
            return ary.filter(item => {
                switch (hash) {
                    case "#/all":
                        return item;
                    case "#/unchecked":
                        return !item.checked;
                    case "#/checked":
                        return item.checked
                }
            })
        },
        all() {
            if (this.ary.length) {
                localStorage.setItem("data", JSON.stringify(this.ary))
                return this.ary.every(item => item.checked)
            }

        },
        num() {
            return this.ary.filter(item => !item.checked).length
        }
    },
})

function getItem() {
    let d = window.localStorage.getItem("data")
    return d ? JSON.parse(d) : [{
            id: 0,
            txt: '哈哈',
            checked: true,
            onoff: false
        },
        {
            id: 1,
            txt: '呵呵',
            checked: false,
            onoff: false
        }
    ]
}