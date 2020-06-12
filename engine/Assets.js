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

  static addImage(src, name) {
    this.loadQuery.push(new AssetImage(src, name));
    return this;
  }

  static addAudio(src, name) {
    return this;
  }

  static onProgress(fn) {
    this.fn_onProgress = fn;
    return this;
  }

  static load(callback) {
    console.log(this.loadQuery);

    (function loadAsset(i) {
      if(i > Assets.loadQuery.length-1) { return callback(); }
      var item = Assets.loadQuery[i];

      item.e.src = "/img/" + item.src;
      //item.e.src = "/img/" + item.src;

      var onload = function() {
        Assets.fn_onProgress({name: item.name});
        Assets.allAssets[item.name] = item;
        item.loaded = true;
        loadAsset.bind(this, i+1)();
      }

      if(item.e instanceof Audio) {
        item.e.oncanplaythrough = onload.bind(this);
      } else {
        item.e.onload = onload.bind(this);
      }

    })(0);
  }
}

AssetImage = class {
  constructor(src, name) {
    this.image = document.createElement('canvas');

    this.e = new Image;
    this.name = name;
    this.src = src;
    this.processed = false;
    this.loaded = false;

    this.opacity = 1;
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
    console.log(`${this.name} processed!`)
  }
}
