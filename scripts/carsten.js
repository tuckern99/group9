var sal_person_plot = function(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 230, bottom: 50, left: 70},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var allGroup = ["Conscientiousness", "Agreeableness", "Extraversion", "Nueroticism", "Openess to Experience"]



    var svg = d3.select("#plot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var dropdownButton = d3.select("#selectButton")
        .selectAll('myOptions') 
        .data(allGroup)
        .enter()
        .append('option')
        .text(function (d) { return d; }) 
        .attr("value", function (d) { return d; }) 


    var colorScale = d3.scaleOrdinal()
                        .domain([-8,8])
                        .range(d3.schemeSet2);

    var x = d3.scaleLinear()
        .domain([-8,4])
        .range([ 0, width ]);

    xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 2000000])
        .range([ height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    titleT = svg.append('text')
    .attr('x', 100 )
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .style('font-size', 20)
    .text('Salary and Amcat Scores')
    
    // X label
    svg.append('text')
    .attr('x', width/2 )
    .attr('y', height+30)
    .attr('text-anchor', 'middle')
    .style('font-size', 12)
    .text('AMCAT Score');
    
    // Y label
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('x', -height )
    .attr('y', -60 )
    .attr('transform', 'rotate(-90)')
    
    .style('font-size', 12)
    .text('Salary');

    dots = svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.conscientiousness) } )
        .attr("cy", function (d) { return y(d.Salary) } )
        .attr("r", 1.6)
        .attr("fill", d => colorScale(d.conscientiousness))
        
    d3.select("#selectButton").on("change", function(d){

        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")

        // run the function with the selected option
        switch(selectedOption){
            case "Conscientiousness":
                conscientiousness() 
                break;
            case "Agreeableness":
                agreeableness()
                break;
            case "Extraversion":
                extraversion()
                break;
            case "Nueroticism":
                nueroticism()
                break;
            default:
                openess()
        }
    })

    function openess(){
        dots.attr("cx", function (d) { return x(d.openess_to_experience)})
        .attr("fill", d => colorScale(d.openess_to_experience))
        titleT.text = "Salary and Openess to Experience"

    }
    function conscientiousness(){
        dots.attr("cx", function (d) { return x(d.conscientiousness)})
        .attr("fill", d => colorScale(d.conscientiousness))
        titleT.text = "Salary and Conscientiousness"

    }
    function agreeableness(){
        dots.attr("cx", function (d) { return x(d.agreeableness)})
        .attr("fill", d => colorScale(d.agreeableness))
        titleT.text = "Salary and Agreeableness"

    }
    function nueroticism(){
        dots.attr("cx", function (d) { return x(d.nueroticism)})
        .attr("fill", d => colorScale(d.nueroticism))
        titleT.text = "Salary and Nueroticism"

    }
    function extraversion(){
        dots.attr("cx", function (d) { return x(d.extraversion)})
        .attr("fill", d => colorScale(d.extraversion))
        titleT.text = "Salary and Extraversion"

    }
    }
