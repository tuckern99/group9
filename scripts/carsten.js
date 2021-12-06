var sal_person_plot = function(data) {
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 50, bottom: 50, left: 70},
        width = 700 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var allGroup = ["Conscientiousness", "Agreeableness", "Extraversion", "Nueroticism", "Openess to Experience"]


    var yAccessor = d => d.Specialization

    var specials =  [... new Set(dataset.map(yAccessor))]
    var svg = d3.select("#plot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");


    var hiddenText = svg.append("text")
    .attr("class","hiddenText")

    var colorScale = d3.scaleOrdinal()
                        .domain(specials)
                        .range(d3.schemeSet2);

    var x = d3.scaleLinear()
        .domain([-8,4])
        .range([ 0, width ]);

    xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 1000000])
        .range([ height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    titleT = svg.append('text')
    .attr('x', 100 )
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .style('font-size', 20)
    .text('Salary and AMCAT Scores')
    
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
    .attr('x', -height +100 )
    .attr('y', -60 )
    .attr('transform', 'rotate(-90)')
    
    .style('font-size', 12)
    .text('Salary in Indian Rupees (1 INR = .013 USD) ');

    dots = svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.conscientiousness) } )
        .attr("cy", function (d) { return y(d.Salary) } )
        .attr("r", 5)
        .attr("class", function(d) { return d.Gender + " "+ d.Specialization.replace(/\s/g, '') + " " + d.ID })
        .attr("fill", d => colorScale(d.Specialization ))
        .on('mouseover', function(d, i){
            d3.select(this).attr("stroke-width", "10")
            d3.select(this).attr("fill", "#000000")
        })
        .on("mouseout", function(d, i) {
            d3.select(this).attr("stroke-width", "0")
            .attr("fill", d => colorScale(d.Specialization ))
        }) 
        dots.append("svg:title")
        .text(function(d) { return ("Conscientiousness Score: " + d.conscientiousness +"\nAgreeableness Score: " + d.agreeableness +"\nExtraversion Score: " + d.extraversion +
                                    "\nNueroticism Score: " + d.nueroticism + "\nOpeness to Experience Score: " + d.openess_to_experience + "\nSalary: ₹" + d.Salary+ "\nSpecialization: " + d.Specialization) })
        

                    

    hiddenText.on("change", function(d){
        var selectedOption = hiddenText.value
        // run the function with the selected option
        console.log(selectedOption.value)
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
    }
