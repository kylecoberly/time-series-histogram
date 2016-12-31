module.exports = {
    renderChart,
    createDimensions
};

function renderChart(data, options){
    var colorScale = getColorScale(options.maxCount, options.color);
    var xScale = d3.scaleTime()
        .domain([options.startDate, options.endDate])
        .range([0, options.dimensions.chartWidth]);
    var yScale = d3.scaleBand()
        .domain(options.choices)
        .range([options.dimensions.chartHeight, 0]);
    var chart = initializeChart(options.selector, options.dimensions.width, options.dimensions.height);

    var day = attachDay(chart, data, xScale, options.dimensions.margins.left);
    var column = attachColumn(day, data);
    attachSquares(column, data, xScale, yScale, colorScale, options.dimensions.barHeight);
    attachXAxis(chart, xScale, options.dimensions.margins.left, options.dimensions.chartHeight);
    attachYAxis(chart, yScale, options.dimensions.margins.left);
}

function initializeChart(chartSelector, width, height){
    return d3.select(chartSelector)
        .attr("width", width)
        .attr("height", height)
}
function getColorScale(max, color){
    return d3.scaleLinear()
        .domain([0, max])
        .range(["white", color]);
}
function attachXAxis(chart, xScale, leftMargin, chartHeight){
    chart.append("g")
        .attr("transform", function(data){
            return `translate(${leftMargin}, ${chartHeight})`;
        })
        .call(d3.axisBottom(xScale));
}
function attachYAxis(chart, yScale, leftMargin){
    chart.append("g")
        .attr("transform", function(data){
            return `translate(${leftMargin}, 0)`;
        })
        .call(d3.axisLeft(yScale));
}
function attachDay(chart, data, xScale, leftMargin){
    return chart.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(data, index){
            return `translate(${leftMargin + xScale(new Date(data.date))})`;
        });
}
function attachColumn(day, data){
    return day.selectAll()
        .data(function(data, index){
            return data.values;
        })
        .enter();
}
function attachSquares(column, data, xScale, yScale, colorScale, barHeight){
    column.append("rect")
        .attr("width", `${xScale(getOneDay(options.startDate))}`)
        .attr("transform", function(data){
            return `translate(0, ${yScale(data.label) - options.dimensions.barHeight})`;
        })
        .attr("height", options.dimensions.barHeight)
        .style("fill", function(data){
            return colorScale(data.value);
        });
}

// Utilities
function getOneDay(startDate){
    var oneDay = new Date(startDate.getTime());
    oneDay.setDate(oneDay.getDate() + 1);
    return oneDay;
}
function Dimensions(width, height, choicesCount){
    this.width = width;
    this.height = height;
    this.margins = {
        top: height / 4,
        right: height / 4,
        bottom: height / 4,
        left: height * 0.75
    };
    this.chartWidth = this.width - this.margins.left - this.margins.right;
    this.chartHeight = this.height - this.margins.top - this.margins.bottom;
    this.barHeight = this.chartHeight / choicesCount;
}

function createDimensions(width, height, choicesCount){
    return new Dimension(width, height, choicesCount);
}
