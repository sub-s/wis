            
const comboBox = () => {
    var x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    document.addEventListener("click", closeAllSelect);

}

comboBox();


// 인풋 클리어 
const inputClearBtn = () => {
    let _this = event.currentTarget;
    let val = event.target.value;
    let clear = _this.closest('.field').querySelector('.clear-btn');
    
    let _display = val ? 'block' : 'none'
    clear.style.display = _display;
    
}
// 인풋 클리어 버튼
const clearBtn = () => {
    let _this = event.currentTarget;
    let _input = _this.closest('.field').querySelector('input');

    _input.value = '';
    _input.focus()
    _this.style.display = 'none';
}


// 검색 영역 오픈 토굴 
const openSearch = () => {
    let _this = event.currentTarget;
    let _text = _this.querySelector('.blind');
    let _check = _this.closest('.hidden-search').classList.contains('active');
    
    _this.closest('.hidden-search').classList.toggle('active')
    _check ? _text.innerText = '닫힘' : _text.innerText = '열림'

}

// 북마크 
const bookmark = () => {
    let _this = event.currentTarget;
    _this.classList.toggle('active')
}


const lnbDrag = ()=>{
    event.preventDefault();
    const _thumb = event.currentTarget;
    const _lnb = document.querySelector("#lnb");
    const _con = document.querySelector("#content > .content_wrap");
    _thumb.sx = event.pageX;
    _thumb.left = _lnb.clientWidth;
    console.log("_thumb.left : ",_thumb.left)
    const winMove = ()=>{
        _thumb.diffX = event.pageX - _thumb.sx;
        _thumb.calcX = _thumb.left + _thumb.diffX;
        const applyX = (_thumb.calcX <= 0)?0:_thumb.calcX;
        _lnb.style.width = applyX + "px";
        _con.style.width = "calc(100% - " + applyX + "px)";
    }
    const winUp = ()=>{
        console.log("mpuse up ev/11")
        window.removeEventListener("mousemove",winMove);
        window.removeEventListener("mouseup",winUp);
    }
    window.addEventListener("mousemove",winMove);
    window.addEventListener("mouseup",winUp);
}

const lnbClick = ()=>{
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancleBubble = true;
    }
    let count = 0;
    const _this = event.currentTarget;
    const _ul = _this.querySelector("ul");
    const checked = _this.classList.contains("active");
    const innerFn = (el,h)=>{
        const tagCheck = (el.tagName.toLowerCase() === "ul")?true:false;
        const topChecked = el.classList.contains("lnb_menu");
        if(!topChecked && tagCheck){
            const height = el.clientHeight;
            el.style.height = (height + h) + "px";
        }
        if(!topChecked) innerFn(el.parentNode,h);
    }
    
    const h = (_ul)?_ul.scrollHeight:-1;
    if(checked){
        _this.classList.remove("active");
        if(_ul) _ul.style.height = 0;
        if(_ul) innerFn(_ul.parentNode,(h * -1));
    }else{
        _this.classList.add("active");
        if(_ul) _ul.style.height = h + "px";
        if(_ul) innerFn(_ul.parentNode,h);
    }
}

const lnbSetting = ()=>{
    const _lnbMenu = document.querySelector(".lnb_menu"); 
    const _wrap = _lnbMenu.querySelectorAll("ul");
    const _active = _lnbMenu.querySelectorAll(".active");
    _lnbMenu.classList.add("noTransition")
    _wrap.forEach((u,i)=>{
        const _li = u.querySelector("li");
        u.style.height = 0;
    })
    _active.forEach((a,i)=>{
        a.classList.remove("active");
    })
    for(let i=0; i<_active.length; i++){
        const time = i * 0;
        const _li = _active[i];
        setTimeout(()=>{
            console.log(i,":",_li); 
            _li.click();
            if(i === (_active.length - 1)){
                _lnbMenu.classList.remove("noTransition")
            }
        },time)
    }

}