import {numHERO} from './heroMAX.js';


/* 01. 그래프 만들기 */
const mainGraph = document.getElementById('mainGraph');

export function display_graph(obj,heroCLASS){
    const arr = obj[heroCLASS];
    const result = arr.map(el => makeGraph(el,heroCLASS)).join('');
    mainGraph.innerHTML += result;
}//display_graph

function makeGraph(el,heroCLASS){
    let graphOFF ='';
    if(el.name == 'bastion'){
        graphOFF = 'off';
    }else{
        graphOFF = '';
    } 

    return `
        <li class="${graphOFF}" data-class="${heroCLASS}" data-hero="${el.name}">
            <div class="cont_graph" style="height:${numHERO.minSTEP + (numHERO.ratio * (el.id.length - 1))}%;">
                <div class="bar"></div>
                <span class="num_graph">${el.id.length}</span>
            </div><!--graph-->
            <div class="profile_graph">
                <div class="img_cont">
                    <img src="./img/portrait/${el.name}.png" alt="${heroCLASS}:${el.name}"/>
                </div>
                <div class="name">${el.nameKR}</div>
            </div><!--profile-->
        </li><!-- -->
    `;
}//makeGraph


/* 02. 그래프 클릭시 이동 */
mainGraph.addEventListener('click',to_tbl_hero);

function to_tbl_hero(e){
    e = e || window.event;
    let targetLI = e.target;
    if(targetLI == undefined || targetLI == null){return;}
    while(targetLI.tagName != "LI"){
        if(targetLI.tagName == "UL"){return;}
        targetLI = targetLI.parentElement;
    }
    const val_targetLI = targetLI.dataset.hero;
    move_tblHero(`tbl_${val_targetLI}`);
}//to_tbl_hero

function move_tblHero(tblVAL){
    const tbl_top = document.getElementById(tblVAL).getBoundingClientRect().top;
    window.scrollTo({
        top : tbl_top,
        behavior : 'smooth'
    });
}//move_tblHero