var canvas = document.getElementById("animajs");
ctx = canvas.getContext('2d');
fitToContainer(canvas);

var bond = 20; 
var count = 200;

function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}


function Particle(x, y, r, col) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;

    this.vx = (Math.random() * 3) + 0.1;
    this.vx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.vy = (Math.random() * 3) + 0.1;
    this.vy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.col;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);      
        ctx.fill();
    }

    this.animate = function() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.r > canvas.width || this.x - this.r < 0) 
            this.vx *= -1;
    
        if (this.y + this.r > canvas.height || this.y - this.r < 0) 
            this.vy *= -1;
  
        this.draw();
    }
}

var particles = [];

for (var a = 1; a < count; ++a) {
    var radius = Math.floor(Math.random() * 9) + 1;
    var x = Math.random() * (canvas.width - 2 * radius) + radius;
    var y = Math.random() * (canvas.height - 2 * radius) + radius;
    var color = "#" + Math.floor((180 * radius / 10) + 75).toString(16).repeat(2) + "ff";

    particles.push(new Particle(x, y, radius, color));
}

function Lines() {
    for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
            var dist = Math.sqrt(Math.pow(particles[a].x - particles[b].x, 2) + Math.pow(particles[a].y - particles[b].y, 2));
            var maxR = Math.max(particles[a].r, particles[b].r);

            if (dist < bond * maxR) {
                ctx.beginPath();
                ctx.save();
                ctx.globalAlpha = (bond * maxR - dist) / bond / maxR;
                ctx.strokeStyle = "#ffffff";
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke(); 
                ctx.restore();
            }            
        }
    }
}

function Update () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Lines();
 
    for (var a = 0; a < particles.length; a++) {
        var particle = particles[a];
        particle.animate();
    }    

    requestAnimationFrame(Update);
}

Update();
