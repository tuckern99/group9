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
                        .domain([data.Salary])
                        .range(["#8e0152","#900254","#920355","#940457","#970559","#99065a","#9b075c","#9d085e","#9f0960","#a10b61","#a30c63","#a50d65","#a70e66","#a91068","#ab116a","#ad136b","#af146d","#b1166f","#b31771","#b51972","#b71b74","#b91d76","#ba1e78","#bc217a","#be237b","#bf257d","#c1277f","#c22a81","#c42c83","#c52f84","#c73186","#c83488","#c9378a","#cb3a8c","#cc3d8e","#cd408f","#ce4391","#cf4693","#d04995","#d24c97","#d34f99","#d4529b","#d5569d","#d6599e","#d75ca0","#d85fa2","#d963a4","#d966a6","#da69a8","#db6caa","#dc6fab","#dd72ad","#de75af","#df78b1","#e07bb3","#e07eb4","#e181b6","#e284b8","#e386ba","#e489bb","#e48cbd","#e58ebf","#e691c1","#e794c2","#e796c4","#e899c5","#e99bc7","#ea9dc9","#eaa0ca","#eba2cc","#eca4cd","#eca7cf","#eda9d0","#eeabd1","#eeadd3","#efafd4","#f0b1d6","#f0b4d7","#f1b6d8","#f1b8d9","#f2bada","#f2bbdc","#f3bddd","#f4bfde","#f4c1df","#f5c3e0","#f5c5e1","#f5c6e2","#f6c8e3","#f6cae4","#f7cbe4","#f7cde5","#f8cfe6","#f8d0e7","#f8d2e8","#f9d3e8","#f9d5e9","#f9d6ea","#f9d8ea","#fad9eb","#fadaec","#fadcec","#fadded","#fadeed","#fadfee","#fae1ee","#fae2ef","#fae3ef","#fae4f0","#fae5f0","#fae6f1","#fae7f1","#fae8f1","#fae9f1","#faeaf2","#f9ebf2","#f9ecf2","#f9ecf2","#f9edf2","#f8eef2","#f8eff2","#f8eff2","#f7f0f1","#f7f1f1","#f7f1f1","#f6f2f0","#f6f2f0","#f5f3ef","#f5f3ef","#f4f3ee","#f4f4ed","#f3f4ed","#f3f4ec","#f2f5eb","#f2f5ea","#f1f5e9","#f1f5e7","#f0f5e6","#eff5e5","#eff5e4","#eef5e2","#edf5e1","#ecf5df","#ebf5de","#ebf5dc","#eaf5da","#e9f4d8","#e8f4d6","#e7f4d5","#e6f3d3","#e5f3d1","#e4f3ce","#e2f2cc","#e1f2ca","#e0f2c8","#dff1c6","#ddf1c3","#dcf0c1","#daefbe","#d9efbc","#d7eeb9","#d6eeb7","#d4edb4","#d3ecb2","#d1ecaf","#cfebac","#ceeaaa","#cce9a7","#cae8a4","#c8e8a1","#c7e79f","#c5e69c","#c3e599","#c1e496","#bfe393","#bde291","#bbe18e","#b9e08b","#b7df88","#b5de85","#b3dc83","#b1db80","#afda7d","#add97a","#abd878","#a9d675","#a7d572","#a5d46f","#a2d26d","#a0d16a","#9ed068","#9cce65","#9acd62","#98cc60","#96ca5d","#93c95b","#91c759","#8fc656","#8dc454","#8bc352","#89c150","#87c04d","#84be4b","#82bd49","#80bb47","#7eba45","#7cb843","#7ab641","#78b540","#76b33e","#74b23c","#72b03b","#70af39","#6ead38","#6cab36","#6aaa35","#68a833","#66a632","#64a531","#62a32f","#60a12e","#5ea02d","#5c9e2c","#5b9c2b","#599b2a","#579929","#559728","#539627","#529426","#509225","#4e9025","#4c8f24","#4b8d23","#498b22","#478a22","#468821","#448621","#438420","#418220","#3f811f","#3e7f1f","#3c7d1e","#3b7b1e","#397a1d","#38781d","#36761c","#34741c","#33721c","#31711b","#306f1b","#2e6d1b","#2d6b1a","#2b691a","#2a681a","#286619","#276419"])

    var x = d3.scaleLinear()
        .domain([-8,4])
        .range([ 0, width ]);

    xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 4000000])
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
        .attr("fill", d => colorScale(d.Salary))
        
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
