function analyzeSet(dataset) {

    if (dataset.length <= 0) {
        return 0;
    }

    var median = math.median(dataset);

    // // split the data by the median
    // var firstHalf = dataset.filter(function(f) {
    //     return f <= median
    // });
    // var secondHalf = dataset.filter(function(f) {
    //     return f >= median
    // });

    // // find the medians for each split
    // var q1 = math.median(firstHalf);
    // var q3 = math.median(secondHalf);

    // var IQR = q3 - q1;

    return median;

}

function analyzeData() {

    var auto_switch_success = [];
    var auto_scale_success = [];
    // var auto_vault = [];
    var teleop_switch_success = [];
    var teleop_scale_winning_success = [];
    var teleop_scale_losing_success = [];
    var teleop_opp_switch_success = [];
    var teleop_vault = [];

    var overall_teleop_success = [];

    var switch_accuracy = 0;
    var switch_accuracy_lst = [];

    var switch_opp_accuracy = 0;
    var switch_opp_accuracy_lst = [];

    var scale_winning_accuracy = 0;
    var scale_winning_accuracy_lst = [];

    var scale_losing_accuracy = 0;
    var scale_losing_accuracy_lst = [];

    var scale_overall_accuracy = 0;
    var scale_overall_accuracy_lst = [];


    for (var x = 0; x < data.teleop_vault.length; x++) {
        switch_accuracy_lst.push(data.teleop_switch_success[x] / (data.teleop_switch_success[x] + data.teleop_switch_fail[x]));
        switch_opp_accuracy_lst.push(data.teleop_opp_switch_success[x] / (data.teleop_opp_switch_success[x] + data.teleop_opp_switch_fail[x]));
        scale_winning_accuracy_lst.push(data.teleop_scale_winning_success[x] / (data.teleop_scale_winning_success[x] + data.teleop_scale_winning_fail[x]));
        scale_losing_accuracy_lst.push(data.teleop_scale_losing_success[x] / (data.teleop_scale_losing_success[x] + data.teleop_scale_losing_fail[x]));
        scale_overall_accuracy_lst.push((data.teleop_switch_success[x] + data.teleop_opp_switch_success[x] + data.teleop_scale_winning_success[x] + data.teleop_scale_losing_success[x]) / (data.teleop_switch_success[x] + data.teleop_switch_fail[x] + data.teleop_opp_switch_success[x] + data.teleop_opp_switch_fail[x] + data.teleop_scale_winning_success[x] + data.teleop_scale_winning_fail[x] + data.teleop_scale_losing_success[x] + data.teleop_scale_losing_fail[x]));
    }

    for (var x = 0; x < switch_accuracy_lst.length; x++) {
        if (isNaN(switch_accuracy_lst[x])) {
            switch_accuracy_lst[x] = 1
        }
        if (isNaN(switch_opp_accuracy_lst[x])) {
            switch_opp_accuracy_lst[x] = 1
        }
        if (isNaN(scale_winning_accuracy_lst[x])) {
            scale_winning_accuracy_lst[x] = 1
        }
        if (isNaN(scale_losing_accuracy_lst[x])) {
            scale_losing_accuracy_lst[x] = 1
        }
        if (isNaN(scale_overall_accuracy_lst[x])) {
            scale_overall_accuracy_lst[x] = 1
        }

    }


    switch_accuracy = Math.trunc(math.mean(switch_accuracy_lst) * 100);
    switch_opp_accuracy = Math.trunc(math.mean(switch_opp_accuracy_lst) * 100);
    scale_winning_accuracy = Math.trunc(math.mean(scale_winning_accuracy_lst) * 100);
    scale_losing_accuracy = Math.trunc(math.mean(scale_losing_accuracy_lst) * 100);
    scale_overall_accuracy = Math.trunc(math.mean(scale_overall_accuracy_lst) * 100);

    var mostRecent = 7;

    if (data.overall_teleop_success.length < mostRecent) {
        overall_auto_success = data.overall_auto_success;
        overall_teleop_success = data.overall_teleop_success;
    } else {
        overall_auto_success = data.overall_auto_success.slice(data.overall_auto_success.length - mostRecent);
        overall_teleop_success = data.overall_teleop_success.slice(data.overall_teleop_success.length - mostRecent);
    }

    var i = data.overall_teleop_success.length - mostRecent;
    if (i < 0) {
        i = 0;
    }
    overall_teleop_success.forEach(val => {
        if (val > 0) {
            teleop_switch_success.push(data.teleop_switch_success[i]);
            teleop_scale_winning_success.push(data.teleop_scale_winning_success[i]);
            teleop_scale_losing_success.push(data.teleop_scale_losing_success[i]);
            teleop_opp_switch_success.push(data.teleop_opp_switch_success[i]);
            teleop_vault.push(data.teleop_vault[i]);
        }
        i += 1;
    });

    var j = data.overall_auto_success.length - mostRecent;
    if (j < 0) {
        j = 0;
    }
    overall_auto_success.forEach(val => {
        if (val > 0) {
            auto_switch_success.push(data.auto_switch_success[j]);
            auto_scale_success.push(data.auto_scale_success[j]);
            // auto_vault.push(data.auto_vault[j]);
        }
        j += 1;
    });

    console.log(auto_switch_success);
    console.log(teleop_vault);


    // createGraph();
    console.log(switch_opp_accuracy_lst);
    return [analyzeSet(auto_switch_success),
        analyzeSet(auto_scale_success),
        // analyzeSet(auto_vault),
        analyzeSet(teleop_switch_success),
        analyzeSet(teleop_scale_winning_success),
        analyzeSet(teleop_scale_losing_success),
        analyzeSet(teleop_opp_switch_success),
        analyzeSet(teleop_vault),
        switch_accuracy,
        switch_opp_accuracy,
        scale_winning_accuracy,
        scale_losing_accuracy,
        scale_overall_accuracy
    ];

}

