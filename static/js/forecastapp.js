path = "forecastresults.csv"

d3.csv(path).then(d => {

    var x_date = ["2016 1Q", , , "2Q", , , "3Q", , , "4Q", , , "2017 1Q", , , "2Q", , , "3Q", , , "4Q", , , "2018 1Q", , , "2Q", , , "3Q", , , "4Q", , , "2019 1Q", , , "2Q", , , "3Q", , , "4Q", , ,
        "2020 1Q", , , "2Q", , , "3Q", , , "4Q", , , "2021 1Q", , , "2Q", , , "3Q", , , "4Q", , , ];
        
    var test = d
    console.log(test)
    // console.log(d[0]["y"].length)


    // var data1 = d[0]["y"];

    // var data2 = d[1]["y"];


    // // set the dimensions and margins of the graph
    // var margin = { top: 10, right: 30, bottom: 30, left: 50 },
    //     width = 460 - margin.left - margin.right,
    //     height = 400 - margin.top - margin.bottom;

    // // append the svg object to the body of the page
    // var svg = d3.select("#chart")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform",
    //         "translate(" + margin.left + "," + margin.top + ")");

    // // Initialise a X axis:
    // var x = d3.scaleLinear().range([0, width]);
    // var xAxis = d3.axisBottom().scale(x);
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .attr("class", "myXaxis")

    // // Initialize an Y axis
    // var y = d3.scaleLinear().range([height, 0]);
    // var yAxis = d3.axisLeft().scale(y);
    // svg.append("g")
    //     .attr("class", "myYaxis")

    // // Create a function that takes a dataset as input and update the plot:
    // function update(data) {

    //     // Create the X axis:
    //     x.domain([0, d3.max(data, function (d) { return d.ser1 })]);
    //     svg.selectAll(".myXaxis").transition()
    //         .duration(3000)
    //         .call(xAxis);

    //     // create the Y axis
    //     y.domain([0, d3.max(data, function (d) { return d.ser2 })]);
    //     svg.selectAll(".myYaxis")
    //         .transition()
    //         .duration(3000)
    //         .call(yAxis);

    //     // Create a update selection: bind to the new data
    //     var u = svg.selectAll(".lineTest")
    //         .data([data], function (d) { return d.ser1 });

    //     // Updata the line
    //     u
    //         .enter()
    //         .append("path")
    //         .attr("class", "lineTest")
    //         .merge(u)
    //         .transition()
    //         .duration(3000)
    //         .attr("d", d3.line()
    //             .x(function (d) { return x(d.ser1); })
    //             .y(function (d) { return y(d.ser2); }))
    //         .attr("fill", "none")
    //         .attr("stroke", "steelblue")
    //         .attr("stroke-width", 2.5)
    // }

    // // At the beginning, I run the update function on the first dataset:
    // update(data1)



})








var y_filters = [["Furniture", "Office Supplies", "Technology"],
["Bookcases", "Furnishings", "Tables", "Chairs"],
["Appliances", "Binders", "Envelopes", "Fasteners", "Labels", "Paper", "Storage", "Supplies", "Art"],
["Accessories", "Machines", "Phones", "Copiers"],
["Africa", "Asia Pacific", "Europe", "LATAM", "USCA"]]



var input = 0;
var new_filter = y_filters[input];

width = 400;
height = 300;

var svg = d3.select("#y_filters")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

var g = svg.append("g").attr("transform", "translate(32," + (height / 4) + ")");

var filter = g.selectAll(".y_filter").data(new_filter)

filter.enter()
    .append("text")
    .attr("class", "y_filter")
    .attr("id", "y_filter")
    .merge(filter)
    .text(d => d)
    .attr("y", function (d, i) { return 30 * i });

function update_filter() {

    var t = d3.transition()
        .duration(750);


    var input = parseInt(document.getElementById("keyinput").value);
    var new_filter = y_filters[input];

    var filter = g.selectAll(".y_filter").data(new_filter)

    filter.exit().remove();

    filter.enter()
        .append("text")
        .attr("class", "y_filter")
        .attr("id", "y_filter")
        .merge(filter)
        .transition(t)
        .text(d => d)
        .attr("y", function (d, i) { return 20 * i });

}


d3.select("#Main").append("input")
    .attr("value", 0)
    .attr("id", "keyinput");

d3.select("#Main")
    .append("button")
    .text("change data")
    .on("click", update_filter)



function PlotChart(data) {
    var chartbody = d3.select("cbody")
    chartbody.html("");

    var dataArray = [];
    var dataCategories = [];

    data.forEach(d => {
        dataArray.push(d.Score);
        dataCategories.push(d.Name);
    });

    // svg container
    var height = 600;
    var width = 1100;

    // margins
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // chart area minus margins
    var chartHeight = height - margin.top - margin.bottom;
    var chartWidth = width - margin.left - margin.right;

    // create svg container
    var svg = d3.select("cbody").append("svg")
        .attr("height", height)
        .attr("width", width);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray)])
        .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    d3.selectAll(".tick")
        .selectAll('text')
        .attr("transform", "translate(0,20) rotate(30)")

    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);

    // Create the rectangles using data binding
    var barsGroup = chartGroup.selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "lightseagreen");

}