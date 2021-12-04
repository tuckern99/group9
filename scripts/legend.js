var legend = function (data) {

    // List of groups = header of the csv files
    var keys = traits

    var svg = d3.select("#legend")
    .append("svg")
    .append("g")

    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    function highlight(d){
        console.log(d)
        // reduce opacity of all groups
        d3.selectAll(".myArea").style("opacity", .15)
        // exceptt the one that is hovered
        d3.select("."+d.path[0].__data__).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function(d){
        d3.selectAll(".myArea").style("opacity", 1)
    }
    // //////////
    // // Carsten Plot //
    // //////////
    var hiddenText = d3.select(".hiddenText")
   
    
    // //////////
    // // LEGEND //
    // //////////

    var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeSet2);

    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
        .data(keys)
        .enter()
        .append("rect")
            .attr("x", 000)
            .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return color(d)})
            .on("mouseover", function(d, i) {
            
                highlight(d)
                hoverOption(i)
            }) 
            .on("mouseleave", function(d, i) {
                noHighlight(d)
            }) 
            
        var x = d3.scaleLinear()
            .domain([-8,4])
            .range([ 0, 530 ]);

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 0 + size*1.2)
            .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", function(d, i) {
                highlight(d)
                hoverOption(i)
            }) 
            .on("mouseleave", function(d, i) {
                noHighlight(d)
            }) 
        
    var specials = ['all', 'computer science', 'computer engineer', 'information technology', 'computer application']
    var gender = ['all', 'male', 'female']
            
    // //////////////
    // // CONTROLS //
    // /////////////
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


    function hoverOption(selectedOption){
        // run the function with the selected option
        console.log(selectedOption)
        switch(selectedOption){
            case "conscientiousness":
                conscientiousness()
                break;
            case "agreeableness":
                agreeableness()
                
                break;
            case "extraversion":
                extraversion()
                
                break;
            case "nueroticism":
                
                nueroticism()
                break;
            default:
                openess()
        }
    }

    function openess(){
        dots.attr("cx", function (d) { return x(d.openess_to_experience)})
        titleT.text = "Salary and Openess to Experience"

    }
    function conscientiousness(){
        dots.attr("cx", function (d) { return x(d.conscientiousness)})
        titleT.text = "Salary and Conscientiousness"

    }
    function agreeableness(){
        dots.attr("cx", function (d) { return x(d.agreeableness)})
        titleT.text = "Salary and Agreeableness"


    }
    function nueroticism(){
        dots.attr("cx", function (d) { return x(d.nueroticism)})
        titleT.text = "Salary and Nueroticism"
        

    }
    function extraversion(){
        dots.attr("cx", function (d) { return x(d.extraversion)})
        titleT.text = "Salary and Extraversion"
    
    
        }

    d3.select("#gender_sel").on("change", function(d){
        var selectedOption = d3.select(this).property("value")
        // run the function with the selected option
        console.log(selectedOption)
        switch(selectedOption){
            case "male":
                d3.selectAll(".m").style("opacity", 1)
                d3.selectAll(".f").style("opacity", 0)
                break;
            case "female":
                d3.selectAll(".f").style("opacity", 1)
                d3.selectAll(".m").style("opacity", 0)
                break;
            default:
                d3.selectAll(".f").style("opacity", 1)
                d3.selectAll(".m").style("opacity", 1)
        }
    })

        }
