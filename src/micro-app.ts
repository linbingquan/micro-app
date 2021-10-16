type IData = {
  [key: string]: any;
};

type IListener = {
  [key: string]: Array<Function>;
};

class MicroApp {
  data: IData = {};

  listener: IListener = {};

  setData(appName: string, payload?: any) {
    this.data[appName] = payload;
    this._trigger(appName, payload);
  }

  getData(appName: string) {
    return this.data[appName];
  }

  _trigger(appName: string, payload: any) {
    const appListeners = this.listener[appName];
    if (appListeners) {
      appListeners.forEach((callback) => callback(payload));
    }
  }

  addDataListener(
    appName: string,
    dataListener: Function,
    autoTrigger?: boolean,
  ) {
    let listeners = this.listener[appName];
    if (listeners === undefined) {
      listeners = [];
      this.listener[appName] = listeners;
    }
    listeners.push(dataListener);

    if (autoTrigger) {
      const appData = this.data[appName];
      dataListener(appData);
    }
  }

  removeDataListener(appName: string, dataListener: Function) {
    const appListeners = this.listener[appName];
    if (appListeners) {
      const index = appListeners.findIndex((item) => item === dataListener);
      if (index !== -1) {
        appListeners.splice(index, 1);
      }
    }
  }

  clearDataListener(appName: string) {
    const appListeners = this.listener[appName];
    if (appListeners) {
      this.listener[appName] = [];
    }
  }
}

const microApp = new MicroApp();

export default microApp;
// export { MicroApp };
