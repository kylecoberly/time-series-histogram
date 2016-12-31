## Time-Series Histogram

A module for generating time-series histograms. These show time on the X axis, and the density of discrete responses on the Y axis a function of color saturation.

```js
var timeSeriesHistogram = require("time-series-histogram");

var choices = ["Terrible", "Meh", "Good", "Great!"];
var options = {
    dimensions: timeSeriesHistogram.createDimensions(600, 80, choices.length), // width, height, number of choices
    color: "hsl(230, 100%, 30%)", // or RGB, or hex
    startDate: new Date("1/1/16"), // JS Date object
    endDate: new Date("1/7/16"), // JS Date object
    selector: ".chart svg", // CSS selector, must target an <svg> element
    maxCount: 30, // Maximum number of responses per choice
    choices // possible choices
};

var data = [{
    date: "1/1/16",
    values: [{
        label: "Terrible",
        count: 2
    },{
        label: "Meh",
        count: 6
    },{
        label: "Good",
        count: 20
    },{
        label: "Great!",
        count: 10
    }]
},{
    date: "1/2/16",
    values: [{
        label: "Terrible",
        count: 2
    },{
        label: "Meh",
        count: 6
    },{
        label: "Good",
        count: 20
    },{
        label: "Great!",
        count: 10
    }]
},{
    // ...
}];

timeSeriesHisogram.renderChart(data, options);

## API

* `timeSeriesHisogram.renderChart(data, options)`
* `timeSeriesHisogram.createDimensions(width, height, choiceCount)`
