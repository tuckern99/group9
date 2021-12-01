var specials = ['all', 'computer science', 'computer engineer', 'information technology', 'computer application']
var gender = ['all', 'male', 'female']

var special_dropdown = d3.select("#special_sel")
    .selectAll('myOptions') 
    .data(specials)
    .enter()
    .append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; }) 

var gender_select = d3.select("#gender_sel")
    .selectAll('myOptions') 
    .data(gender)
    .enter()
    .append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; }) 