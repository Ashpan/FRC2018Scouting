function analyzeSet(dataset) {

    var median = math.median(dataset);

    // split the data by the median
    var firstHalf = dataset.filter(function(f) { return f <= median });
    var secondHalf = dataset.filter(function(f) { return f >= median });

    // find the medians for each split
    var q1 = math.median(firstHalf);
    var q3 = math.median(secondHalf);

    var IQR = q3 - q1;

    return median;

}

function analyzeData() {

    var auto_switch_success = [];
    var auto_scale_success = [];
    var auto_vault = [];
    var teleop_switch_success = [];
    var teleop_scale_success = [];
    var teleop_opp_switch_success = [];
    var teleop_vault = [];

    var overall_teleop_success = [];

    var mostRecent = 7;

    if (data.overall_teleop_success.length < mostRecent) {
        overall_auto_success = data.overall_auto_success;
        overall_teleop_success = data.overall_teleop_success;
    }
    else {
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
            teleop_scale_success.push(data.teleop_scale_success[i]);
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
            auto_vault.push(data.auto_vault[j]);
        }
        j += 1;
    });

    console.log(auto_switch_success);
    console.log(teleop_vault);

    return [analyzeSet(auto_switch_success), 
            analyzeSet(auto_scale_success), 
            analyzeSet(auto_vault), 
            analyzeSet(teleop_switch_success),
            analyzeSet(teleop_scale_success),
            analyzeSet(teleop_opp_switch_success),
            analyzeSet(teleop_vault)];

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
        auto_vault: pushed[2],
        teleop_switch_success: pushed[3],
        teleop_scale_success: pushed[4],
        teleop_opp_switch_success: pushed[5],
        teleop_vault: pushed[6]
    }).then(function(done) {
        console.log("Successfully uploaded stats to statistics/" + team);
        $("#uploading").show();
        $('#uploading').html($('#uploading').html() + "<br>Successfully uploaded " + team + " to statistics.");
        setTimeout(function() {
            $("#uploading").hide();
        }, 750);
    });
}

function createGraph() {

    var data = [
        {month: 'Jan', A: 20, B: 5, C: 10},
        {month: 'Feb', A: 30, B: 10, C: 20}
    ];
     
    var xData = ["A", "B", "C"];
     
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
            width = 400 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
     
    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .35);
     
    var y = d3.scale.linear()
            .rangeRound([height, 0]);
     
    var color = d3.scale.category20();
     
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
     
    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
    var dataIntermediate = xData.map(function (c) {
        return data.map(function (d) {
            return {x: d.month, y: d[c]};
        });
    });
     
    var dataStackLayout = d3.layout.stack()(dataIntermediate);
     
    x.domain(dataStackLayout[0].map(function (d) {
        return d.x;
    }));
     
    y.domain([0,
        d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) { return d.y0 + d.y;})
        ])
      .nice();
     
    var layer = svg.selectAll(".stack")
            .data(dataStackLayout)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });
     
    layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y + d.y0);
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y + d.y0);
            })
            .attr("width", x.rangeBand());
     
    svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            
}