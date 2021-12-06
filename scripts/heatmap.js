var heatmap = function (data) {

    var margins = {top: 10, right: 0, bottom: 240, left: 50},
        width = 600 - margins.left - margins.right,
        height = 1200 - margins.top - margins.bottom;

    var svg = d3
    .select('#heatmap')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('id', 'plot-area')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')

    items = [];
    for (var i = -7; i <= 3.4; i +=0.5) {
        items.push(Math.round(i*10)/10);
    }
    console.log(items)
    var yAccessor = d => d.Specialization
    var groups =  [... new Set(dataset.map(yAccessor))]

    var conscientiousness = d => rounding(d.conscientiousness)
    var vars =  [... new Set(dataset.map(conscientiousness))].sort(function(a,b) { return a - b; } )
    
    
    var xScale = d3.scaleBand()
        .domain(groups)
        .range([0, width-margins.left])
        .padding(0.1)

    var xaxis = svg.append('g')
        .attr("transform", "translate(0," + (height-margins.bottom) + ")")
        .call(d3.axisBottom(xScale)).selectAll("text")
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


    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]

  // Build y scale and axis:
    var yScale = d3.scaleBand()
        .domain(items)
        .range([height-margins.bottom, 0])
        .padding(0.1)
    
    var yaxis = svg.append('g')
        .call(d3.axisLeft(yScale))
        .select('.domain').remove()

  // build color scale
    var genderColor = d3.scaleOrdinal()
        .domain(["m","f"])
        .range(["#89CFF0","pink"]);

    var colorScale = d3.scaleOrdinal()
        .domain(specials)
        .range(d3.schemeSet2);

    svg.append('text')
        .attr('x', -55)
        .attr('y', -35)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('font-size', 14)
        .text('AMCAT Score');
        
  // add the squares
    heatmapRect = svg.selectAll()
        .data(data)
        .enter()
        .append('rect')
            .attr('x', d => xScale(d.Specialization))
            .attr('y', d => yScale(rounding(d.conscientiousness)))
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .style('fill', d => colorScale(d.Specialization))
            .style('stroke', 'black')
            .style('stroke-width', 4)
            .attr("class", function(d) { return  d.Gender + " "+ d.Specialization.replace(/\s/g, '') + " "+ "heatmap "  + d.ID })
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0.05)
            .on('mouseover', darken_square)
            .on('mouseleave', function(d) {
                lighten_square(d, this)
            })
            heatmapRect.append("svg:title").text(function(d) { return ("Conscientiousness Score: " + rounding(d.conscientiousness) +"\nAgreeableness Score: " + rounding(d.agreeableness) +"\nExtraversion Score: " + rounding(d.extraversion) +
                                    "\nNueroticism Score: " +  rounding(d.nueroticism) + "\nOpeness to Experience Score: " + rounding(d.openess_to_experience)) })

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
    function darken_square(d) {
        d3.select(this)
        .style('stroke-opacity', 1)

    }


    function lighten_square(d, ref) {
        d3.select(ref)
        .style('stroke-opacity', 0)
    }

}