$(document).ready(function() {
    update($("#events").find(":selected").val());
    $('select[name=dropdown]').change(function() {
        update($("#events").find(":selected").val());
    });
});

function update(event) {
    const api = 'https://www.thebluealliance.com/api/v3/event/' + event + '/matches?X-TBA-Auth-Key=aSeFMfnmXUczi0DbldlhqJ6u2EyCgEt3XcQyFtElytJCdRHj7swAs8S2vatmCeBX';
    var json;
    var LRL = [];
    var RLR = [];
    var LLL = [];
    var RRR = [];
    var obj = {};
    var request = new XMLHttpRequest();
    request.open('GET', api, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            json = JSON.parse(this.responseText);
            // console.log(json);
            for (i = 0; i < json.length; i++) {
                if (json[i].score_breakdown.blue.tba_gameData == "LRL") {
                    LRL.push(1);
                } else if (json[i].score_breakdown.blue.tba_gameData == "RLR") {
                    RLR.push(1);
                } else if (json[i].score_breakdown.blue.tba_gameData == "LLL") {
                    LLL.push(1);
                } else if (json[i].score_breakdown.blue.tba_gameData == "RRR") {
                    RRR.push(1);
                }
            }
            var total = LRL.length + RLR.length + LLL.length + RRR.length
            obj = {
                "LRL": {
                    "length": LRL.length,
                    "side": "Right",
                    "percent": (LRL.length / total * 100).toFixed(2)
                },
                "RLR": {
                    "length": RLR.length,
                    "side": "Left",
                    "percent": (RLR.length / total * 100).toFixed(2)
                },
                "RRR": {
                    "length": RRR.length,
                    "side": "Right",
                    "percent": (RRR.length / total * 100).toFixed(2)
                },
                "LLL": {
                    "length": LLL.length,
                    "side": "Left",
                    "percent": (LLL.length / total * 100).toFixed(2)
                },
            }
            document.getElementById("LRL").innerHTML = ("LRL: " + obj.LRL.percent + "%");
            document.getElementById("RLR").innerHTML = ("RLR: " + obj.RLR.percent + "%");
            document.getElementById("LLL").innerHTML = ("LLL: " + obj.LLL.percent + "%");
            document.getElementById("RRR").innerHTML = ("RRR: " + obj.RRR.percent + "%");
            document.getElementById("side").innerHTML = (obj.RRR.percent + "%");
            // var arr = Object.values(obj.length);
            // var max = Math.max(...arr);
            // console.log(max);
            var max = 0
            var maxstr = ""

            for (i in obj) {
                console.log(i);
                if (obj[i].length > max) {
                    max = obj[i].length;
                    maxstr = obj[i].side;
                }
                console.log(max);
            }
            document.getElementById("side").innerHTML = (maxstr);
            // console.log(obj.length);
            // for (var i = 0; i < obj.length; i++) {
            //     console.log("pls");
            //     console.log("pls" + obj[i]);
            //     if (obj[i].percent > max2) {
            //         max2 = obj[i].percent
            //         max = obj[i]
            //     }
            // }
            // console.log(max)

        }
    };
    request.send();
    // jQuery("#side").fitText();
}