class DebugManager {
    constructor() {
        this.isDebug = process.env.NODE_ENV;
    }

    log(msg) {
        if (this.isDebug === "development") {
            console.log(msg);
        }
    }
}

export default new DebugManager();