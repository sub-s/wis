HTMLElement.prototype.getIndex = function(){
    let idx = -1;
    const _c = this.parentNode.children;
    for(let i=0; i<_c.length; i++){
        const c = _c[i];
        if(c === this){
            idx = i;
            break;
        }
    }
    return idx;
}



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
            const checked = !$(this).hasClass("select-arrow-active")
            if(checked){
                const _wrap = this.closest(".custom-select");
                const _sel = _wrap.querySelector("select");
                const ev = document.createEvent("HTMLEvents");
                ev.initEvent("change",true,true);
                _sel.dispatchEvent(ev);
            }
            $(".multiselect.show").each(function(i,d){
                $(d).removeClass("show").attr("aria-expanded","false").next().removeClass("show");
            })
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

// 로그인 정보
const loginInfo = () => {
    let _this = event.currentTarget;
    _this.closest('.login-area').classList.toggle('active')
}






const lnbDrag = ()=>{
    event.preventDefault();
    const _out = document.querySelector(".outer_box");
    const _thumb = event.currentTarget;
    const _lnb = document.querySelector("#lnb");
    const _con = document.querySelector("#content > .content_wrap");
    const min = 1;
    _thumb.sx = event.pageX;
    _thumb.left = _lnb.clientWidth;
    const winMove = ()=>{
        _thumb.diffX = event.pageX - _thumb.sx;
        _thumb.calcX = _thumb.left + _thumb.diffX;
        const applyX = (_thumb.calcX <= min)?min:_thumb.calcX;
        _lnb.style.width = applyX + "px";
        _con.style.width = "calc(100% - " + applyX + "px)";
        if(applyX === min){
            _out.classList.add("closedLnb");
            _lnb.applyX = _thumb.left;
        }else{
            _out.classList.remove("closedLnb");
            _lnb.applyX = applyX;
        }
    }
    const winUp = ()=>{
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
    const _menuWrap = _this.querySelector(".menu_wrap");
    const _ul = _this.querySelector("ul");
    const checked = _this.classList.contains("active");
    const innerFn = (el,h)=>{
        const tagCheck = (el.tagName.toLowerCase() === "ul")?true:false;
        const topChecked = el.classList.contains("lnb_menu");
        if(!topChecked && tagCheck){
            const height = el.clientHeight;
            el.parentNode.style.height = (height + h) + "px";
        }
        if(!topChecked) innerFn(el.parentNode,h);
    }
    
    const h = (_ul)?_ul.scrollHeight:-1;
    if(checked){
        _this.classList.remove("active");
        
        // if(_ul) _ul.style.display = "none";
        // if(_menuWrap) _menuWrap.style.height = 0;
        // if(_ul) innerFn(_ul.parentNode.parentNode,(h * -1));
    }else{
        _this.classList.add("active");
        $(_this).siblings().removeClass("active")
        // if(_ul) _ul.style.display = "block";
        // if(_menuWrap) _menuWrap.style.height = h + "px";
        // if(_ul) innerFn(_ul.parentNode.parentNode,h);
    }
}

const getLnbLastChild = ()=>{
    const _lnb = document.querySelector(".lnb_menu > ul");
    const temp = [];
    const innerFn = (el,path)=>{
        const _lis = el.children;
        for(let i=0; i<_lis.length; i++){
            const _li = _lis[i];
            const cl = (path === "")?String(i):path + "-" + i;
            _li.classList.add(cl);
            if(_li.querySelector("ul")){
                innerFn(_li.querySelector("ul"),String(cl));
            }else{
                temp.push({depth:cl,el:_li});
            }
        }
    }
    innerFn(_lnb,"");
    // const innerFn = (el,depth)=>{
    //     const _lis = el.children;
    //     for(let i=0; i<_lis.length; i++){
    //         const _li = _lis[i];
    //         const _ul = _li.querySelector("ul");
    //         console.log("_ul : ",_ul)
    //         if(_ul){
    //             temp.push(_ul);
    //             innerFn(_ul);
    //         }else{
    //             // temp.push(_li);
    //         }
    //     }
    // }
    // innerFn(_lnb)
    // console.log("._lnb : ",_lnb);
    // console.log("temp : ",temp);
    // for(let i=temp.length - 1; i>=0; i--){
    //     const _u = temp[i];
    //     console.log(i,":",_u)
    // }

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
            _li.click();
            if(i === (_active.length - 1)){
                _lnbMenu.classList.remove("noTransition")
            }
        },time)
    }

}
const lnbTopTabClick = ()=>{
    const _this = event.currentTarget;
    const checked = _this.classList.contains("active");
    const _wrap = _this.closest(".lnb_tab");
    const _ul = _this.closest("ul");
    const _li = _ul.querySelectorAll("li");
    const idx = _this.getIndex();
    const _book = _wrap.querySelector(".lnb_bookMark");
    const _latest = _wrap.querySelector(".lnb_latestMenu");
    if(checked){
        _li[0].classList.remove("active");
        _li[1].classList.remove("active");
        _book.classList.remove("active");
        _latest.classList.remove("active");

    }else if(idx === 0){
        _li[0].classList.add("active");
        _li[1].classList.remove("active");
        _book.classList.add("active");
        _latest.classList.remove("active");
    }else{
        _li[0].classList.remove("active");
        _li[1].classList.add("active");
        _book.classList.remove("active");
        _latest.classList.add("active");
    }
}


