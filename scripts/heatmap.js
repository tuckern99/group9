var heatmap = function (data) {

    var margins = {top: 10, right: 0, bottom: 240, left: 30},
        width = 600 - margins.left - margins.right,
        height = 1300 - margins.top - margins.bottom;

    var svg = d3
    .select('#heatmap')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('id', 'plot-area')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')

    items = [];
    for (var i = -7; i <= 3.4; i +=0.1) {
        items.push(Math.round(i*10)/10);
    }
    console.log(items)
    var yAccessor = d => d.Specialization
    var groups =  [... new Set(dataset.map(yAccessor))]

    var conscientiousness = d => Math.round(d.conscientiousness*10)/10
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


  // Build y scale and axis:
    var yScale = d3.scaleBand()
        .domain(items)
        .range([height-margins.bottom, 0])
        .padding(0.1)
    
    var yaxis = svg.append('g')
        .call(d3.axisLeft(yScale))
        .select('.domain').remove()

  // build color scale
    
    var colorScale = d3.scaleOrdinal()
        .range(d3.schemeSet2)
        .domain(groups)

  // add the squares
    heatmapRect = svg.selectAll()
        .data(data)
        .enter()
        .append('rect')
            .attr('x', d => xScale(d.Specialization))
            .attr('y', d => yScale( Math.round(d.conscientiousness*10)/10))
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .style('fill', d => colorScale(d.Specialization))
            .style('stroke', 'black')
            .style('stroke-width', 4)
            .attr("class", function(d) { return "heatmap " + d.Gender + " "+ d.Specialization.replace(/\s/g, '') + " " + d.ID })
            .style('stroke-opacity', 0)
            .style('fill-opacity', 0.2)
            .on('mouseover', darken_square)
            .on('mouseleave', function(d) {
                lighten_square(d, this) // need to explicitly pass this
            })
            .on('click', change_border_color)

  // three functions that change the tooltip when user hovers / moves in / leaves a cell
  // because we use the function key word to declare them, we can put them down
  // here and they will be hoisted.

  function darken_square(d) {
    d3.select(this)
      .style('fill-opacity', 1)
      .style('stroke-opacity', 1)
      // shrink a bit to make room for stroke, now visible
      .attr('x', d => xScale(d.Specialization) + 2)
      .attr('width', xScale.bandwidth() - 4)
      .attr('height', yScale.bandwidth() - 4)
  }


  function lighten_square(d, ref) {
    d3.select(ref)
      .style('stroke-opacity', 0)
      .style('fill-opacity', 0.7)
  }

  function change_border_color(d) {
    let target = d3.select(this)
    let color = target.style('stroke') // read the current stroke value
    target.style('stroke', color == 'red' ? 'blue' : 'red')
  }
}