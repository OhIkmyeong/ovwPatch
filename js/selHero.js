const select_hero = document.getElementById('select_hero');
const sect_tbl = document.getElementsByClassName('sect_tbl');
let tbl_id;

export function do_selHero(){
    select_hero.addEventListener('click',onCheckbox);
}//do_selHero

function onCheckbox(e){
    e = e || window.event;
    const thisVAL = e.target.value;
    /* 01. return */
    if(thisVAL == undefined || thisVAL == null  || thisVAL == 0){return;}
    /* 02. 클래스 전체 */
    if( thisVAL == "tank" ||
        thisVAL == "dps" ||
        thisVAL == "hps"
    ){
        class_checkbox(e.target,thisVAL);
        return;
    }
    /* 03.영웅개별 */
    on_off_heroes(e.target,thisVAL)
}//onCheckbox


/* ----------------------- */
/* 클래스 전체 키고 끄기 */
function class_checkbox(target,role){
    const thisPRNT = target.parentElement;
    const sbl = thisPRNT.getElementsByTagName('input');
    if(target.checked){
        for(let ipt of sbl){
            ipt.checked = true;
            isTBL(ipt.value);
            if(tbl_id == "tank" || tbl_id == "dps" || tbl_id == "hps"){continue;}
            on_hero();
        }
    }else{
        for(let ipt of sbl){
            ipt.checked = false;
            isTBL(ipt.value);
            if(tbl_id == "tank" || tbl_id == "dps" || tbl_id == "hps"){continue;}
            off_hero();
        }
    }
}//class_checkbox


/* 영웅 개별 키고 끄기 */
function on_off_heroes(target,val){
    const wrap_tbl = document.querySelector(`[data-wrap="${target.parentElement.dataset.val}"]`);
    isTBL(val);
    if(target.checked){
        on_hero();
    }else{
        document.getElementById(`ipt_class-${target.parentElement.dataset.val}`).checked = false;
        off_hero();
    }
}//on_off_heroes

/* 아이디 판별 */
function isTBL(val){
    if(val == "tank" || val == "dps" ||val == "hps"){
        tbl_id = val;
    }else{
        tbl_id = `tbl_${val}`;
    }
}//isTBL

/* 영웅 - 키기 */
function on_hero(){
    document.getElementById(tbl_id).classList.remove('off');
}//on_hero


/* 영웅 - 끄기 */
function off_hero(){
    document.getElementById(tbl_id).classList.add('off');
}//off_hero