$("textarea[max]").each((i,t)=>{
    $(t).wrap("<div class='text-area-wrap'></div>");
    $(t).parent(".text-area-wrap").append("<div class='count'><span>0</span>/"+$(t).attr("max")+"</div>")
    $(t).keyup(()=>{
        let len = $(t).val().length;
        const max = Number($(t).attr("max"));
        const keycode = event.keyCode
        const txt = $(t).val();
        if(max <= len && (keycode !== 8 && keycode !== 46 && keycode !== 37 && keycode !== 39 && keycode !== 40 && keycode !== 38)) event.preventDefault();
        if(max < len){
            $(t).val(txt.substring(0,max));
            len = max;
        }
        $(t).parent().find(".count").html("<span>"+len+"</soan>/"+max);
    })
})

$.datepicker.setDefaults({
    dateFormat: 'yy.mm.dd', //Input Display Format 변경
    showMonthAfterYear:true ,
    
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    dayNamesMin: ['일','월','화','수','목','금','토'],
    dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
    //minDate: "-1M",//최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
    //maxDate: "+1M", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)         
    yearSuffix: "년",
    buttonText: "선택",
});
$(".datepicker").datepicker();
$(".field.date").click(function(){
    $(this).find("input").focus();
})
// lnbSetting();



/* lnb */
const lnbToggle = ()=>{
    const checked = ($("#lnb").width() > 1)?true:false;
    const applyX = window.innerWidth - $("#content > .content_wrap").width();
    if(!$("#lnb")[0].applyX) $("#lnb")[0].applyX = applyX;
    if(checked){
        $(".outer_box").addClass("closedLnb");
        $("#lnb").css("width",1);
        $("#content > .content_wrap").css("width","calc(100% - 1px)")
    }else{
        $(".outer_box").removeClass("closedLnb");
        $("#lnb").css("width",$("#lnb")[0].applyX);
        $("#content > .content_wrap").css("width","calc(100% - " + $("#lnb")[0].applyX + "px)")
    }
}

/* content tab */
function contentTab(){
    const _this = event.currentTarget;
    const _li = _this.closest("li");
    const idx = _li.getIndex();
    if(idx === 1 && !_li.first){
        _li.first = true;
        setTimeout(()=>{
            console.log("dkdkdkdk")
            initGrid01();
            initGrid02();
        },500)
    }
}

$(".tab-menu > .btn-set > .btn-next, .tab-menu > .btn-set > .btn-prev").click(function(){
    const checked = $(this).hasClass("btn-prev");
    const len = $(".nav.nav-tabs > button").length - 1;
    const idx = $(".nav.nav-tabs > .active").index();
    const nextNum = (checked)?idx - 1:idx + 1;
    const applyIdx = (nextNum < 0)?len:(nextNum > len)?0:nextNum
    const _tab = new bootstrap.Tab($(".nav.nav-tabs > button")[applyIdx]);
    _tab.show();
})

$(".tab-menu > .btn-set > .btn-close").click(function(){

})

