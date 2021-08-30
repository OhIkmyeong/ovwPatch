import {mostHeroOBJ} from './heroMAX.js';

/*  */
const img_mostHero = document.getElementById('img_mostHero');
const name_mostHero = document.getElementById('name_mostHero');
const info_mostHero = document.getElementById('info_mostHero');
const cv_mostHero = document.getElementById('cv_mostHero');
const mostHero_num = document.getElementById('mostHero_num');
const mostHero_appear = document.getElementById('mostHero_appear');
const mostHero_days = document.getElementById('mostHero_days');
const vid_mostHero = document.getElementById('vid_mostHero');

let reDayArr = [];
let caculDayArr = [];
let averageDay = 0;

let addDay = {
    year : 365,
    month : 30,
    day : 0
}

let urlOBJ = {
    url : "",
    img : "",
    title : ""
};

export function display_mostHero(){
    //console.log(mostHeroOBJ);
    //1. 이미지
    mh_img();
    //2. 이름,설명,성우
    mh_info();
    //3-1. 출연횟수
    mostHero_num.innerText = mostHeroOBJ.id.length;
    //3-2. 최초등장
    mh_appear();
    //3-3. 재출연 소요기간
    mh_re();
    //4. 패치노트 나열
    mh_note();
}//display_mostHero


/* 01. 이미지 */
function mh_img(){
    let heroIMG = new Image();
    heroIMG.setAttribute('src','./img/full/' + mostHeroOBJ.name +'.png');
    img_mostHero.appendChild(heroIMG);
}//mh_img

/* 02. 이름,설명,성우 */
function mh_info(){
    name_mostHero.innerText = mostHeroOBJ.nameKR;
    info_mostHero.innerText = mostHeroOBJ.info;
    cv_mostHero.innerText = mostHeroOBJ.cv;
}//mh_info

/* 03-2. 최초등장 */
function mh_appear(){
    const fAppear = new Date(mostHeroOBJ.date[0]);
    mostHero_appear.innerHTML = `
        <span>${fAppear.getFullYear()}년</span>
        <p>${fAppear.getMonth() + 1}월 ${fAppear.getDate()}일</p>
    `;

    const bg_appear = new Image();
    bg_appear.src = `./img/skill/${mostHeroOBJ.name}.png`;
    mostHero_appear.appendChild(bg_appear);
}//mh_appear



/* ⚡ 03-3. 재출연 소요기간 */
function mh_re(){
    //yyyy-mm-dd로 분별하여 추가
    for(let days of mostHeroOBJ.date){
        const newDay = new Date(days);
        reDayArr.push({
            "yy" : newDay.getFullYear(),
            "mm" : newDay.getMonth(),
            "dd" : newDay.getDate(),
        });
    }
    
    //뺀값 구하기
    for(let i=reDayArr.length -1; i>0; i--){do_caculDays(i);}

    //평균 구하기
    for(let num of caculDayArr){averageDay += num;}

    //반영
    mostHero_days.innerText = parseInt(averageDay / caculDayArr.length);
}//mh_re


function do_caculDays(i){
    //일 계산
    addDay.day = reDayArr[i].dd - reDayArr[i-1].dd;
    if(addDay.day < 0){addDay.day += 30;}

    //월 계산
    addDay.month = reDayArr[i].mm - reDayArr[i-1].mm;
    if(addDay.month < 0){addDay.month += 12;}
    if(addDay.month > 1){addDay.day += (30*addDay.month);}

    //년 계산
    addDay.year = reDayArr[i].yy - reDayArr[i-1].yy;
    if( addDay.year >= 1 &&
        reDayArr[i].mm - reDayArr[i-1].mm >= 0
    ){
        addDay.day += 360 * addDay.year;
    }
    caculDayArr.push(addDay.day);
}//do_caculDays


/* 04. 패치노트 나열 */
function mh_note(){
    mostHeroOBJ.id.forEach((el,idx)=>{makeURL(el,idx)});
}//mh_note

function display_note(el,idx){
    urlOBJ.url = `https://www.youtube.com/watch?v=${el}`;
    urlOBJ.img = `https://img.youtube.com/vi/${el}/hqdefault.jpg`;

    const result =  `
    <li><a href="${urlOBJ.url}" target="_blank">
        <div class="imgCont">
            <img src="${urlOBJ.img}" alt=""/>
        </div>
        <p class="date">${mostHeroOBJ.date[idx]}</p>
        <p class="title">${urlOBJ.title}</p>
    </a></li>
    `;
    vid_mostHero.innerHTML += result;
}//display_note

function makeURL(el,idx){
    urlOBJ.url = `https://www.youtube.com/watch?v=${el}`;
    
    $.getJSON('https://noembed.com/embed', {format : 'json', url : urlOBJ.url}, function(data){
        urlOBJ.title = data.title;
        // console.log(urlOBJ.title);
        display_note(el,idx);
    });
}//makeURL
