MessageBox = class {
  constructor(title, message) {
    this.title = title;
    this.message = message;
    this.minWidth = 50;
    this.maxWidth = 300;

    this.lines = [];
  }

  update() {
    this.lines = [];

    Render.updateFont();

    var numOfLines = 0;
    var currentWidth = 0;

    var allwords = this.message.split(" ");

    for (var word of allwords) {

      var word_info = {word: word, width: Render.ctx.measureText(word + " ").width / Render.scale.x};
      currentWidth += word_info.width;
      if(currentWidth >= this.maxWidth ) {
        var goNext = false;
        if(this.lines[numOfLines]) {
          goNext = true;
        }
        if(goNext) {
          numOfLines += 1;
          currentWidth = word_info.width;
        }

      }

      if(!this.lines[numOfLines]) { this.lines[numOfLines] = []; }
      this.lines[numOfLines].push(word_info);
    }

  }

  draw() {
    Render.ctx.save();

    var padding = 20;

    var titleHeight = 40;

    var width = this.maxWidth;



    var mouse_pos = {x: Mouse.position.x, y: Mouse.position.y}

    var lineHeight = 30;

    Render.ctx.fillStyle = "#1E1E1E";
    Render.fillRect(0, 0, width+padding*2, padding*2 + titleHeight + (this.lines.length)*lineHeight);
    Render.ctx.fillStyle = "#404040";
    Render.fillRect(0, 0, width+padding*2, titleHeight);
    //Render.ctx.fillStyle = "white";
    //Render.fillRect((width+padding*2)-titleHeight, 0, titleHeight, titleHeight);

    for (var line of this.lines) {
      var str = "";
      for (var w of line) { str += w.word + " "; }
      Render.ctx.textAlign = "center";
      Render.ctx.fillStyle = "white";
      Render.fillText(str, padding + width/2, padding + titleHeight + (this.lines.indexOf(line))*lineHeight+lineHeight*0.7);
    }

    Render.ctx.restore();
  }
}
