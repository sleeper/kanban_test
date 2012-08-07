var board = Raphael("board", 1000, 1000);

// Create the board element: 3 columns and 2 swimlanes => 6 cells
// cell name is "name of the column-name of the swimlane"
// the columns are:   backlog, inprogress, done
// the swimlanes are: handover, projects
var columns_names = ["backlog", "inprogress", "done"];
var swimlanes_names = ["handover", "projects"];

var cells = {
  "backlog-handover": {
    name: "backlog-handover",
  },
  "backlog-projects": {
    name: "backlog-projects"
  },
  "inprogress-handover": {
    name: "inprogress-handover"
  },
  "inprogress-projects": {
    name: "inprogress-projects"
  },
  "done-handover": {
    name: "done-handover",
  },
  "done-projects": {
    name: "done-projects"
  }
};

var col_width = 300;
var swim_height = 400;
var x = 0;

for (var col in  columns_names) {
  var y = 0;
  if (columns_names.hasOwnProperty(col)) {
    for (var swim in swimlanes_names) {
      if (swimlanes_names.hasOwnProperty(swim)) {
        var c = board.rect(x, y, col_width, swim_height);
        var name = columns_names[col] + "-" + swimlanes_names[swim];
        c.name = name;
        c.cell = true;
        c.node.id = name;
        c.attr({fill: "white"});
        y += swim_height;
      }
    }
  }
  x += col_width;
}

Raphael.fn.getCellByPoint = function(x,y) {
  var cell;
  this.forEach(function (el) {
    if (el.isPointInside(x, y) && el.cell) {
      cell = el;
      return false
    }
  });
  return cell;
}

// Create a set of postits

 var pi1 = board.rect(10, 10, 50, 50);
pi1.onDragOver(function(p) { 
  console.log("Postit on cell: " + p.name);
});
pi1.name = "pi1";

var pi2 = board.rect(80, 10, 50, 50);
pi2.name = "postit 2";
var pi3 = board.rect(10, 80, 50, 50);
var pi4 = board.rect(80, 80, 50, 50);
var pi5 = board.rect(10, 150, 50, 50);

var postits = board.set(pi1, pi2, pi3, pi4, pi5 );

var start = function () {
  this.ox = this.attr("x");
  this.oy = this.attr("y");
  // Get orig cell
  this.orig_cell = board.getCellByPoint(this.ox, this.oy);
  this.cell = this.orig_cell;

  console.log("start: orig cell: " + this.orig_cell.name);
  this.animate({opacity: .25}, 500, ">");
},
move = function (dx, dy) {
  this.attr({x: this.ox + dx, y: this.oy + dy});
  var cell = board.getCellByPoint(this.attr("x"), this.attr("y"));
  if (cell.name != this.cell.name) {
    this.cell.attr({fill: "white"});
    this.cell = cell;
    this.cell.attr({fill: "gray"});
  }
},
up = function () {
  this.animate({opacity: 1}, 500, ">");
  this.cell.attr({fill: "white"});

};

postits.attr({fill: "white"});
postits.drag( move, start, up );

var fo = document.createElementNS(board.svgns,"foreignObject");
pi1.node.appendChild(fo);
var body = document.createElement("body");
fo.appendChild(body);
var div = document.createElement("div");
body.appendChild(div);
div.innerHTML = "Test";

// var columns = paper.set();
// columns.push(
//   paper.rect(0, 0, 200, 1000),
//   paper.rect(200, 0, 200, 1000),
//   paper.rect(400, 0, 200, 1000),
//   paper.rect(600, 0, 200, 1000),
//   paper.rect(800, 0, 200, 1000)
// );
// columns.attr({stroke: "black", "stroke-width": 1});
// var count = 1;
// columns.forEach(function(i) { i.name = "Column " + count; count ++;});
// 
// var swimlanes = paper.set();
// swimlanes.push(
//   paper.rect(0, 0, 1000, 250),
//   paper.rect(0, 250, 1000, 250),
//   paper.rect(0, 500, 1000, 250),
//   paper.rect(0, 750, 1000, 250)
// );
// var count = 1;
// swimlanes.attr({fill: "gray"});
// swimlanes.forEach(function(i) { i.name = "Swimlane " + count; count ++;});
// 
// 
// var pi1 = paper.rect(10, 10, 50, 50);
// pi1.onDragOver(function(p) { console.log("Postit: " + p.name);});
// var pi2 = paper.rect(80, 10, 50, 50);
// pi2.name = "postit 2";
// var pi3 = paper.rect(10, 80, 50, 50);
// var pi4 = paper.rect(80, 80, 50, 50);
// var pi5 = paper.rect(10, 150, 50, 50);
// 
// var postits = paper.set(pi1, pi2, pi3, pi4, pi5 );
// 
// var start = function () {
//   this.ox = this.attr("x");
//   this.oy = this.attr("y");
//   this.animate({opacity: .25}, 500, ">");
// },
// move = function (dx, dy) {
//   this.attr({x: this.ox + dx, y: this.oy + dy});
// },
// up = function () {
//   this.animate({opacity: 1}, 500, ">");
// };
// 
// postits.attr({fill: "black"});
// postits.drag( move, start, up );
// 
