var traits = [ 'conscientiousness', 'agreeableness', 'extraversion', 'nueroticism', 'openess_to_experience']


var boxplot = function(data) {

    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 180, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#boxplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal()
    .domain(specials)
    .range(d3.schemeSet2);

    // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) {return d.Specialization;})
        .rollup(function(d) {
        q1 = d3.quantile(d.map(function(g) { return g.Salary;}).sort(d3.ascending),.25)
        median = d3.quantile(d.map(function(g) { return g.Salary;}).sort(d3.ascending),.5)
        q3 = d3.quantile(d.map(function(g) { return g.Salary;}).sort(d3.ascending),.75)
        interQuantileRange = q3 - q1
        min = Math.abs(q1 - 1.5 * interQuantileRange)
        //   max = q3 + 1.5 * interQuantileRange
        //   min = d3.min(d.map( function(g) {return g.Salary} ))
        max = q3 + 1.5 * interQuantileRange
        return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
        })
        .entries(data)

    // Show the X scale
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(specials)
        .paddingInner(1)
        .paddingOuter(.5)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .each(function (d, i) {
                label = d3.select(this).text();
                label = label.replace('engineering', 'eng.')
                label = label.replace('communication', 'comm.')
                d3.select(this).text(label);
            })
            .style("text-anchor", "end")
            .style("font-size", "13px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
            

    // Show the Y scale
    var y = d3.scaleLinear()
        .domain([0, 900000 ])
        .range([height, 0])
    svg.append("g").call(d3.axisLeft(y))
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -22)
    .attr("x", 20)
    .attr("dy", ".75em")
    .attr("font-size", "14px")
    .text("Salary");



    // Show the main vertical line
    svg
        .selectAll("vertLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", function(d){return(x(d.key))})
        .attr("x2", function(d){return(x(d.key))})
        .attr("y1", function(d){return(y(d.value.min))})
        .attr("y2", function(d){return(y(d.value.max))})
        .attr("stroke", "black")
        .style("width", 40)

    // rectangle for the main box
    var boxWidth = 30
    svg
        .selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
            .attr("x", function(d){return(x(d.key)-boxWidth/2)})
            .attr("y", function(d){return(y(d.value.q3))})
            .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
            .attr("width", boxWidth )
            .attr("stroke", "black")
            .style("fill",function(d) { return color(d.key); })

    // Show the median
    svg
        .selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.value.median))})
        .attr("y2", function(d){return(y(d.value.median))})
        .attr("stroke", "black")
        .style("width", 80)

}