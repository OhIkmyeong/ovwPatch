/*  */
import * as heroMAX from "./heroMAX.js";
import {display_graph} from "./graph.js";
import {display_mostHero} from "./mostHero.js";
import * as tableHero from "./tableHero.js";

import * as offGraph from "./offGraph.js";
import * as selHero from "./selHero.js";

import * as scWindow from "./scroll.js";

/*  */
function fetchMe(){
    return fetch('./data/heroes.json')
    .then(result => result.json());
}//fetchMe


/*  */
fetchMe()
.then((obj)=>{
    /* display */
    heroMAX.do_heroMAX(obj);
    display_graph(obj,"tank");
    display_graph(obj,"dps");
    display_graph(obj,"hps");
    display_mostHero();
    tableHero.display_table(obj,"tank");
    tableHero.display_table(obj,"dps");
    tableHero.display_table(obj,"hps");

    /* select */
    offGraph.do_offGraph();
    selHero.do_selHero();

    /* scroll */
    scWindow.get_val_top();
});
