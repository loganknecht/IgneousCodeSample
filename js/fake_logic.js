// Used instead of set interval because this is optimzed for animations, however it's hard to say if flot is optimized 
// for this sort of thing, so it may just be better to use set interval
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                          window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
// Pass in simple javascript object for quick checking
function Chart(options) {
	this.ValidateOptions(options);

	this.jqueryChartObject = options.jqueryChartObject;

	// Sets the number of data points for x-axis
	if(!options.numberOfDataPoints) {
		this.numberOfDataPoints = 20;
	}
	else {
		this.numberOfDataPoints = options.numberOfDataPoints;
	}

	// Generates default empty data points to guarantee no issues in logic
	this.dataPoints = this.GenerateStartingDataPointsArray(this.numberOfDataPoints);

	// Configures how the graph will look
	this.graphOptions = this.GenerateGraphOptions(this.numberOfDataPoints);
};

Chart.prototype = {
	ValidateOptions : function(options) {
		// options.jqueryChartObject (Required)
		// options.numberOfDataPoints (Optional - Default: 20)

		// make sure options are provided
		if(typeof(options) == 'undefined') {
			throw new Error('The chart object needs options provided, please provided options on declartion.');
		}

		// make sure the reference to the chart being updated is provided
		if(!options.jqueryChartObject) {
			throw new Error('You must provide a jquery object reference to the chart that is being managed by the chart object.');
		}
	},
	// Use a function to return the desired array for starting
	// Done so I don't have to worry about trying to graph an empty array
	GenerateStartingDataPointsArray : function(numberOfDataPoints) {
		var new_array = [];

		for(var i = 0; i < numberOfDataPoints; i++) {
			new_array.push(0);
		}

		return new_array;
	},
	GenerateGraphOptions : function(numberOfDataPoints) {
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
				max: numberOfDataPoints - 1
			},
			yaxis: {
				min: 0,
				max: 100
			}
		};
	},
	// Assumes data points is already initialized at correct length, and with valid values
	GetData : function(dataPoints) {
		// Zipping index with value
		var zippedDataPoints = [];
		for(var i = 0; i < dataPoints.length; i++) {
			zippedDataPoints.push([i, dataPoints[i]]);
		}
		return [zippedDataPoints];
	},
	// Handles updating the model
	// Again it assumes the array is already initialized and configured
	UpdateDataPoints : function(dataPoints) {
		dataPoints = dataPoints.slice(1);
		dataPoints.push(50);

		return dataPoints;
	},
	// Handles the management of all updates
	PlotGraph : function() {
		this.dataPoints = this.UpdateDataPoints(this.dataPoints);
		$.plot(this.jqueryChartObject, this.GetData(this.dataPoints), this.graphOptions);

		this.TriggerTracking();
	},
	TriggerTracking : function() {
		requestAnimationFrame((function() {
			this.PlotGraph();
		}).bind(this));
	}
};


var cpuUsageChart = new Chart({
	jqueryChartObject : $("#cpu-usage-graph")
});
var diskCapacityChart = new Chart({
	jqueryChartObject : $("#disk-capacity-graph")
});
var memoryUsageChart = new Chart({
	jqueryChartObject : $("#memory-usage-graph")
});
var networkTrafficChart = new Chart({
	jqueryChartObject : $("#network-traffic-graph")
});

cpuUsageChart.TriggerTracking();
diskCapacityChart.TriggerTracking();
memoryUsageChart.TriggerTracking();
networkTrafficChart.TriggerTracking();