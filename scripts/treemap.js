var width = 960,
    height = 500;

var fill = d3.scale.ordinal()
             .range(["#f0f0f0", "#d9d9d9", "#bdbdbd"]);

var stroke = d3.scale.linear()
               .domain([0, 1e4])
               .range(["brown", "steelblue"]);

var treemap = d3.layout.treemap()
    .size([width, height])
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var div = d3.select("#viz").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");

var line = d3.svg.line()
    .interpolate("bundle")
    .tension(.85)
    .x(function(d) { return d.x + d.dx / 2; })
    .y(function(d) { return d.y + d.dy / 2; });

d3.json("data/ancestry.json", function(error, classes) {
  var nodes = treemap.nodes(klasses.root(classes)),
      links = klasses.direct_ancestry(nodes);

  div.selectAll(".cell")
      .data(nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background-color", function(d) { return d.children ? fill(d.key) : null; })
      .call(cell)
      .text(function(d) { return d.children ? null : d.key; });

  div.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute")
    .selectAll(".link")
      .data(bundle(links))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", line)
      .style("stroke", function(d) { return stroke(d[0].value); });
});

function cell() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
}

var klasses = {
 
  // Lazily construct the class hierarchy from class names.
  root: function(classes) {
    var map = {};
 
    function find(name, data) {
      var node = map[name], i;
      if (!node) {
        node = map[name] = data || {name: name, children: []};
        if (name.length) {
          node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
          node.parent.children.push(node);
          node.key = name.substring(i + 1);
        }
      }
      return node;
    }
 
    classes.forEach(function(d) {
      find(d.name, d);
    });
 
    return map[""];
  },
 
  // Return a list of direct_ancestry for the given array of nodes.
  direct_ancestry: function(nodes) {
    var map = {},
        direct_ancestry = [];
 
    // Compute a map from name to node.
    nodes.forEach(function(d) {
      map[d.name] = d;
    });
 
    // For each class, construct a link from the source to target node.
    nodes.forEach(function(d) {
      if (d.direct_ancestry) d.direct_ancestry.forEach(function(i) {
        direct_ancestry.push({source: map[d.name], target: map[i]});
      });
    });
 
    return direct_ancestry;
  }
};