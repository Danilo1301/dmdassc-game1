FakeSocketServer = class {
  static functions = {};

  static on(event, fn) { this.functions[event] = fn; }
}

FakeSocketClientHandle = class {
  static functions = {};

  static id = "FAKESOCKETCLIENTHANDLE_ID";

  static on(event, fn) { this.functions[event] = fn; }

  static emit(name, data, callback) {
    setTimeout(() => {
      FakeSocketClient.functions['data'](data, callback);
    }, FakeSocketClient.latency[0])
  }
}

FakeSocketClient = class {
  static latency = [130, 150];
  static functions = {};

  static run() {
    setTimeout(() => {
      FakeSocketServer.functions['connection'](FakeSocketClientHandle);
    }, 200)

    return this;
  }

  static on(event, fn) { this.functions[event] = fn; }

  static emit(name, data, callback) {
    setTimeout(() => {
      FakeSocketClientHandle.functions['data'](data, callback);
    }, FakeSocketClient.latency[0])

  }
}
