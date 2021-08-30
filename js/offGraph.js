const select_graph = document.getElementById('select_graph');
const all_graph = mainGraph.children;

export function do_offGraph(){
    select_graph.addEventListener('change',(e)=>{
        const thisVALUE = e.currentTarget.value;
        on_offGraph(thisVALUE);
    });//change
}//do_offGraph


function on_offGraph(thisVALUE){
    if(thisVALUE == "all"){
        all_on_graph();
        return;
    }

    all_off_graph();
    
    for(let li of all_graph){
        if(li.dataset.class == thisVALUE){
            li.classList.remove('off');
        }
    }
}//on_offGraph


function all_on_graph(){
    for(let li of all_graph){li.classList.remove('off');}
}//all_on_graph


function all_off_graph(){
    for(let li of all_graph){li.classList.add('off');}
}//all_off_graph