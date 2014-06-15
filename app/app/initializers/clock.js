import Clock from "../clock";

export default {

  name: 'clock'

, initialize: function(container) {
    container.register('clock:main', Clock, { singleton: true });
    container.typeInjection('controller', 'clock', 'clock:main');
  }

};