// $("nav > .nav.nav-tabs button > span").click(function(){
//     if(event.stopPropagation){
//         event.stopPropagation();
//     }else{
//         event.cancleBubble = true;
//     }
//     const idx = $(this).parent().index();
//     const $tabs = $(this).parents(".nav-tabs").find("button");
//     const len = $tabs.length - 1;
//     const $cons = $(".tab-content > .tab-pane");
//     const nextIdx = (idx - 1 < 0)?1:idx - 1;
//     const _tab = new bootstrap.Tab($tabs[nextIdx]);
//     console.log("len : ",len);
//     if(len === 0) return;
//     $tabs[idx].remove();
//     $cons[idx].remove();
//     _tab.show();
// })

function exid(){
    const _this = event.currentTarget;
    console.log("_this : ",_this)
}

/* file list */
const fileListClick = ()=>{
    const _this = event.currentTarget;
    const _files = document.querySelectorAll(".file-list > ul > li");
    const checked = !_this.classList.contains("active");
    if(!window.fileClick) window.fileClick = [];
    if(window.keyShift && window.keyControl){
        if(window.fileClick && window.fileClick.length > 0){
            const lastIdx = window.fileClick[window.fileClick.length - 1].getIndex();
            const idx = _this.getIndex();
            const sNum = (lastIdx > idx)?idx:lastIdx;
            const eNum = (lastIdx > idx)?lastIdx:idx;
            _files.forEach((f,i)=>{
                if(i >= sNum && i <= eNum){
                    f.classList.add("active");
                }
            })
        }
    }else if(window.keyShift){
        if(window.fileClick && window.fileClick.length > 0){
            const lastIdx = window.fileClick[window.fileClick.length - 1].getIndex();
            const idx = _this.getIndex();
            const sNum = (lastIdx > idx)?idx:lastIdx;
            const eNum = (lastIdx > idx)?lastIdx:idx;
            _files.forEach((f,i)=>{
                if(i >= sNum && i <= eNum){
                    f.classList.add("active");
                }else{
                    f.classList.remove("active");
                }
            })
        }
    }else if(window.keyControl){
        if(checked){
            _this.classList.add("active");
            window.fileClick.push(_this);
        }else{
            removeFileKey(_this);
            _this.classList.remove("active");
        }
    }else{
        const activeLen = document.querySelectorAll(".file-list > ul > li.active").length;
        _files.forEach((f,i)=>{
            if(activeLen > 1){
                if(f === _this){
                    f.classList.add("active");
                    window.fileClick = [];
                    window.fileClick.push(f);
                }else{
                    f.classList.remove("active");
                }
            }else if(f === _this){
                if(checked){
                    f.classList.add("active");
                    window.fileClick.push(_this);
                }else{
                    removeFileKey(_this);
                    f.classList.remove("active");
                }
            }else{
                f.classList.remove("active");
            }
        })
    }
}
const removeFileKey = (el)=>{
    if(!window.fileClick) return;
    for(let i=0; i<window.fileClick.length; i++){
        const _f = window.fileClick[i];
        if(_f === el){
            window.fileClick.splice(i,1);
        }
    }
}
const shortcutKey = ()=>{
    const keyEv = ()=>{
        const keyCode = event.keyCode;
        if(event.type === "keydown"){
            if(keyCode === 16) window.keyShift = true;
            if(keyCode === 91) window.keyControl = true;
        }else{
            if(keyCode === 16) window.keyShift = false;
            if(keyCode === 91) window.keyControl = false;
            
        }
        console.log(event.type,"   keyCode  : ",keyCode)
    }
    window.addEventListener("keydown",keyEv)
    window.addEventListener("keyup",keyEv)
}


window.onload = function(){
    shortcutKey();
}


const bigSel = ()=>{
    const _this = event.currentTarget;
    const _sel = _this.closest(".select-box-big")
    const _list = _sel.querySelector(".list");
    const checked = _list.classList.contains("open");
    if(checked){
        _list.classList.remove("open");
        _list.style.height = "0px";
    }else{
        _list.classList.add("open");
        _list.style.height = _list.children[0].scrollHeight + "px";
    }
    console.log("_this : ",_this);
    console.log("_list : ",_list);
}