function pushToStats(team) {
    console.log(data.team_number);
    console.log(data.auto_switch_success);
    $('#uploading').html("");

    pushed = analyzeData();

    firebase.database().ref('statistics/').child(team).set({
        team: team,
        auto_switch_success: pushed[0],
        auto_scale_success: pushed[1],
        teleop_switch_success: pushed[2],
        teleop_scale_winning_success: pushed[3],
        teleop_scale_losing_success: pushed[4],
        teleop_opp_switch_success: pushed[5],
        teleop_vault: pushed[6],
        switch_accuracy: pushed[7],
        switch_opp_accuracy: pushed[8],
        scale_winning_accuracy: pushed[9],
        scale_losing_accuracy: pushed[10],
        scale_overall_accuracy: pushed[11]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
        $("#uploading").show();
        $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
        setTimeout(function() {
            $("#uploading").hide();
        }, 750);
    });
}

// function createGraph() {

//     if (typeof d3 !== 'undefined') {

//         console.log(data);

//         // var graphData = [
//         //     {"match":5,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":11,   "Auto Switch":1,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":17,   "Auto Switch":5,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":23,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":29,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":36,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":42,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":48,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":54,   "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":60,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":66,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3},
//         //     {"match":72,  "Auto Switch":2,    "Auto Scale":5, "Auto Vault":3}];
//         // var key = ["Auto Switch", "Auto Scale", "Auto Vault"];
//         // var colors = ["#FF0000", "#00FF00" , "#0000FF"];

//         var graphData = [];
//         for (var i = 0; i < data.match_number.length; i++) {
//             bar = {
//                 "match": data.match_number[i],
//                 "Auto Switch": data.auto_switch_success[i],
//                 "Auto Scale": data.auto_scale_success[i],
//                 "Auto Vault": data.auto_vault[i],
//                 "Teleop Switch": data.teleop_switch_success[i],
//                 "Teleop Scale": data.teleop_scale_success[i],
//                 "Teleop Opp Switch": data.teleop_opp_switch_success[i],
//                 "Teleop Vault": data.teleop_vault[i]
//             };
//             graphData.push(bar);
//         };

