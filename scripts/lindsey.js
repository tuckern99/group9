var traits = ['conscientiousness', 'agreeableness', 'extraversion', 'nueroticism', 'openess_to_experience']

var area_graph = function(data) {

    data = setdata(data);

    console.log(data)
    
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 230, bottom: 50, left: 50},
        width = 660 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#areagraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    
     // //////////
    // // GENERAL //
    // //////////

    // List of groups = header of the csv files
    var keys = traits

    // color palette
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet2);

    //stack the data?
    var stackedData = d3.stack()
        .keys(keys)
        (data)



    // //////////
    // // AXIS //
    // //////////

    // // Add X axis
    var x = d3.scaleLinear()
        .domain([50000, 200000])
        .range([ 0, width ]);

    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5))

    // // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height+40 )
        .text("Salary");

    // Add Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", -20 )
        .text("AMCAT Personality Score")
        .attr("text-anchor", "start")

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-4, 1])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y).ticks(5))



    //////////
    // BRUSHING AND CHART //
    //////////

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Create the scatter variable: where both the circles and the brush take place
    var areaChart = svg.append('g')
        .attr("clip-path", "url(#clip)")

    // Area generator
    var area = d3.area()
        .x(function(d) { return x(d.data.Salary); })
        .y0(function(d) { return height; })
        .y1(function(d) { return y(d[1]); })

    // Show the areas
    areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", function(d) { return "myArea " + d.key })
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)
        .on('mouseover', function () {
            d3.selectAll(".myArea") 
                .attr("opacity", ".1");
            d3.select(this)
                .attr("opacity", "1");  
        })
        .on('mouseout', function(){
            d3.selectAll(".myArea")
                .attr("opacity", "1")
          })               

    // Add the brushing
    areaChart
        .append("g")
        .attr("class", "brush")
        // .call(brush);

    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    var highlight = function(d){
        console.log(d)
        // reduce opacity of all groups
        d3.selectAll(".myArea").style("opacity", .1)
        // exceptt the one that is hovered
        d3.select("."+d.path[0].__data__).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function(d){
        d3.selectAll(".myArea").style("opacity", 1)
    }



    // //////////
    // // LEGEND //
    // //////////

    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
        .data(keys)
        .enter()
        .append("rect")
            .attr("x", 400)
            .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return color(d)})
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 400 + size*1.2)
            .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)
   
}

function setdata(data) {
    new_data = [];
    increment = 25000;
    num_increments = 19;

    let lower = 25000
    let upper = lower + increment;

    console.log(data[0].conscientiousness)

    for (let i = 0; i < num_increments; i++) {
        let consc = [];
        let agree = [];
        let extra = [];
        let nuero = [];
        let open = [];

        //go through data
        for (let k = 0; k < data.length; k++) {

            if( data[k].Salary > lower && data[k].Salary < upper ) {
                consc.push(data[k].conscientiousness);
                agree.push(data[k].agreeableness)
                extra.push(data[k].extraversion)
                nuero.push(data[k].nueroticism)
                open.push(data[k].openess_to_experience)
            }
        }

        new_data.push({
            'Salary' : upper,
            'conscientiousness' : d3.mean(consc), 
            'agreeableness' : d3.mean(agree), 
            'extraversion' : d3.mean(extra), 
            'nueroticism' : d3.mean(nuero), 
            'openess_to_experience': d3.mean(open)
        })

        lower += increment;
        upper += increment;

    }

    return new_data;
    
}

