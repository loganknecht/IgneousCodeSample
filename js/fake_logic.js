window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                          window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

function GenerateCPUUsageGraphOptions() {
	return {
		grid: {
			borderWidth: 1,
			minBorderMargin: 20,
			labelMargin: 10,
			backgroundColor: {
				colors: ["#fff", "#e4f4f4"]
			},
			margin: {
				top: 8,
				bottom: 20,
				left: 20
			}
		},
		legend: {
			show: true
		},
		series: {
			lines: {
				fill: true,
				// fillColor: "rgba(255, 0, 0, 1)",
				show: true
			}
		},
		xaxis: {
			min: 0,
			max: 1000
		},
		yaxis: {
			min: 0,
			max: 1000
		}
	};
}

function GetCPUUsageData() {
	var data = [];
	var allData = [];
	for(var i = 0; i < 1000; i++) {
		allData.push([i, Math.floor(Math.random() * 1000)]);
	}
	return [allData];
}

function PlotCPUUsageGraph() {
	$.plot($("#cpu-usage-graph"), GetCPUUsageData(), cpuGraphOptions);
	requestAnimationFrame(PlotCPUUsageGraph);
}

function TriggerCPUUsageTracking() {
	requestAnimationFrame(PlotCPUUsageGraph);
}

var cpuGraphOptions = GenerateCPUUsageGraphOptions();
TriggerCPUUsageTracking();