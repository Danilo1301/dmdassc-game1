Screens = class {
  static currentScreen = null;

  static setCurrentScreen(screen) {
    this.currentScreen = screen;
    this.currentScreen.start();
  }

  static update(delta) {
    if(!this.currentScreen) { return; }
    this.currentScreen.update(delta)
  }

  static render() {
    if(!this.currentScreen) { return; }
    this.currentScreen.render()
  }
}

Screen = class {
  constructor() {}
}
