;(function () {

    // This file contains the code to define the graphics and then
    // renders them using data randomly generated by data.js.

    $(document).ready(function() {

        // Define graphics ...

        var scatterplot = gg({
            layers: [{ geometry: 'point', mapping: { x: 'd', y: 'r' } }]
        });

        var symmetric = gg({
            layers: [
                { geometry: 'line', mapping: { x: 'd', y: 'r' } },
            ],
            scales: [
                { type: 'linear', aesthetic: 'y', center: 0 }
            ]
        });

        var linechart = gg({
            layers: [
                { geometry: 'line', mapping: { x: 'd', y: 'r', group: 'subject', color: 'subject'} },
                { geometry: 'text', mapping: { x: 'd', y: 'r', text: '{d}, {r}' },  show: "hover" }
            ],
            scales: [
                { aesthetic: 'color', type: 'color', range: ['#CFF09E', '#A8DBA8', '#79BD9A', '#3B8686'] }
            ]
        });

        var barchart = gg({
            layers: [{ geometry: 'interval', mapping: { x: 'd', y: 'r' }, color: 'blue', width: 2 }]
        });

        var histogram = gg({
            layers: [{
                geometry: 'interval',
                mapping: { x: 'group', y: 'count', color: 'group' },
                width: 20,
                statistic: { kind: 'sum', group: 'who', variable: 'purchases' }
            }],
            scales: [
                { type: 'categorical', aesthetic: 'x' },
                { type: 'linear', aesthetic: 'y', min: 0 }
            ]
        });

        var combined = gg({
            layers: [
                { geometry: 'point', mapping: { x: 'd', y: 'r' }, size: 3 },
                { geometry: 'line', mapping: { x: 'd', y: 'r' } }
                /*{ geometry: 'interval', mapping: { x: 'd', y: 'r' }, width: 2 },*/
            ]
        });

        var semilog = gg({
            layers: [
                { geometry: 'point', mapping: { x: 'd', y: 'r' }, size: 3 },
                { geometry: 'line', mapping: { x: 'd', y: 'r' } }
            ],
            scales: [ { type: 'log', aesthetic: 'y', legend: 'whatever' },
                      { aesthetic: 'x', legend: 'foo' } ]
        });

        var heightHistogram = gg({
            layers: [
                {
                    geometry: 'interval',
                    mapping: { x: 'bin', y: 'count' },
                    statistic: { kind: 'bin', variable: 'height', bins: 30 }
                }
            ],
            scales: [
                { type: 'categorical', aesthetic: 'x' },
                { type: 'linear', aesthetic: 'y', min: 0 }
            ]
        });

        var boxplot = gg({
            layers: [ {
                geometry: 'box',
                mapping: { x: 'group', y: false },
                statistic: { kind: 'box', group: 'grade', variable: 'value' }
            }],
            scales: [
                { type: 'categorical', aesthetic: 'x' }
            ]
        });

        var twoPopulations = gg({
            layers: [ {
                geometry: 'point',
                mapping: { x: 'intelligence', y: 'wisdom', color: 'group' },
                size: 2,
                alpha: 0.5
            }]
        });

        var quadrants = gg({
            layers: [
                {
                    geometry: 'point',
                    mapping: { x: 'x', y: 'y', size: 'size' }
                },
                { geometry: 'text', mapping: { x: 'x', y: 'y', text: '{name}: {size}' },  show: "hover" }
            ],
            scales: [ { aesthetic: 'size', range: [ 1, 5 ]} ]
        });

        // ... and render 'em

        var data = gg.sampleData;
        var w    = 300;
        var h    = 200;
        var ex   = function () { return d3.select('#examples').append('span'); };

        //symmetric.render(w, h, ex(), data.toBeCentered);
        linechart.renderer(w, h, ex())(data.upwardSubjects);
        combined.renderer(w, h, ex())(data.upward);
        barchart.renderer(w, h, ex())(data.upward);
        quadrants.renderer(w, h, ex())(data.quadrants);
        histogram.renderer(w, h, ex())(data.purchases);
        semilog.renderer(w, h, ex())(data.semiLogData);
        heightHistogram.renderer(w, h, ex())(data.heightWeight);
        twoPopulations.renderer(w, h, ex())(data.twoPopulations);
        boxplot.renderer(w, h, ex())(data.forBoxPlots);
    });
})();
