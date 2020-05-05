function highlight_selected_axis_title(x_key, y_key) {
    initialize_axis_title();

    d3.select(`#${x_key}`)
        .attr("font-weight", 800)
        .attr("fill", "black");

    d3.select(`#${y_key}`)
        .attr("font-weight", 800)
        .attr("fill", "black");
}

function initialize_axis_title() {

    var x_keys = ["poverty", "age", "income"];
    var y_keys = ["obseity", "smokes", "healthcareLow"];

    var combined_keys = x_keys.concat(y_keys);

    combined_keys.forEach(d => {
        d3.select(`#${d}`)
            .attr("font-weight", 100)
            .attr("fill", "gray");

    })

}


function createScatter(data, x_key, y_key) {

    d3.select("#scatter").html("")


    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 100, left: 120 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var X_domain_start = (data.map(d => d[`${x_key}`]).sort((a, b) => a - b)[0]) * 0.9
    var X_domain_end = (data.map(d => d[`${x_key}`]).sort((a, b) => a - b)[data.length - 1]) * 1.1
    var Y_domain_start = (data.map(d => d[`${y_key}`]).sort((a, b) => a - b)[0]) * 0.9
    var Y_domain_end = (data.map(d => d[`${y_key}`]).sort((a, b) => a - b)[data.length - 1]) * 1.1


    // Add X axis
    var x = d3.scaleLinear()
        .domain([X_domain_start, X_domain_end])
        .range([Y_domain_start, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("id", "X_Axis")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 30) + ")")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "poverty")
        .attr("class", "axis_select_x")
        .attr("font-weight", 100)
        .text("In Poverty(%)");

    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 60) + ")")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "age")
        .attr("class", "axis_select_x")
        .attr("font-weight", 100)
        .text("Age(Median)");

    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 90) + ")")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "income")
        .attr("class", "axis_select_x")
        .attr("font-weight", 100)
        .text("House Income(Median)");


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, Y_domain_end])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "obesity")
        .attr("class", "axis_select_y")
        .attr("font-weight", 100)
        .text("Obese (%)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 30)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "smokes")
        .attr("class", "axis_select_y")
        .attr("font-weight", 100)
        .text("Smokes (%)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("id", "healthcareLow")
        .attr("class", "axis_select_y")
        .attr("font-weight", 100)
        .text("Lacks Healthcare (%)");


    // Add Bubbles

    var node = svg.selectAll(".node")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + x(d[`${x_key}`]) + "," + y(d[`${y_key}`]) + ")";
        });

    node.append("circle")
        .transition()
        .duration(700)
        .attr("r", 25)
        .style("fill", "lightseagreen")
        .attr('fill-opacity', 0.3)

    node.append('text')
        .transition()
        .duration(700)
        .text(function (d) { return d.abbr })
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "white")
        .attr("dy", ".4em")

}

var path = "assets/data/data.csv"
var x_key = "poverty";
var y_key = "healthcareLow";

CreateAll();


function CreateAll() {
    d3.csv(path).then(d => {

        createScatter(d, x_key, y_key);
        highlight_selected_axis_title(x_key, y_key);

        $(".axis_select_x")
            .on("click", function (nothing) {
                x_key = d3.select(this).attr("id");
                CreateAll();
            });

        $(".axis_select_y")
            .on("click", function (nothing) {
                y_key = d3.select(this).attr("id");
                CreateAll();
            });

        var temp;
        var temp2;

        $(".axis_select_x")
            .on("mouseover", function () {
                temp = d3.select(this).attr("fill");
                temp2 = d3.select(this).attr("font-weight");

                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "lightseagreen")
                    .attr("font-weight", 800);
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", temp)
                    .attr("font-weight", temp2);
            });

        $(".axis_select_y")
            .on("mouseover", function () {
                temp = d3.select(this).attr("fill");
                temp2 = d3.select(this).attr("font-weight");

                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "lightseagreen")
                    .attr("font-weight", 800);
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", temp)
                    .attr("font-weight", temp2);
            });

    })
}

