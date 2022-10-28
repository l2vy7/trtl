"use strict";
/**
 * TRTL Library
 * 2022
 * < acaiberii.win />
 *
 * Forks and modification is allowed, but please include this license.
 *
 * Copyright 2022 Acaiberii/L2vy7
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurtleContent = exports.TurtleClient = void 0;
const axios_1 = __importDefault(require("axios"));
var request = {
    post: function (url, body, opts) {
        Object.assign(opts, {
            method: 'post',
            url: url,
            data: body,
        });
        Object.assign(opts.headers, {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
        });
        return (0, axios_1.default)(opts);
    },
    get: function (url, opts) {
        Object.assign(opts, {
            method: 'get',
            url: url
        });
        Object.assign(opts.headers, {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
        });
        return (0, axios_1.default)(opts);
    },
    stream: function (url, opts) {
        Object.assign(opts, {
            method: 'get',
            url: url,
            responseType: 'stream'
        });
        Object.assign(opts.headers, {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
        });
        return (0, axios_1.default)(opts);
    }
};
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
    constructor(session, instance = "v2.blacket.org") {
        this.#instance = instance;
        this.events = new events_1.EventEmitter({
            captureRejections: true
        });
        this.#room = "0room";
        this.#session = session;
        this.#socket = (0, socket_io_client_1.io)("https://" + this.#instance + "", {
            extraHeaders: {
                "Cookie": 'connect.sid=' + session + ';'
            }
        });
        this.#socket.on('error', (e) => {
            this.events.emit("error", e);
        });
        this.#socket.on('msg', (data) => {
            switch (data.type) {
                case "receive":
                    this.events.emit("msg", data);
                    break;
                case "clear":
                    this.events.emit("clear", data);
                    break;
                case "joined":
                    this.events.emit("join", data);
                    break;
                case "left":
                    this.events.emit("leave", data);
                    break;
            }
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
        return await request.get("https://" + this.#instance + "/logout", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=0room] - The name of the room, which defaults to 0room.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     */
    async join(room = "0room") {
        this.#room = room;
        this.#socket.emit("joinRoom", {
            id: room
        });
    }
    /**
     * Send a message in a room.
     * @param {string} name - The name of the blook
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async sendMessage(message, room = this.#room) {
        if (room != this.#room) {
            this.#room = room;
        }
        this.#socket.emit("chat", {
            type: "send",
            msg: message,
            room: room || this.#room
        });
    }
    /**
     * Claim daily tokens.
     * @async
     * @returns {Promise} - An Axios request to the /worker/claim endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async claim() {
        return await request.get("https://" + this.#instance + "/worker/claim", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Open a box (or pack).
     * @param {string} name - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async openBox(name) {
        return await request.post("https://" + this.#instance + "/worker/open", {
            pack: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook.
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async sellBlook(name, quantity = 0) {
        return await request.post("https://" + this.#instance + "/worker/sell", {
            blook: name,
            quantity: quantity.toString()
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getNews() {
        return await request.get("https://" + this.#instance + "/worker/news", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getPacks() {
        return await request.get("https://" + this.#instance + "/worker/packs", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getRarities() {
        return await request.get("https://" + this.#instance + "/worker/rarities", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getBlooks() {
        return await request.get("https://" + this.#instance + "/worker/blooks", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getConfig() {
        return await request.get("https://" + this.#instance + "/worker/config", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getLeaderboard() {
        return await request.get("https://" + this.#instance + "/worker/leaderboard", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get existing messages in a channel
     * @param {string} [room=this.#room] - The room to get messages from (defaults to this.#room, which is either 0room or the room you joined).
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getExistingMessages(room = this.#room) {
        return await request.get("https://" + this.#instance + "/worker/messages/" + room, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getUser(name = "") {
        return await request.get(name === "" ? "https://" + this.#instance + "/worker/user" : "https://" + this.#instance + "/worker/user/" + name, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {string} - The session ID.
     */
    async getSession() {
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
        return await request.post(url, body, opts);
    }
    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    async get(url, opts) {
        return await request.get(url, opts);
    }
    /**
     * Set your account's banner.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async setBanner(name) {
        return await request.post("https://" + this.#instance + "/worker/set", {
            type: "banner",
            banner: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Set your account's blook (icon).
     * @param {string} name - The name of the icon.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async setBlook(name) {
        return await request.post("https://" + this.#instance + "/worker/set", {
            type: "blook",
            blook: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Change your account's username.
     * @param {string} name - The new username.
     * @param {string} password - The bot's password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async changeUsername(name, password) {
        return await request.post("https://" + this.#instance + "/worker/change", {
            type: "username",
            username: name,
            password: password
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    /**
     * Change your account's password.
     * @param {string} oldPassword - The bot's old password.
     * @param {string} newPassword - The bot's new password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async changePassword(oldPassword, newPassword) {
        return await request.post("https://" + this.#instance + "/worker/change", {
            type: "password",
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
}
exports.TurtleClient = TurtleClient;
/**
 * The TurtleContent class. Used to get content from a Blacket instance.
 * @type {TurtleContent}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
class TurtleContent {
    #instance;
    /**
     * Construct the TurtleContent class.
     * @constructor
     * @param {string} [instance=v2.blacket.org] - The instance Host Name: For example, "v2.blacket.org".
     * @returns {TurtleContent} - The TurtleContent class.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     */
    constructor(instance = "v2.blacket.org") {
        this.#instance = instance;
    }
    /**
     * Get the image of a blook by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the blook.
     * @async
     * @returns {Promise} - An Axios request to the /content/blooks/ endpoint, to get the blook desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getBlook(name) {
        return request.stream('https://' + this.#instance + '/content/blooks/' + name + '.png', {});
    }
    /**
     * Get the image of a banner by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /content/banners/ endpoint, to get the banner desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getBanner(name) {
        return request.stream('https://' + this.#instance + '/content/banners/' + name + '.png', {});
    }
    /**
     * Get a generic image (such as levelStar.png). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @async
     * @returns {Promise} - An Axios request to the /content/ endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getGeneric(name) {
        return request.stream('https://' + this.#instance + '/content/' + name + '.png', {});
    }
    /**
     * Get a generic image from /images/ (such as images/blacketImageRainbow.gif). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @param {string} [ext=png] - The extension of the image (unlike /content/ where all are .png files).
     * @async
     * @returns {Promise} - An Axios request to the /images endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getGenericImages(name, ext = "png") {
        return request.stream('https://' + this.#instance + '/images/' + name + '.' + ext, {});
    }
    /**
     * Get a stream (preferably an image stream) of a URL.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @async
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    async getStream(url, opts) {
        return request.stream(url, opts);
    }
}
exports.TurtleContent = TurtleContent;
