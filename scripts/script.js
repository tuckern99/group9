//import area_graph from './lindsey.js';

var dataset;

d3.csv("../Engineering_graduate_salary.csv").then(function(data) {
    dataset = data;
    console.log(dataset)


    //enter graph gen functions here ...
    area_graph(data);
}); 


