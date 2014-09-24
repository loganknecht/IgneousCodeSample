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

	this.ConfigureXAxisLabel(this.jqueryChartObject);
	this.ConfigureYAxisLabel(this.jqueryChartObject);
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
	},
	TriggerTracking : function() {
		setInterval((function() {
			this.PlotGraph();
		}).bind(this), 250);
	},
	ConfigureXAxisLabel : function(jqueryChartObject) {
	},
	ConfigureYAxisLabel : function(jqueryChartObject) {
	}
};

function CPUUsageChart(options) {
	Chart.call(this, options);

	this.probabilityForChange = 50;
	this.graphValueToAddToChart = 50;
}

CPUUsageChart.prototype = Object.create(Chart.prototype);
CPUUsageChart.prototype.constructor = CPUUsageChart;
CPUUsageChart.prototype.UpdateDataPoints = function(dataPoints) {
	// probability for change succeeded
	if(Math.floor(Math.random()*100) < this.probabilityForChange) {
		this.graphValueToAddToChart = Math.floor(Math.random() * 100);
	}

	dataPoints = dataPoints.slice(1);
	dataPoints.push(this.graphValueToAddToChart);

	return dataPoints;
};
CPUUsageChart.prototype.GenerateGraphOptions = function(numberOfDataPoints) {
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
			show: false,
			min: 0,
			max: numberOfDataPoints - 1
		},
		yaxis: {
			min: 0,
			max: 100
		}
	};
};
function DiskCapacityChart(options) {
	Chart.call(this, options);

	this.iterationsUntilIncrementMin = 100;
	this.iterationsUntilIncrementMax = 300;
	this.chartMax = 500;
	this.graphValueToAddToChart = 20;
}
DiskCapacityChart.prototype = Object.create(Chart.prototype);
DiskCapacityChart.prototype.constructor = DiskCapacityChart;
DiskCapacityChart.prototype.UpdateDataPoints = function(dataPoints) {
	// probability for change succeeded
	this.iterationsUntilIncrement--;
	if(this.iterationsUntilIncrement <0) {
		this.iterationsUntilIncrement = (this.iterationsUntilIncrementMin + Math.floor(Math.random()*(this.iterationsUntilIncrementMax-this.iterationsUntilIncrementMin)));
		this.graphValueToAddToChart = Math.floor(Math.random() * 100);
	}

	dataPoints = dataPoints.slice(1);
	this.graphValueToAddToChart += 0.5;
	if(this.graphValueToAddToChart > this.chartMax) {
		this.graphValueToAddToChart = this.chartMax;
	}
	dataPoints.push(this.graphValueToAddToChart);

	return dataPoints;
};
DiskCapacityChart.prototype.GenerateGraphOptions = function(numberOfDataPoints) {
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
			show: false,
			min: 0,
			max: numberOfDataPoints - 1
		},
		yaxis: {
			min: 0,
			max: 500
		}
	};
};
function MemoryUsageChart(options) {
	Chart.call(this, options);

	this.probabilityOfMajorMemoryRelease = 2;
	this.probabilityOfMajorMemorySpike = 2;
	this.graphValueToAddToChart = 5.5;
}
MemoryUsageChart.prototype = Object.create(Chart.prototype);
MemoryUsageChart.prototype.constructor = MemoryUsageChart;
MemoryUsageChart.prototype.UpdateDataPoints = function(dataPoints) {
	// probability for change succeeded
	if(Math.floor(Math.random()*100) < this.probabilityOfMajorMemoryRelease) {
		this.graphValueToAddToChart -= Math.floor(Math.random() * 2);
		}
	if(Math.floor(Math.random()*100) < this.probabilityOfMajorMemorySpike) {
		this.graphValueToAddToChart -= Math.floor(Math.random() * 2);
	}
	else {
		var shouldIncrease = Math.floor(Math.random() * 2) == 1 ? true : false;
		var modifyingValue = Math.random() * .25;
		if(shouldIncrease) {
			this.graphValueToAddToChart += modifyingValue;
		}
		else {
			this.graphValueToAddToChart -= modifyingValue;
		}

		if(this.graphValueToAddToChart < 0) {
			this.graphValueToAddToChart = 0;
		}
		if(this.graphValueToAddToChart > 8) {
			this.graphValueToAddToChart = 8;
		}
	}

	dataPoints = dataPoints.slice(1);
	dataPoints.push(this.graphValueToAddToChart);

	return dataPoints;
};
MemoryUsageChart.prototype.GenerateGraphOptions = function(numberOfDataPoints) {
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
			show: false,
			min: 0,
			max: numberOfDataPoints - 1
		},
		yaxis: {
			min: 0,
			max: 8
		}
	};
};
function NetworkTrafficChart(options) {
	Chart.call(this, options);

	this.probabilityOfNetworkTrafficOccurring = 100;
	this.networkSpikeIsOccurring = false;
	this.networkSpikeIsAscending = false;
	this.networkSpikeIsDescending = false;
	this.networkSpikeStepSize = 3;
	this.networkSpikeStepSizeMin = 10;
	this.networkSpikeStepSizeMax = 20;
	this.amountToSpikeBy = 20;
	this.graphValueToAddToChart = 0;
}
NetworkTrafficChart.prototype = Object.create(Chart.prototype);
NetworkTrafficChart.prototype.constructor = NetworkTrafficChart;
NetworkTrafficChart.prototype.UpdateDataPoints = function(dataPoints) {
	if(!this.networkSpikeIsOccurring) {
		if(Math.floor(Math.random()*100) < this.probabilityOfNetworkTrafficOccurring) {
			this.networkSpikeIsOccurring = true;
			this.networkSpikeStepSize = this.networkSpikeStepSizeMin + (Math.random() * (this.networkSpikeStepSizeMax - this.networkSpikeStepSizeMin));
			this.amountToSpikeBy = 20 + (Math.random() * 140);
			if(this.amountToSpikeBy > 160) {
				this.amountToSpikeBy = 160;
			}
			this.networkSpikeIsAscending = true;
			this.networkSpikeIsDescending = false;
		}
	}
	// perform network spike
	else {
		if(this.networkSpikeIsAscending) {
			this.graphValueToAddToChart += this.networkSpikeStepSize * Math.random();
		}
		else if(this.networkSpikeIsDescending) {
			this.graphValueToAddToChart -= this.networkSpikeStepSize * Math.random();
		} 

		if(this.graphValueToAddToChart > this.amountToSpikeBy) {
			this.networkSpikeIsAscending = false;
			this.networkSpikeIsDescending = true;
		}

		if(this.graphValueToAddToChart < 0) {
			this.graphValueToAddToChart = 0;
			this.networkSpikeIsOccurring = false;
		}
	}

	dataPoints = dataPoints.slice(1);
	dataPoints.push(this.graphValueToAddToChart);

	return dataPoints;
};
NetworkTrafficChart.prototype.GenerateGraphOptions = function(numberOfDataPoints) {
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
			max: 160
		}
	};
};

var cpuUsageChart = new CPUUsageChart({
	jqueryChartObject : $("#cpu-usage-graph")
});
var diskCapacityChart = new DiskCapacityChart({
	jqueryChartObject : $("#disk-capacity-graph")
});
var memoryUsageChart = new MemoryUsageChart({
	jqueryChartObject : $("#memory-usage-graph")
});
var networkTrafficChart = new NetworkTrafficChart({
	jqueryChartObject : $("#network-traffic-graph")
});

cpuUsageChart.TriggerTracking();
diskCapacityChart.TriggerTracking();
memoryUsageChart.TriggerTracking();
networkTrafficChart.TriggerTracking();