//         var key = ["Auto Switch", "Auto Scale", "Auto Vault", "Teleop Switch", "Teleop Scale", "Teleop Opp Switch", "Teleop Vault"];
//         var colors = ["#FFEB3B", "#FF9800", "#CDDC39", "#2196F3", "#3F51B5", "#9C27B0", "#E91E63"];


//         $('#stacked-bar').html("");

//         initStackedBarChart.draw({
//             data: graphData,
//             key: key,
//             colors: colors,
//             element: 'stacked-bar'
//         });

//     }

// }


// var initStackedBarChart = {
//     draw: function(config) {
//         me = this,
//             domEle = config.element,
//             stackKey = config.key,
//             stackColors = config.colors,
//             graphData = config.data,
//             margin = {
//                 top: 20,
//                 right: 20,
//                 bottom: 100,
//                 left: 30
//             },
//             width = 700 - margin.left - margin.right,
//             height = 600 - margin.top - margin.bottom,
//             xScale = d3.scaleBand().range([0, width]).padding(0.1),
//             yScale = d3.scaleLinear().range([height, 0]),
//             color = d3.scaleOrdinal()
//             .domain(stackKey)
//             .range(stackColors),
//             xAxis = d3.axisBottom(xScale),
//             yAxis = d3.axisLeft(yScale),
//             svg = d3.select("#" + domEle).append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         var stack = d3.stack()
//             .keys(stackKey)
//             .order(d3.stackOrderNone)
//             .offset(d3.stackOffsetNone);

//         var layers = stack(graphData);
//         // graphData.sort(function(a, b) { return b.total - a.total; });
//         xScale.domain(graphData.map(function(d) {
//             return d.match;
//         }));
//         yScale.domain([0, d3.max(layers[layers.length - 1], function(d) {
//             return d[0] + d[1];
//         })]).nice();

//         var layer = svg.selectAll(".layer")
//             .data(layers)
//             .enter().append("g")
//             .attr("class", "layer")
//             .style("fill", function(d, i) {
//                 return color(i);
//             });

//         layer.selectAll("rect")
//             .data(function(d) {
//                 return d;
//             })
//             .enter().append("rect")
//             .attr("x", function(d) {
//                 return xScale(d.data.match);
//             })
//             .attr("y", function(d) {
//                 return yScale(d[1]);
//             })
//             .attr("height", function(d) {
//                 return yScale(d[0]) - yScale(d[1]);
//             })
//             .attr("width", xScale.bandwidth());

//         svg.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + (height + 5) + ")")
//             .call(xAxis);

//         svg.append("g")
//             .attr("class", "axis axis--y")
//             .attr("transform", "translate(0,0)")
//             .call(yAxis);

//         svg.append("text")
//             .attr("class", "x label")
//             .attr("text-anchor", "end")
//             .attr("x", width / 2 + 20)
//             .attr("y", height + 50)
//             .text("Match Number");

//         svg.append("text")
//             .attr("class", "y label")
//             .attr("text-anchor", "end")
//             .attr("y", 6)
//             .attr("dy", ".75em")
//             .attr("transform", "rotate(-90)")
//             .text("Cumulative # of Cubes");

//         // add legend   
//         var legend = svg.append("g")
//             .attr("class", "legend")
//             .attr("height", 1000)
//             .attr("width", 200)
//             .attr('transform', 'translate(-120,0)')


//         legend.selectAll('rect')
//             .data(stackColors)
//             .enter()
//             .append("rect")
//             .attr("x", width - 65)
//             .attr("y", function(d, i) {
//                 return 140 - i * 20;
//             })
//             .attr("width", 10)
//             .attr("height", 10)
//             .style("fill", function(d) {
//                 var color = d;
//                 return color;
//             })

//         legend.selectAll('text')
//             .data(stackKey)
//             .enter()
//             .append("text")
//             .attr("x", width - 52)
//             .attr("y", function(d, i) {
//                 return 140 - i * 20 + 9;
//             })
//             .text(function(d) {
//                 var text = d;
//                 return text;
//             });
//     }
// }