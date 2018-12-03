const c = document.getElementById('theCanvas');
const ctx = theCanvas.getContext('2d');
const colors = ['#ff223e', '#5d1eb2', '#ff7300'];
let particles = [];

randomNum = function() {
	let val = Math.random();
	if (val <= 0.3) {
		return 0;
	} else if (val > 0.3 && val <= 0.6) {
		return 1;
	} else {
		return 2;
	}
};

isNegative = function() {
	let val = Math.random();
	if (val < 0.5) {
		return "-1";
	} else {
		return "1";
	}
};

createParticle = function() {
	this.p = { 
		color : computeColor(),
		pos : computePos(),
		vel : computeVel(),
		size : computeSize(),
	};
	return p;

};

computeColor = function() {
	let color = colors[randomNum()];
	return color;
};

computeSize = function() {
	let size = randomNum() + 1;	
	return size;
};
	 
computePos = function() {
	let pos = { x : c.width/2 + (Math.random()  * isNegative() * c.width/2) , 
				y : c.height/2 + (Math.random()  * isNegative() * c.height/2),
	};
	return pos;
};

computeVel = function() {
	let vel = {
				x : (Math.random()) * (randomNum() + 1) * isNegative() /12,
				y : (Math.random()) * (randomNum() + 1) * isNegative() /12,
	};
	return vel;
};

drawParticle = function(particle) {
	ctx.fillStyle = particle.color;
	ctx.shadowBlur = 10;
	ctx.shadowColor = particle.color;
	ctx.beginPath();
	ctx.arc(particle.pos.x, particle.pos.y, particle.size,0, 2*Math.PI);
	ctx.fill();
};

drawAll = function() {
	c.width = window.innerWidth;
	c.height = window.innerHeight-1;
	ctx.clearRect(0,0,c.width, c.height);
	
	for(i=0;i<particles.length; i++){
		drawParticle(particles[i]);
		particles[i].pos.x += particles[i].vel.x;
		particles[i].pos.y += particles[i].vel.y;

		if (particles[i].pos.x > c.width) {
			particles[i].pos.x = 0
		} else if (particles[i].pos.x < 0) {
			particles[i].pos.x = c.width;
		}

		if (particles[i].pos.y > c.height) {
			particles[i].pos.y = 0
		} else if (particles[i].pos.y < 0) {
			particles[i].pos.x = c.height;
		}

	}
};

drawAll();

document.addEventListener("click" , function(e){
	let p = {
		color : computeColor(),
		pos : {
			x : e.clientX,
			y : e.clientY,
			},
		vel : computeVel(),
		size : computeSize(),
	}
	particles.push(p);
});

update = function() {

	drawAll();
	requestAnimationFrame(update);
};
update();

addParticles = function() {
	for(i=0;i<40;i++){
		particles.push(createParticle());
	}
};
addParticles();