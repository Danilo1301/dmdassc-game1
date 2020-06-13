Render = class {
  static resolution = {w: 1024, h: 768};
  static font = {
    size: 14,
    //name: "segoe-ui-black"
    name: "arial"
  }

  static start() {
    this.scale = {x: 0, y: 0};
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.area = document.getElementById("area");

    var canvas = this.canvas;
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock()
  }

  static cropImage(image, x, y, width, height) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
    return canvas;
  }

  static setAttribute(attr, value) {
    this.ctx[attr] = value;
  }

  static translate(x, y) {
    this.ctx.translate(x * this.scale.x, y * this.scale.y);
  }

  static drawImage(asset, x, y, w, h) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(asset.image, x * this.scale.x, y * this.scale.y, (w || image.width) * this.scale.x, (h || image.height) * this.scale.y);
  }

  static updateFont() {
    this.ctx.font = (this.font.size * this.scale.x) + "pt " + this.font.name;
  }

  static fillText(text, x, y) {
    this.updateFont();
    this.ctx.fillText(text, x * this.scale.x, y * this.scale.y);
  }

  static fillOutlineText(text, x, y, lineWidth) {
    this.updateFont();

    this.ctx.miterLimit = 2;
    this.ctx.lineJoin = 'round';

    this.ctx.lineWidth = (lineWidth * this.scale.x);
    this.ctx.strokeText(text, x * this.scale.x, y * this.scale.y);
    this.ctx.lineWidth = 1;
    this.fillText(text, x, y);
  }

  static fillBackground(color) {
    if(typeof color != "string") {
      if(color instanceof Image || color instanceof AssetImage) { this.drawImage(color, 0, 0, this.resolution.w, this.resolution.h); }
      return
    }
    this.setAttribute("fillStyle", color);
    this.fillRect(0, 0, this.resolution.w, this.resolution.h);

  }

  static fillRect(x, y, width, height) {
    this.ctx.fillRect(x * this.scale.x, y * this.scale.y, width * this.scale.x, height * this.scale.y);
  }

  static clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  static resize() {
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
}
