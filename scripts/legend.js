var traits = [ 'conscientiousness', 'agreeableness', 'extraversion', 'nueroticism', 'openess_to_experience']

var legend = function (data) {

    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]
    var keys = specials
    console.log(keys)

    var svg = d3.select("#legend")
    .append("svg")
    .append("g")


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
            .on('mouseover', function(d, i){
                spec = d3.select("#special_sel").property("value").replace(/\s/g, '')
                gender = d3.select("#gender_sel").property("value")
                i = i.replace(/\s/g, '')

                d3.select(this).style('stroke-width', 2)
                d3.select(this).style('stroke','black')

                if (gender == 'all') {
                    d3.selectAll(".f."+i).style('stroke-width', 1)
                    d3.selectAll(".f."+i).style('stroke', 'black')
                    d3.selectAll(".m."+i).style('stroke-width', 1)
                    d3.selectAll(".m."+i).style('stroke', 'black')
    
                    d3.selectAll(".f."+i).style('opacity', 1)
                    d3.selectAll(".m."+i).style('opacity', 1)
                }

                else {
                    temp = gender == "female" ? ".f." : ".m."
                    d3.selectAll(temp+i).style('stroke-width', 1)
                    d3.selectAll(temp+i).style('stroke', 'black')
    
                    d3.selectAll(temp+i).style('opacity', 1)
                }


            })
            .on("mouseout", function(d, i) {
                spec = d3.select("#special_sel").property("value").replace(/\s/g, '')
                gender = d3.select("#gender_sel").property("value")
                console.log(gender)

                d3.select(this).style('stroke-width', 0)

                i = i.replace(/\s/g, '')
                d3.selectAll(".f."+i).style('stroke-width', 0)
                d3.selectAll(".m."+i).style('stroke-width', 0)

                if (i != spec && spec != "all") {
                    d3.selectAll(".f."+i).style('opacity', 0)
                    d3.selectAll(".m."+i).style('opacity', 0)
                }
                if (gender != "all") {
                    temp_class = gender == "female" ? ".m." : ".f."
                    d3.selectAll(temp_class+i).style('opacity', 0)
                }
            }) 
            
        var x = d3.scaleLinear()
            .domain([-8,4])
            .range([ 0, 580 ]);


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
        .range([805, 0])
        .padding(0.1)

    function openess(){
        dots.attr("cx", function (d) { return x(d.openess_to_experience)})
        heatmapRect.attr('y', function (d) { return yScale(rounding(d.openess_to_experience))})
        titleT.text = "Salary and Openess to Experience"

    }
    function conscientiousness(){
        dots.attr("cx", function (d) { return x(d.conscientiousness)})
        heatmapRect.attr('y', function (d) { return yScale(rounding(d.conscientiousness))})
        titleT.text = "Salary and Conscientiousness"

    }
    function agreeableness(){
        dots.attr("cx", function (d) { return x(d.agreeableness)})
        heatmapRect.attr('y', function (d) { return yScale(rounding(d.agreeableness))})
        titleT.text = "Salary and Agreeableness"


    }
    function nueroticism(){
        dots.attr("cx", function (d) { return x(d.nueroticism)})
        heatmapRect.attr('y', function (d) { return yScale(rounding(d.nueroticism))})
        titleT.text = "Salary and Nueroticism"
        

    }
    function extraversion(){
        dots.attr("cx", function (d) { return x(d.extraversion)})
        heatmapRect.attr('y', function (d) { return yScale(rounding(d.extraversion))})
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

    var yAccessor = d => d.Specialization

    var spec =  [... new Set(dataset.map(yAccessor))]
    var colorScale = d3.scaleOrdinal()
                        .domain(spec)
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
                    .attr("fill", "#89CFF0")
                    break;
                case "female":
                    d3.selectAll(".f."+spec).style("opacity", 1)
                    .attr("fill", "pink")
                    break;
                default:
                    d3.selectAll(".f."+spec).style("opacity", 1)
                    .attr("fill", "pink")
                    d3.selectAll(".m."+spec).style("opacity", 1)
                    .attr("fill", "#89CFF0")
                    
            }
        }
    }


    function rounding(x){
        z = Math.round(x*10)/10
        x = Math.round(x) 
        if (z - Math.round(x) > .7){
            x = x+1
        } else if(z - Math.round(x) > .2){
            x = x+.5
        } 
        return x
    }
}
