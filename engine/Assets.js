Assets = class {
  static loadQuery = [];
  static fn_onProgress = null;
  static allAssets = {};

  static processAssets() {
    for (var asset_name in this.allAssets) {
      this.allAssets[asset_name].process();
    }
  }

  static get(name) {
    if(!this.allAssets[name]) { return undefined; }
    return this.allAssets[name];
  }

  static add(src, name, type) {
    var asset;

    if(type == Image) {
      asset = new AssetImage(src, name);
    } else if(type == Audio) {
      asset = new AssetAudio(src, name);
    }

    return asset;
  }
}

AssetBase = class {
  constructor(src, name) {
    this.name = name;
    this.src = src;
    this.processed = false;
    this.loaded = false;
  }

  load() {
    var self = this;
    return new Promise(function(resolve) {
      self.e.src = self.path + self.src;

      var onload = function() {
        Assets.allAssets[self.name] = self;
        self.loaded = true;
        resolve();
      }

      if(self.e instanceof Audio) {
        self.e.oncanplaythrough = onload.bind(this);
      } else {
        self.e.onload = onload.bind(this);
      }
    });
  }
}

AssetImage = class extends AssetBase {
  constructor(src, name) {
    super(src, name);

    this.image = document.createElement('canvas');
    this.e = new Image;
    this.path = "/img/";
  }

  process() {
    if(!this.loaded) { return }
    if(this.processed) { return }

    var canvas = this.image;
    var ctx = canvas.getContext('2d');

    canvas.width = this.e.width;
    canvas.height = this.e.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.e, 0, 0);

    this.processed = true;
  }
}

AssetAudio = class extends AssetBase {
  constructor(src, name) {
    super(src, name);

    this.e = new Audio;
    this.path = "/audio/";
  }
}
