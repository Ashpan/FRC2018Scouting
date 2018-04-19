function update(event) {
    // var event = 
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
                if (json[i].alliances.red.score != "-1") {

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
                "ALRL": {
                    "side": "Right",
                    "percent": 24.989135158626684
                },
                "ARLR": {
                    "side": "Left",
                    "percent": 25.684485006518905
                },
                "ALLL": {
                    "side": "Left",
                    "percent": 25.380269448066056
                },
                "ARRR": {
                    "side": "Right",
                    "percent": 23.94611038678835
                }
            }
            console.log("LRL " + obj.LRL.percent);
            console.log("ALRL " + obj.ALRL.percent);
            console.log("RLR " + obj.RLR.percent);
            console.log("ARLR " + obj.ARLR.percent);
            console.log("LLL " + obj.LLL.percent);
            console.log("ALLL " + obj.ALLL.percent);
            console.log("RRR " + obj.RRR.percent);
            console.log("ARRR " + obj.ARRR.percent);
            var right1 = Math.abs(obj.LRL.percent - obj.ALRL.percent)
            var right2 = Math.abs(obj.RRR.percent - obj.ARRR.percent)
            var left1 = Math.abs(obj.RLR.percent - obj.ARLR.percent)
            var left2 = Math.abs(obj.LLL.percent - obj.ALLL.percent)
            document.getElementById("LRL").innerHTML = ("LRL: " + Math.abs(obj.LRL.percent - obj.ALRL.percent));
            document.getElementById("RLR").innerHTML = ("RLR: " + Math.abs(obj.RLR.percent - obj.ARLR.percent));
            document.getElementById("LLL").innerHTML = ("LLL: " + Math.abs(obj.LLL.percent - obj.ALLL.percent));
            document.getElementById("RRR").innerHTML = ("RRR: " + Math.abs(obj.RRR.percent - obj.ARRR.percent));
            // var arr = Object.values(obj.length);
            // var max = Math.max(...arr);
            // console.log(max);

            if (Math.max(right1, left1, right2, left2) === right1 || Math.max(right1, left1, right2, left2) === right2) {
                document.getElementById("side").innerHTML = ("Right");
            } else {
                document.getElementById("side").innerHTML = ("Left");
            }

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








$(document).ready(function() {
    update($("#events").find(":selected").val());
    $('select[name=dropdown]').change(function() {
        update($("#events").find(":selected").val());
    });
});