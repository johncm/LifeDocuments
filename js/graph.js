var millisecondDuration = 750
var millisecondDelay = 40

function transitionFactory() {
    return d3.transition("main")
        .ease(d3.easeLinear)
        .delay(millisecondDelay)
        .duration(millisecondDuration);
}

var graphviz = d3.select("#graph").graphviz()
    .engine()
    .transition(transitionFactory)
    .tweenShapes(false)
    .on('initEnd', function () {
        renderTemplate(d3.select("#graph").attr("data-graph"), d3.select("#graph").attr("data-engine"), d3.select("#graph").attr("data-view"));
    });

function render(filename, engine) {
    // get a text file on a promise and render
    d3.text(filename).then(function (text) {
        console.log(text);
        graphviz.engine(engine).renderDot(text);
    });
}

function renderTemplate(filename, engine, view) {
    fetch(filename)
        .then((response) => response.text())
        .then((template) => {
            d3.json(view).then(function (text) {
                console.log(text);
                var rendered = Mustache.render(template, text);
                console.log(rendered);
                graphviz.engine(engine).renderDot(rendered);
            });
        });
}

function renderTemplateQuery(filename, engine, view, query) {
    fetch(filename)
        .then((response) => response.text())
        .then((template) => {
            d3.json(view).then(function (text) {
                console.log(text);
                var result = jmespath.search(text, query);
                console.log(result);
                var rendered = Mustache.render(template, result);
                console.log(rendered);
                graphviz.engine(engine).renderDot(rendered);
            });
        });
}