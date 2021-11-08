//import area_graph from './lindsey.js';

var dataset;

d3.csv("./Engineering_graduate_salary.csv").then(function(data) {
    dataset = data;

    //enter graph gen functions here ...
    area_graph(data);
    sal_person_plot(data)

}); 


