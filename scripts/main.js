var RubyClassViz = {

  chordLayoutAnchor: document.getElementById("chord_layout"),
  sunburstAnchor:    document.getElementById("sunburst"),
  treemapAnchor:     document.getElementById("treemap"),
  bundlingAnchor:    document.getElementById("edge_bundling"),

  setAnchorEvents: function() {

    RubyClassViz.chordLayoutAnchor.addEventListener("click", function() {
      RubyClassViz.clickResponse("chord_layout", "chord layout")
    }, false);

    RubyClassViz.sunburstAnchor.addEventListener("click", function() {
      RubyClassViz.clickResponse("sunburst", "sunburst")
    }, false);

    RubyClassViz.treemapAnchor.addEventListener("click", function() {
      RubyClassViz.clickResponse("treemap", "treemap")
    }, false);

    RubyClassViz.bundlingAnchor.addEventListener("click", function() {
      RubyClassViz.clickResponse("edge_bundling", "hierarchical edge bundling")
    }, false);
  },

  clickResponse: function(vizType, vizName) {
    var source = "scripts/" + vizType + ".js";
    var js = document.createElement("script");
    js.src = source;
    var vizContainer = document.getElementById("viz");
    var vizHeader = document.getElementById("viz_name");

    vizContainer.innerHTML = null;
    vizContainer.appendChild(js);
    vizHeader.innerText = vizName;
  }
};

RubyClassViz.setAnchorEvents();