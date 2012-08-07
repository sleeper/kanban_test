var paper = Raphael("board", "100%", "100%");
var columns = paper.set();
columns.push(
  paper.rect(0, 0, 200, 1000),
  paper.rect(200, 0, 200, 1000),
  paper.rect(400, 0, 200, 1000),
  paper.rect(600, 0, 200, 1000),
  paper.rect(800, 0, 200, 1000)
);
columns.attr({stroke: "black", "stroke-width": 1});
var count = 1;
columns.forEach(function(i) { i.name = "Column " + count; count ++;});

var swimlanes = paper.set();
swimlanes.push(
  paper.rect(0, 0, 1000, 250),
  paper.rect(0, 250, 1000, 250),
  paper.rect(0, 500, 1000, 250),
  paper.rect(0, 750, 1000, 250)
);
var count = 1;
swimlanes.attr({fill: "gray"});
swimlanes.forEach(function(i) { i.name = "Swimlane " + count; count ++;});


var pi1 = paper.rect(10, 10, 50, 50);
pi1.onDragOver(function(p) { console.log("Postit: " + p.name);});
var pi2 = paper.rect(80, 10, 50, 50);
pi2.name = "postit 2";
var pi3 = paper.rect(10, 80, 50, 50);
var pi4 = paper.rect(80, 80, 50, 50);
var pi5 = paper.rect(10, 150, 50, 50);

var postits = paper.set(pi1, pi2, pi3, pi4, pi5 );

var start = function () {
  this.ox = this.attr("x");
  this.oy = this.attr("y");
  this.animate({opacity: .25}, 500, ">");
},
move = function (dx, dy) {
  this.attr({x: this.ox + dx, y: this.oy + dy});
},
up = function () {
  this.animate({opacity: 1}, 500, ">");
};

postits.attr({fill: "black"});
postits.drag( move, start, up );

