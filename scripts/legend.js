var legend = function (data) {

    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]
    var keys = specials
    console.log(keys)

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

    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]
    specials.unshift("all")
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
        
    var trait_select = d3.select("#trait_sel")
        .selectAll('myOptions') 
        .data(traits)
        .enter()
        .append('option')
        .text(function (d) { return d; }) 
        .attr("value", function (d) { return d; }) 
    
    var yScale = d3.scaleBand()
        .domain(items)
        .range([810, 0])
        .padding(0.1)

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
        heatmapRect.attr('y', function (d) { return yScale(Math.round(d.openess_to_experience*10)/10)})
        titleT.text = "Salary and Openess to Experience"

    }
    function conscientiousness(){
        dots.attr("cx", function (d) { return x(d.conscientiousness)})
        heatmapRect.attr('y', function (d) { return yScale(Math.round(d.conscientiousness*10)/10)})
        titleT.text = "Salary and Conscientiousness"

    }
    function agreeableness(){
        dots.attr("cx", function (d) { return x(d.agreeableness)})
        heatmapRect.attr('y', function (d) { return yScale(Math.round(d.agreeableness*10)/10)})
        titleT.text = "Salary and Agreeableness"


    }
    function nueroticism(){
        dots.attr("cx", function (d) { return x(d.nueroticism)})
        heatmapRect.attr('y', function (d) { return yScale(Math.round(d.nueroticism*10)/10)})
        titleT.text = "Salary and Nueroticism"
        

    }
    function extraversion(){
        dots.attr("cx", function (d) { return x(d.extraversion)})
        heatmapRect.attr('y', function (d) { return yScale(Math.round(d.extraversion*10)/10)})
        titleT.text = "Salary and Extraversion"
    
    
        }
        
    d3.select("#gender_sel").on("change", function(d){
        changeDots()
    })

    d3.select("#special_sel").on("change", function(d){
        changeDots()
        
    })

    d3.select("#trait_sel").on("change", function() {
        trait = d3.select("#trait_sel").property("value")
        console.log(trait)
        switch(trait){
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
    })

    var colorScale = d3.scaleOrdinal()
                        .domain(specials)
                        .range(d3.schemeSet2);

    function changeDots(){
        var gender = d3.select("#gender_sel").property("value")
        var spec = d3.select("#special_sel").property("value").replace(/\s/g, '')

        d3.selectAll(".f").style("opacity", 0)
        d3.selectAll(".m").style("opacity", 0)
        if( spec == "all"){
            switch(gender){
                case "male":
                    d3.selectAll(".m").style("opacity", 1)
                    .attr("fill", d => colorScale(d.Specialization ))
                    break;
                case "female":
                    d3.selectAll(".f").style("opacity", 1)
                    .attr("fill", d => colorScale(d.Specialization ))
                    break;
                default:
                    d3.selectAll(".f").style("opacity", 1)
                    .attr("fill", d => colorScale(d.Specialization ))
                    d3.selectAll(".m").style("opacity", 1)
                    .attr("fill", d => colorScale(d.Specialization ))
            }
        } else {
            switch(gender){
                case "male":
                    d3.selectAll(".m."+spec).style("opacity", 1)
                    break;
                case "female":
                    d3.selectAll(".f."+spec).style("opacity", 1)
                    break;
                default:
                    d3.selectAll(".f."+spec).style("opacity", 1)
                    .attr("fill", "pink")
                    d3.selectAll(".m."+spec).style("opacity", 1)
                    .attr("fill", "#89CFF0")
            }
        }
    }

    function filter_data(special='all', gender='all', data) {
        console.log(special)
        console.log(gender)
        temp_data = data.filter((d) => d.Specialization === special);
        console.log(temp_data)
        return temp_data;
    }


}
