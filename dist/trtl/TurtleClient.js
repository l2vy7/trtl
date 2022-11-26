"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurtleClient = void 0;
const request_1 = require("./util/request");
const socket_io_client_1 = require("socket.io-client");
const events_1 = require("events");
/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
class TurtleClient {
    #session;
    #socket;
    #room;
    #instance;
    /**
     * The client's EventEmitter.
     * @type {EventEmitter}
     * @see {@link https://nodejs.org/api/events.html NodeJS EventEmitter Model} for more information about the NodeJS EventEmitter model.
     */
    events;
    /**
     * Construct the Turtle Client.
     * @constructor
     * @param {string} session - The Session ID, used to log in to the instance.
     * @param {string} [instance=v2.blacket.org] - The instance Host Name: For example, "v2.blacket.org".
     * @returns {TurtleClient} - The client.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     *
     */
    constructor(session, instance = "v2.blacket.org", proxy = "") {
        this.#instance = instance;
        this.events = new events_1.EventEmitter({
            captureRejections: true,
        });
        this.events.setMaxListeners(Infinity);
        this.#room = "global";
        this.#session = session;
        this.#socket = (0, socket_io_client_1.io)("https://" + this.#instance, {
            withCredentials: true,
            reconnection: true,
            extraHeaders: {
                cookie: "connect.sid=" + this.#session,
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
            },
        });
        this.#socket.connect();
        this.#socket.on("error", (e) => {
            this.events.emit("error", e);
        });
        this.#socket.on("join", (data) => {
            this.events.emit("join", data);
        });
        this.#socket.on("leave", (data) => {
            this.events.emit("leave", data);
        });
        this.#socket.on("chat", (data) => {
            this.events.emit("msg", data);
        });
        this.#socket.on("connect", () => {
            this.events.emit("connected");
        });
        this.#socket.on("disconnect", () => {
            this.events.emit("disconnected");
        });
    }
    /**
     * Hook code after a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookAfter(method, funct) {
        var mth = TurtleClient.prototype[method];
        if (mth === undefined) {
            TurtleClient.prototype[method] = funct;
            return;
        }
        var func = funct.toString();
        var entire = mth.toString();
        var code = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var code1 = func.slice(func.indexOf("{") + 1, func.lastIndexOf("}"));
        var codeBeforeReturn = code.slice(0, code.lastIndexOf("return"));
        var codeAfterReturn = code.slice(code.lastIndexOf("return") + 5, code.length - 1);
        TurtleClient.prototype[method] = codeBeforeReturn + code1 + codeAfterReturn;
    }
    /**
     * Hook code before a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookBefore(method, funct) {
        var mth = TurtleClient.prototype[method];
        if (mth === undefined) {
            TurtleClient.prototype[method] = funct;
            return;
        }
        var func = funct.toString();
        var entire = mth.toString();
        var code = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var code1 = func.slice(func.indexOf("{") + 1, func.lastIndexOf("}"));
        TurtleClient.prototype[method] = code1 + code;
    }
    async wait() {
        return await new Promise((res) => {
            this.#socket.on("connect", () => {
                res(this);
            });
        });
    }
    /**
     * Log out of your account if required for security or other reasons.
     * @async
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async logout() {
        this.#socket.disconnect();
        return (await request_1.request.get("https://" + this.#instance + "/logout", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=global] - The name of the room, which defaults to global.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     */
    async join(room = "global") {
        this.#room = room;
        var j = this.#socket.emit("join", room);
        return await new Promise((res) => {
            this.#socket.once("join", () => {
                this.#socket.emit("info");
                this.#socket.once("info", (d) => {
                    res(d);
                });
            });
        });
    }
    /**
     * Send a message in a room.
     * @param {string} message - The content of the message.
     * @async
     * @returns {void} - Returns nothing.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @deprecated WARNING: Disabled for Blacket chat update.
     */
    async send(message) {
        this.#socket.emit("chat", message);
    }
    /**
     * Claim daily tokens.
     * @async
     * @returns {Promise} - An Axios request to the /worker/claim endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async claim() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/claim", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Open a box (or pack).
     * @param {string} name - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async open(name) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/open", {
            pack: name,
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook.
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async sell(name, quantity = 0) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/sell", {
            blook: name,
            quantity: quantity.toString(),
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async news() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/news", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async packs() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/packs", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async rarities() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/rarities", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async blooks() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/blooks", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the available badges.
     * @async
     * @returns {Promise} - An Axios request to the /worker/badges endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async badges() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/badges", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async config() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/config", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async leaderboard() {
        return (await request_1.request.get("https://" + this.#instance + "/worker/leaderboard", {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get existing messages in a channel. Be careful, this switches your room.
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async messages() {
        var j = this.#socket.emit("join", this.#room);
        return await new Promise((res) => {
            this.#socket.once("join", () => {
                this.#socket.emit("info");
                this.#socket.once("info", (d) => {
                    res(d);
                });
            });
        });
    }
    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async user(name = "") {
        return (await request_1.request.get(name === ""
            ? "https://" + this.#instance + "/worker/user"
            : "https://" + this.#instance + "/worker/user/" + name, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {string} - The session ID.
     */
    async session() {
        return this.#session;
    }
    /**
     * Add a listener for a particular event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @return {void} - Returns nothing.
     */
    on(event, callback) {
        this.events.on(event, callback);
    }
    /**
     * Add a listener for a particular event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @returns {void} - Returns nothing.
     */
    socketOn(event, callback) {
        this.#socket.on(event, callback);
    }
    /**
     * Emit an event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link https://nodejs.org/api/events.html NodeJS EventEmitter Model} for more information about the NodeJS EventEmitter model.
     * @returns {void} - Returns nothing.
     */
    emit(event, data) {
        this.events.emit(event, data);
    }
    /**
     * Emit an event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @returns {void} - Returns nothing.
     */
    socketEmit(event, data) {
        this.#socket.emit(event, data);
    }
    /**
     * Send a POST request to any URL via Axios.
     * @param {string} url - The URL to post.
     * @param {any} body - The body of the request.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the body and options you choose.
     */
    async post(url, body, opts) {
        return await request_1.request.post(url, body, opts);
    }
    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    async get(url, opts) {
        return await request_1.request.get(url, opts);
    }
    /**
     * Set your account's banner.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async banner(name) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/set", {
            type: "banner",
            banner: name,
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Set your account's blook (icon).
     * @param {string} name - The name of the icon.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async blook(name) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/set", {
            type: "blook",
            blook: name,
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Change your account's username.
     * @param {string} name - The new username.
     * @param {string} password - The bot's password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async username(name, password) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/change", {
            type: "username",
            username: name,
            password: password,
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Change your account's password.
     * @param {string} oldPassword - The bot's old password.
     * @param {string} newPassword - The bot's new password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async password(oldPassword, newPassword) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/change", {
            type: "password",
            oldPassword: oldPassword,
            newPassword: newPassword,
        }, {
            headers: {
                Cookie: "connect.sid=" + this.#session,
            },
        })).data;
    }
    /**
     * Set the global request handler's proxy. Also affects TurtleClient.get and TurtleClient.post.
     * Most used for farming boxes.
     * @param {string} type - The type (usually http or https) of the proxy.
     * @param {string} url - The URL of the proxy (excluding https:// or /whatever)
     */
    async proxy(type, url) {
        return await request_1.request.proxy(type, url);
    }
}
exports.TurtleClient = TurtleClient;
