Server = class {
  constructor(id) {
    this.id = id;
    this.entities = {};
    this.clients = {};
    this.dataRecorder = new DataRecorder(this);
  }

  Update(dt) {
    for (var entity_id in this.entities) { this.entities[entity_id].Update(dt); }

    for (var client_id in this.clients) {
      var client = this.clients[client_id];

      client.Update(dt);


      for (var entity_id in this.entities) {
        var entity = this.entities[entity_id];

        if(!client.entity_history[entity_id]) {
          client.entity_history[entity_id] = {};
        }

        client.entity_history[entity_id].position = client.entity_history[entity_id].position || [];

        client.entity_history[entity_id].position.push({t: Date.now() - client.lastUpdated, x: entity.position.x, y: entity.position.y});
      }
    }


  }

  GetEvents(time) {

    var events = {entities: {}};


    for (var entity_id in this.entities) {
      var entity = this.entities[entity_id];

      events.entities[entity_id] = {info: {}};

      for (var k in entity._dataInfo.values) {
        events.entities[entity_id].info[k] = {current: typeof entity[k] == "object" ? Object.assign({}, entity[k]) : entity[k], history: []};
      }

      //console.log(time)

      if(time != null) {

        for (var key in entity._dataInfo.history) {
          for (var h of entity._dataInfo.history[key]) {
            //console.log(`${key}, ${h.t - time}`)


            if(h.t - time >= 0) {
              var frame = Object.assign({}, h);

              frame.t = frame.t - time;



              events.entities[entity_id].info[key].history.push(frame);
            }
          }
        }

      }
    }

    //console.log(events)



    return events;
  }

  HandleConnection(callback) {


    //var id = Utils.AvaliableId(this.clients);
    //var client = new ClientHandle(id);
    //client.playerEntity = this.CreateEntity();
    //this.clients[id] = client;
    //callback({id: id, playerEntity: client.playerEntity.id});
  }

  CreatePlayer(options) {
    return this.CreateBaseEntity(new Entity(), options);
  }

  CreatePlayer(options) {
    return this.CreateBaseEntity(new PlayerEntity(), options);
  }

  CreateBaseEntity(entity, options) {
    options = options || {};

    entity.server = this;

    if(options.id != undefined) {
      entity.id = options.id;
    } else {
      entity.id = Utils.AvaliableId(this.entities);
    }

    if(options.position != undefined) {
      entity.position.x = options.position.x;
      entity.position.y = options.position.y;
    }

    if(options.size != undefined) {
      entity.size = options.size;
    }

    entity.CreateColision();

    this.entities[entity.id] = entity;
    return entity;
  }


  CreateEntity(options) {
    return this.CreateBaseEntity(new Entity(), options);
  }
}
