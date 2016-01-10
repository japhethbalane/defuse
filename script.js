var canvas = document.getElementById("bomb");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setInterval(world, 1000);

var time = 1000;
var BOMB = new Bomb(time);


function clearCanvas() {
	context.fillStyle = "#fff";
	context.fillRect(0,0,canvas.width,canvas.height);
}
function color() {
    var r = Math.random() * 255 >> 1;
    var g = Math.random() * 255 >> 1;
    var b = Math.random() * 255 >> 1;
    return 'rgb('+r+','+g+','+b+')';
}
function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}



function world() {
	clearCanvas();
	BOMB.update().draw();
}


function Bomb(time) {
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.radius = 100;

	this.time = time;
	this.wireCount = time / 100;
	this.wires = [];

	this.generateWires = function() {
		for (var i = 0; i < this.wireCount; i++) {
			this.wires[i] = new Wire();
		};
	};
	this.generateWires();

	this.drawCircle = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.strokeStyle = 'black';
		context.stroke();
		context.fillStyle = 'black';
		context.fill();
	}

	this.update = function() {

		return this;
	}

	this.draw = function() {
		for (var i = 0; i < this.wires.length; i++) {
			this.wires[i].update().draw();
		};
		this.drawCircle()

		return this;
	}
}

function Wire(){
	this.color = color();
	this.x;
	this.y;

	this.generateXY = function() {
		var a = randomBetween(0,4);
		if (a == 0) {
			this.x = randomBetween(0,canvas.width);
			this.y = 0;
		};
		if (a == 1) {
			this.x = canvas.width;
			this.y = randomBetween(0,canvas.height);
		};
		if (a == 2) {
			this.x = randomBetween(0,canvas.width);
			this.y = canvas.height;
		};
		if (a == 3) {
			this.x = 0;
			this.y = randomBetween(0,canvas.height);
		};
	};
	this.generateXY();

	this.update = function() {

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.strokeStyle = this.color;
		context.moveTo(this.x, this.y);
		context.lineTo(BOMB.x, BOMB.y);
		context.stroke();

		return this;
	}
}