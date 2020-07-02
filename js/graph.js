var graphviz = d3.select("#graph").graphviz()
    .engine()
    .on('initEnd', function () {
        render(d3.select("#graph").attr("data-graph"), d3.select("#graph").attr("data-engine"));
    });

function render(filename, engine) {
    // get a text file on a promise and render
    d3.text(filename).then(function (text) {
        console.log(text);
        graphviz.engine(engine).renderDot(text);
    });
}
