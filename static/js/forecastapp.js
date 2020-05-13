var y_filters = [["Furniture", "Office Supplies", "Technology"],
["Bookcases", "Furnishings", "Tables", "Chairs"],
["Appliances", "Binders", "Envelopes", "Fasteners", "Labels", "Paper", "Storage", "Supplies", "Art"],
["Accessories", "Machines", "Phones", "Copiers"],
["Africa", "Asia Pacific", "Europe", "LATAM", "USCA"],
["Central Africa", "Eastern Africa", "North Africa", "Southern Africa", "Western Africa"],
["Central Asia", "Eastern Asia", "Oceania", "Southeastern Asia", "Southern Asia", "Western Asia"],
["Eastern Europe", "Northern Europe", "Southern Europe", "Western Europe"],
["Caribbean", "Central America", "South America"],
["Canada", "Central US", "Eastern US", "Southern US", "Western US"]];

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




// $(".y_filter")
//     .on("mouseover", function () {
//         temp = d3.select(this).attr("fill");
//         temp2 = d3.select(this).attr("font-weight");

//         d3.select(this)
//             .transition()
//             .duration(100)
//             .attr("fill", "lightseagreen")
//             .attr("font-weight", 800);
//     })
//     .on("mouseout", function () {
//         d3.select(this)
//             .transition()
//             .duration(100)
//             .attr("fill", temp)
//             .attr("font-weight", temp2);
//     });



// function CreateAll() {
//     d3.csv(path).then(d => {

//         createScatter(d, x_key, y_key);
//         highlight_selected_axis_title(x_key, y_key);

//         $(".axis_select_x")
//             .on("click", function (nothing) {
//                 x_key = d3.select(this).attr("id");
//                 CreateAll();
//             });

//         $(".axis_select_y")
//             .on("click", function (nothing) {
//                 y_key = d3.select(this).attr("id");
//                 CreateAll();
//             });

//         var temp;
//         var temp2;

//         $(".axis_select_x")
//             .on("mouseover", function () {
//                 temp = d3.select(this).attr("fill");
//                 temp2 = d3.select(this).attr("font-weight");

//                 d3.select(this)
//                     .transition()
//                     .duration(100)
//                     .attr("fill", "lightseagreen")
//                     .attr("font-weight", 800);
//             })
//             .on("mouseout", function () {
//                 d3.select(this)
//                     .transition()
//                     .duration(100)
//                     .attr("fill", temp)
//                     .attr("font-weight", temp2);
//             });

//         $(".axis_select_y")
//             .on("mouseover", function () {
//                 temp = d3.select(this).attr("fill");
//                 temp2 = d3.select(this).attr("font-weight");

//                 d3.select(this)
//                     .transition()
//                     .duration(100)
//                     .attr("fill", "lightseagreen")
//                     .attr("font-weight", 800);
//             })
//             .on("mouseout", function () {
//                 d3.select(this)
//                     .transition()
//                     .duration(100)
//                     .attr("fill", temp)
//                     .attr("font-weight", temp2);
//             });

//     })
// }

