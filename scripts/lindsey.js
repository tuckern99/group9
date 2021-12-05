var traits = [ 'conscientiousness', 'agreeableness', 'extraversion', 'nueroticism', 'openess_to_experience']

var area_graph = function(o_data) {

    data = setdata(o_data);

    console.log(data)
    
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 250, bottom: 50, left: 20},
        width = 660 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

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
        .domain([50000, 500000])
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
        .y1(function(d) { return y(d[1]);  })

    // Show the areas
    areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", function(d) { return "myArea " + d.key })
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)              

    // Add the brushing
    areaChart
        .append("g")
        .attr("class", "brush")
        // .call(brush);

    

    d3.select("#special_sel").on("change", function(){
        special = d3.select("#special_sel").property("value")

        data = o_data.filter((d) => d.Specialization === special);
        data = setdata(data);
        console.log(special)
        console.log(data)

        stackedData = d3.stack()
            .keys(keys)
            (data)

        var area = d3.area()
            .x(function(d) { return x(d.data.Salary); })
            .y0(function(d) { return height; })
            .y1(function(d) { return y(d[1]);  })

        areaChart
            .transition()
            .attr("d", area) 
            
    })
   
}



function setdata(data) {
    new_data = [];
    increment = 25000;
    num_increments = 19;

    let ceiling = d3.max( data.map(function(d){return d.Salary}), s => +s)
    let lower = d3.min( data.map(function(d){return d.Salary}), s => +s) 
    
    let upper = lower + increment;

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

