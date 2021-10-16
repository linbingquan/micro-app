class MicroApp {
    data = {
    };
    listener = {
    };
    setData(appName, payload) {
        this.data[appName] = payload;
        this._trigger(appName, payload);
    }
    getData(appName) {
        return this.data[appName];
    }
    _trigger(appName, payload) {
        const appListeners = this.listener[appName];
        if (appListeners) {
            appListeners.forEach((callback)=>callback(payload)
            );
        }
    }
    addDataListener(appName, dataListener, autoTrigger) {
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
    removeDataListener(appName, dataListener) {
        const appListeners = this.listener[appName];
        if (appListeners) {
            const index = appListeners.findIndex((item)=>item === dataListener
            );
            if (index !== -1) {
                appListeners.splice(index, 1);
            }
        }
    }
    clearDataListener(appName) {
        const appListeners = this.listener[appName];
        if (appListeners) {
            this.listener[appName] = [];
        }
    }
}
const microApp = new MicroApp();
export { microApp as default };
