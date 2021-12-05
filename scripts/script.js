//import area_graph from './lindsey.js';

var dataset;

d3.csv("./data.csv").then(function(data) {
    dataset = data;

    temp_data = data;

    //enter graph gen functions here ...
    // area_graph(temp_data);
    boxplot(temp_data);
    sal_person_plot(data);
    legend(data);
    heatmap(data);

}); 


