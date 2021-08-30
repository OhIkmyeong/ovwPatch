const btn_toTOP = document.getElementById('btn_toTOP');
const btn_toSELECT = document.getElementById('btn_toSELECT');
let top_selectHero = 0;


/* GET VALUE */
export function get_val_top(){
    const sect_select_hero = document.getElementById('sect_select_hero');
    top_selectHero = sect_select_hero.offsetTop;
}//get_val_top


/* 공통 움직임 */
export function move_window(value){
    window.scrollTo({
        top : value,
        behavior : 'smooth'
    });
}//move_window

/* 📍 가장 위로 */
btn_toTOP.addEventListener('click',()=>{move_window(0);});

/* 📍 영웅선택 UI로 */
btn_toSELECT.addEventListener('click',()=>{move_window(top_selectHero);});