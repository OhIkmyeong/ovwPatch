let tempURL = {
    url : "",
    title : ""
};

let tempKR = '';

export function display_table(obj,hClass){
    const wrapper = document.querySelector(`[data-wrap="${hClass}"]`);
    const classARR = obj[hClass];
    /* 제목 */
    make_tableTitle(hClass,wrapper);
    /* 테이블 */
    for(let hero of classARR){
        makeTABLE(hClass,hero,wrapper,obj);
    }
}//display_table


/* 제목 */
function make_tableTitle(hClass,wrapper){
    let hClass_kr;
    switch(hClass){
        case "tank" :
            hClass_kr = "돌격";
            break;
        case "dps" :
            hClass_kr = "공격";
            break;
        case "hps" :
            hClass_kr = "지원";
            break;
        default:
            hClass_kr = "???";
            break;
    }
    const result = `
    <div class="title__class" data-title="${hClass}">
        <img src="./img/ic/ic_${hClass}-blue.svg" alt="아이콘"/>
        <p>${hClass_kr}</p>
    </div><!--title__class-->
    `;
    wrapper.innerHTML = result;
}//make_tableTitle

/* ⚡ 테이블 만들기 */
function makeTABLE(hClass,hero,wrapper,obj){
    //틀
    const sect_tbl = document.createElement('SECTION');
    sect_tbl.classList.add('sect_tbl');
    sect_tbl.id = `tbl_${hero.name}`;
    
    //프로필
    const tbl_profile = document.createElement('DIV');
    tbl_profile.classList.add('tbl_profile');
    let in_profile = `
        <div class="tbl_profile_frame">
            <img src="./img/profile/${hero.name}.png" alt=""/>
            <div class="txt_profile">
                <img src="./img/ic/ic_${hClass}.svg" alt="아이콘"/>
                ${hero.nameKR}
            </div>
        </div><!-- tbl_profile_frame -->
        <div class="isSolo ${hero.solo ? 'yes' : ''}">단독출연</div>
    `;
    tbl_profile.innerHTML = in_profile;
    sect_tbl.appendChild(tbl_profile);

    //출연횟수
    const tbl_appearNum = document.createElement('ARTICLE');
    tbl_appearNum.classList.add('tbl_appearNum')
    let in_appearNum = `
        <div class="title">출연횟수</div>
        <div class="cont">
            <div class="appearNum">${hero.id.length}</div>
        </div><!-- cont -->
    `;
    tbl_appearNum.innerHTML = in_appearNum;
    sect_tbl.appendChild(tbl_appearNum);

    //패치노트 목록
    const tbl_list = document.createElement('tbl_list');
    tbl_list.classList.add('tbl_list');
    tbl_list.innerHTML = '<div class="title">패치노트 목록</div>';
    
    const patchUL = document.createElement('UL');
    patchUL.classList.add('cont','list');

    tbl_url(hero,hero["id"],patchUL);
    
    tbl_list.appendChild(patchUL);
    sect_tbl.appendChild(tbl_list);

    //함께한 영웅
    const tbl_with = document.createElement('ARTICLE');
    tbl_with.classList.add('tbl_with');
    tbl_with.innerHTML = `<div class="title">함께한 영웅</div>`;
    
    const withUL = document.createElement('UL');
    withUL.classList.add('cont','with');
    for(let partner of hero["with"]){
        make_withUL(partner,withUL)
    }
    tbl_with.appendChild(withUL);

    sect_tbl.appendChild(tbl_with);

    //⚡적용
    wrapper.appendChild(sect_tbl);
}//makeTABLE



/* ----------------------------------------------------------- */
/* 테이블 - URL */
function tbl_url(hero,urlARR,patchUL){
    for(let i=0; i<urlARR.length; i++){
        tempURL.url = `https://www.youtube.com/watch?v=${urlARR[i]}`;
        $.getJSON('https://noembed.com/embed', {format : 'json', url : tempURL.url}, function(data){
            tempURL.title = data.title;
            // console.log(tempURL.title);
            tbl_note(i,hero,patchUL);
        });
    }
}//tbl_url

/* 테이블 - 노트 */
function tbl_note(idx,hero,patchUL){
    tempURL.url = `https://www.youtube.com/watch?v=${hero["id"][idx]}`;
    const makeLI = document.createElement('LI');
    makeLI.innerHTML = `
        <div class="thumb"><img src="https://img.youtube.com/vi/${hero["id"][idx]}/hqdefault.jpg" alt="썸네일"></div>
        <span class="date">${hero["date"][idx]}</span>
        <a href="${tempURL.url}" target="_blank">${tempURL.title}</a>
    `;
    patchUL.appendChild(makeLI);
}//tbl_note

/* ----------------------------------------------------------- */
/* 함께한 영웅 */
function make_withUL(partner,container){
    const partner_list = document.createElement('LI');
    to_KRname(partner);
    partner_list.innerHTML = `
        <div class="with_img"><img src="./img/portrait/${partner}.png" alt="${partner}"/></div>
        <div class="txt">${tempKR}</div>
    `;
    container.appendChild(partner_list);
}//make_withUL

function to_KRname(partner){
    
    switch(partner){
        case "dva" :
            tempKR = "D.Va";break;
        case "reinhardt" :
            tempKR = "라인하르트";break;
        case "wreckingball" :
            tempKR = "레킹볼";break;
        case "roadhog" :
            tempKR = "로드호그";break;
        case "sigma" :
            tempKR = "시그마";break;
        case "orisa" :
            tempKR = "오리사";break;
        case "winston" :
            tempKR = "윈스턴";break;
        case "zarya" :
            tempKR = "자리야";break;
        case "genji" :
            tempKR = "겐지";break;
        case "doomfist" :
            tempKR = "둠피스트";break;
        case "reaper" :
            tempKR = "리퍼";break;
        case "cassidy" :
            tempKR = "캐서디";break;
        case "mei" :
            tempKR = "메이";break;
        case "bastion" :
            tempKR = "바스티온";break;
        case "soldier76" :
            tempKR = "솔저:76";break;
        case "sombra" :
            tempKR = "솜브라";break;
        case "symmetra" :
            tempKR = "시메트라";break;
        case "ashe" :
            tempKR = "애쉬";break;
        case "echo" :
            tempKR = "에코";break;
        case "widowmaker" :
            tempKR = "위도우메이커";break;
        case "junkrat" :
            tempKR = "정크랫";break;
        case "torbjorn" :
            tempKR = "토르비욘";break;
        case "tracer" :
            tempKR = "트레이서";break;
        case "pharah" :
            tempKR = "파라";break;
        case "hanzo" :
            tempKR = "한조";break;
        case "lucio" :
            tempKR = "루시우";break;
        case "mercy" :
            tempKR = "메르시";break;
        case "moira" :
            tempKR = "모이라";break;
        case "baptiste" :
            tempKR = "바티스트";break;
        case "brigitte" :
            tempKR = "브리기테";break;
        case "ana" :
            tempKR = "아나";break;
        case "zenyatta" :
            tempKR = "젠야타";break;
        default : 
            tempKR = "....?"
            break;
    }
}//to_KRname