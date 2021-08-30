export let numHERO = {
    max : 0,
    min : 9999,
    ratio : 0,
    minSTEP : 30,
    maxSTEP : 100
}

export let mostHeroOBJ = {
    "name" : ""
    ,"nameKR" : ""
    ,"solo" : false
    ,"id" : []
    ,"date" : []
    ,"with" : []
    ,"cv" : []
    ,"info" : ""
};

export function do_heroMAX(obj){
    for(let arr in obj){
        for(let hero of obj[arr]){
            if(hero.id.length > numHERO.max){
                numHERO.max = hero.id.length;
                for(let key in mostHeroOBJ){ mostHeroOBJ[key] = hero[key]; }
            }
            if(hero.id.length < numHERO.min && hero.id.length != 0){
                numHERO.min = hero.id.length;
            }
        }//
    }//

    caculSTEP();
}//do_heroMAX


/* ⚡ STEP 계산하기 */
function caculSTEP(){
    numHERO.ratio = (numHERO.maxSTEP - numHERO.minSTEP) / (numHERO.max - numHERO.min);
    //console.log(numHERO);
}//caculSTEP