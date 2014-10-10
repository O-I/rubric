var width = 720,
height = 720,
outerRadius = height / 2,//Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 160;//outerRadius - 24;
 
var formatPercent = d3.format(".1%");
 
var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
 
var layout = d3.layout.chord()
               .padding(.04)
               .sortSubgroups(d3.descending)
               .sortChords(d3.ascending);
 
var path = d3.svg.chord()
             .radius(innerRadius);
 
var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "circle")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
svg.append("circle")
   .attr("r", outerRadius);
 
d3.csv("data/klass_kolors.csv", function(klasses) {
  d3.json("data/matrix.json", function(matrix) {
     
    // Compute the chord layout.
    layout.matrix(matrix);
     
    // Add a group per neighborhood.
    var group = svg.selectAll(".group")
                   .data(layout.groups)
                   .enter().append("g")
                   .attr("class", "group")
                   .on("mouseover", fade(.02))
                   .on("mouseout", fade(.80))
                   //.on("mouseover", mouseover);
     
    // Add a mouseover title.
    group.append("title").text(function(d, i) {
    return klasses[i].klass;
    });
     
    // Add the group arc.
    var groupPath = group.append("path")
                         .attr("id", function(d, i) { return "group" + i; })
                         .attr("d", arc)
                         .style("fill", function(d, i) { return klasses[i].kolor; });
     
    // Add a text label.
    var groupText = group.append("text")
                         .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
                         .attr("dy", ".35em")
                         .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
                         .attr("transform", function(d) {
                           return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                               + "translate(" + (innerRadius + 26) + ")"
                               + (d.angle > Math.PI ? "rotate(180)" : "");
                         })
                         .attr("xlink:href", function(d, i) { return "#group" + i; })
                         .text(function(d, i) { return klasses[i].klass; });
     
    // Add the chords.
    var chord = svg.selectAll(".chord")
                   .data(layout.chords)
                   .enter().append("path")
                   .attr("class", "chord")
                   .style("fill", function(d) { return klasses[d.source.index].kolor; })
                   .attr("d", path);
     
    // Add an elaborate mouseover title for each chord.
     chord.append("title").text(function(d) {
       return klasses[d.source.index].klass
       + " < " + klasses[d.target.index].klass;
     });
     
     // Returns an event handler for fading a given chord group.
     function fade(opacity) {
       return function(d, i) {
         svg.selectAll("path.chord")
             .filter(function(d) { return d.source.index != i && d.target.index != i; })
           .transition()
             .style("stroke-opacity", opacity)
             .style("fill-opacity", opacity);
       };
     }
  });
});