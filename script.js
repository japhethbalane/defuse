var canvas = document.getElementById("bomb");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setInterval(world, 30);

var time = 1000;
var BOMB = new Bomb(time);

var buttonCount = 5;
var buttons = [];

var distanceFromCenter = 100;

generateButtons();

function generateButtons() {
	var angle = 360 / buttonCount;
	var div = angle;
	for (var i = 0; i < buttonCount; i++, angle += div) {
		buttons.push(new Button(angle));
	}
}

function clearCanvas() {
	context.fillStyle = "#000";
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
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].update().draw();
	}
}

function Bomb(time) {
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.radius = 100;

	this.drawBorder = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.strokeStyle = "#fff"
		context.stroke();
		context.fillStyle = "rgba(200,200,200,1)";
		context.fill();
	}

	this.update = function() {

		return this;
	}

	this.draw = function() {
		this.drawBorder();

		return this;
	}
}

function Button(angle) {
	this.x = canvas.width/3;
	this.y = canvas.height/2;
	this.radius = 30;
	this.angle = angle;

	this.dx = Math.cos(this.angle) * distanceFromCenter;
	this.dy = Math.sin(this.angle) * distanceFromCenter;

	this.x += this.dx;
	this.y += this.dy;

	this.update = function() {


		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.strokeStyle = "#fff"
		context.stroke();
		context.fillStyle = "rgba(200,200,200,1)";
		context.fill();

		return this;
	}
}