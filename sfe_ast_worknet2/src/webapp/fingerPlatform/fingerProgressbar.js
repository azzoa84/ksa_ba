function FingerProgressBar() {
    this.canvas = null;
    this.g = null;
    this.left = 0;
    this.top = 0;
    this.width = null;
    this.height = null;
    this.aniValue = 0;
    this.value = 0;
    this.barColor = '#d1ecff';
    this.image1 = new Image();
    this.image1.src = 'images/bg.png';
    this.isLoaded1 = false;
    this.image2 = new Image();
    this.image2.src = 'images/box.png';
    this.isLoaded2 = false;
    this.tid = null;

    this.addCanvas = function(canvas) {
        this.g = canvas.getContext('2d');
        this.canvas = canvas;
        this.left = 0;
        this.top = 0;
        this.width = canvas.width - 1;
        this.height = canvas.height - 1;
    }

    this.setValue = function(value) {
        if (value > 100) {
            this.value = 100;
            return;
        }

        this.value = parseInt(value);
    }

    this.setColor = function(color) {
        this.barColor = color;
    }

    this.fillRectR = function(g, x, y, w, h, r) {
        if (typeof r === "undefined") {
            r = 5;
        }

        g.beginPath();
        g.moveTo(x + r, y);
        g.lineTo(x + w - r, y);
        g.quadraticCurveTo(x + w, y, x + w, y + r);
        g.lineTo(x + w, y + h - r);
        g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        g.lineTo(x + r, y + h);
        g.quadraticCurveTo(x, y + h, x, y + h - r);
        g.lineTo(x, y + r);
        g.quadraticCurveTo(x, y, x + r, y);
        g.closePath();
        g.fill();
    };

    var c = this;
    this.draw = function() {
        if (c.isLoaded1 == false ||
            c.isLoaded2 == false)
            return;

        // 그리기
        var g = c.g;
        g.save();

        g.clearRect(0, 0, c.width, c.height);
        g.drawImage(c.image1, 0, 25);

        //
        g.fillStyle = c.barColor;
        //g.fillRect(6, 48, 200, 7);
        var width = 266 * c.aniValue / 100;

        if (width < 5.32)
            width = 5.32;

        if (c.aniValue > 0) {
            c.fillRectR(g, 11, 33, width, 7, 3);
        }

        width += 11;
        g.drawImage(c.image2, width - 15, 3);
        g.fillStyle = 'black';
        g.fillText(c.aniValue.toString() + '%', width - 12, 18);

        g.restore();

        if (c.aniValue != parseInt(c.value)) {
            c.aniValue += 1;
        }
        else {
            clearInterval(c.tid);
            c.aniValue = 0;
        }
    }

    this.update = function() {
        if (this.aniValue == 0) {
            this.tid = setInterval(this.draw, 30);
        }
    }
    
    this.image1.onload = function() {
        c.isLoaded1 = true;
        c.draw();
    }

    this.image2.onload = function() {
        c.isLoaded2 = true;
        c.draw();
    }
}