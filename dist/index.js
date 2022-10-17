"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurtleClient = void 0;
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
    }
};
const socket_io_client_1 = require("socket.io-client");
const events_1 = require("events");
class TurtleClient {
    #session;
    #socket;
    #room;
    events;
    constructor(session) {
        this.events = new events_1.EventEmitter({
            captureRejections: true
        });
        this.#room = "0room";
        this.#session = session;
        this.#socket = (0, socket_io_client_1.io)("https://blacket.org", {
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
    async logout() {
        this.#socket.disconnect();
        return await request.get("https://v2.blacket.org/logout", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async join(room = "0room") {
        this.#room = room;
        this.#socket.emit("joinRoom", {
            id: room
        });
    }
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
    async openBox(name) {
        return await request.post("https://v2.blacket.org/worker/open", {
            pack: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async sellBlook(name, quantity) {
        return await request.post("https://v2.blacket.org/worker/sell", {
            blook: name,
            quantity: quantity.toString()
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getNews() {
        return await request.get("https://v2.blacket.org/worker/news", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getPacks() {
        return await request.get("https://v2.blacket.org/worker/packs", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getRarities() {
        return await request.get("https://v2.blacket.org/worker/rarities", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getBlooks() {
        return await request.get("https://v2.blacket.org/worker/blooks", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getConfig() {
        return await request.get("https://v2.blacket.org/worker/config", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getLeaderboard() {
        return await request.get("https://v2.blacket.org/worker/leaderboard", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getExistingMessages(room = "0room") {
        return await request.get("https://v2.blacket.org/worker/messages/" + room, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getUser(name = "") {
        return await request.get(name === "" ? "https://v2.blacket.org/worker/user" : "https://v2.blacket.org/worker/user/" + name, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        });
    }
    async getSession() {
        return this.#session;
    }
}
exports.TurtleClient = TurtleClient;
