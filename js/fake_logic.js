var data = [[1, 300], [2, 600], [3, 550], [4, 400], [5, 300]];
var options = {
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
	xaxis: {
		min: 0,
		max: 1000
	},
	yaxis: {
		min: 0,
		max: 1000
	},
	legend: {
		show: true
	}
};

$.plot($("#cpu-usage-graph"), data, options);