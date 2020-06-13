Server = class {
  constructor() {

  }

  OnPlayerConnect(clientHandle, callback) {
    console.log(`${clientHandle.uid} connected to server`)

    callback({voce: 'entrou'});
  }
}
