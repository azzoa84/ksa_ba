function FingerRadioItem(context) {
    this.context = context;
    this.canvas = null;
    this.g = null;
    this.name = '';
    this.left = null;
    this.top = null;
    this.width = null;
    this.height = null;
    this.offsetLeft = null;
    this.offsetTop = null;
    this.normalImage = null;
    this.checkedImage = null;
    this.code = null;
    this.value = null;
    this.font = '굴림체';
    this.fontSize = 12;
    this.checked = false;
    this.callback_onmouseclick = null;

    this.draw = function() {
        var g = this.g;
        g.save();
        var y = this.getVAlignPos(g);

        if (this.checked == true) {
            g.drawImage(this.checkedImage, this.left, this.top + 3);
        }
        else
            g.drawImage(this.normalImage, this.left, this.top + 3);

        g.font = this.fontSize.toString() + 'px' + ' ' + this.font;
        g.fillText(this.value, this.left + 20, this.top + y);
        g.restore();
    }

    this.getVAlignPos = function(g) {
        var textPos = (this.height + this.fontSize) / 2 - 1;
        return textPos;
    }

    this.onmouseclick = function(e) {
        //var x = e.pageX - this.canvas.parentNode.parentNode.offsetLeft;
        //var y = e.pageY - this.canvas.parentNode.parentNode.offsetTop;
        var x = getX(e, this.canvas);
        var y = getY(e, this.canvas);
       // alert('b');

        if (x > this.left &&
            y > this.top &&
            x <= (this.left + this.width) &&
            y <= (this.top + this.height)) {

            if (this.callback_onmouseclick != null) {
                this.checked = true;

                if (typeof this.callback_onmouseclick == 'string')
                    eval(this.callback_onmouseclick);
                else
                    this.callback_onmouseclick(this.context, this);

                this.draw(this.g);
            }
        }
    }
}