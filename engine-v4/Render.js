Render = class {
  static resolution = {w: 1024, h: 768};

  static loaded = false;

  static Font = {
    size: 14,
    //name: "segoe-ui-black"
    name: "arial"
  }

  static Load() {
    this.scale = {x: 0, y: 0};
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.area = document.getElementById("area");
    this.loaded = true;
  }

  static CropImage(image, x, y, width, height) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    return canvas;
  }

  static SetAttribute(attr, value) {
    this.ctx[attr] = value;
  }

  static Translate(x, y) {
    this.ctx.translate(x * this.scale.x, y * this.scale.y);
  }

  static DrawImage(image, x, y, w, h) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(image, x * this.scale.x, y * this.scale.y, (w || image.width) * this.scale.x, (h || image.height) * this.scale.y);
  }

  static FillText(text, x, y) {
    this.ctx.font = (this.Font.size * this.scale.x) + "pt " + this.Font.name;
    this.ctx.fillText(text, x * this.scale.x, y * this.scale.y);
  }

  static FillOutlineText(text, x, y, lineWidth) {
    this.ctx.font = (this.Font.size * this.scale.x) + "pt " + this.Font.name;

    this.ctx.miterLimit = 2;
    this.ctx.lineJoin = 'round';

    this.ctx.lineWidth = (lineWidth * this.scale.x);
    this.ctx.strokeText(text, x * this.scale.x, y * this.scale.y);
    this.ctx.lineWidth = 1;
    this.FillText(text, x, y);
  }

  static FillBackground(color) {
    if(color instanceof Image) { return this.DrawImage(color, 0, 0, this.resolution.w, this.resolution.h); }
    this.SetAttribute("fillStyle", color);
    this.FillRect(0, 0, this.resolution.w, this.resolution.h);

  }

  static FillRect(x, y, width, height) {
    this.ctx.fillRect(x * this.scale.x, y * this.scale.y, width * this.scale.x, height * this.scale.y);
  }

  static Clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  static Resize() {

    var widthToHeight = this.resolution.w/this.resolution.h;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      this.area.style.height = newHeight + 'px';
      this.area.style.width = newWidth + 'px';
    } else {
      newHeight = newWidth / widthToHeight;
      this.area.style.width = newWidth + 'px';
      this.area.style.height = newHeight + 'px';
    }
    this.area.style.marginTop = (-newHeight / 2) + 'px';
    this.area.style.marginLeft = (-newWidth / 2) + 'px';
    this.scale.x = newWidth/this.resolution.w;
    this.scale.y = newHeight/this.resolution.h;
    this.width = this.canvas.width = newWidth;
    this.height = this.canvas.height = newHeight;
  }

  static Log(text) {
    var args = [`[Render]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
