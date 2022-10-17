import axios from 'axios';

var request = {
  post : function (url : string, body: any, opts: any) {
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
    return axios(opts);
  },
  get : function (url : string, opts: any) {
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
    return axios(opts);
  }
};

import {
    io,
    Socket
} from "socket.io-client";
import {
    EventEmitter
} from "events";

/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com|Axios Documentation}
 * @see {@link http://socket.io|SocketIO Documentation}
 * @see {@link https://github.com/l2vy7/trtl/blob/main/DOCS.md|Trtl Documentation}
 */
export class TurtleClient {
    #session: string;
    #socket: Socket;

    #room: string;

    #instance: string;

    /**
     * The client's EventEmitter.
     * @type {EventEmitter}
     * @see {@link https://nodejs.org/api/events.html|NodeJS EventEmitter model}
     */
    events: EventEmitter;

    /**
     * Construct the Turtle Client.
     * @constructor
     * @param {string} session - The Session ID, used to log in to the instance.
     * @param {string} [instance=v2.blacket.org] - The instance Host Name: For example, "v2.blacket.org".
     * @returns {TurtleClient} - The client.
     * @see {@link http://axios-http.com|Axios Documentation}
     * @see {@link http://socket.io|SocketIO Documentation}
     * @see {@link https://github.com/l2vy7/trtl/blob/main/DOCS.md|Trtl Documentation}
     * 
     */
    constructor(session: string, instance: string = "v2.blacket.org") {
        this.#instance = instance;
        this.events = new EventEmitter({
            captureRejections: true
        });
        this.#room = "0room";
        this.#session = session;
        this.#socket = io("https://"+this.#instance+"", {
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
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async logout() {
        this.#socket.disconnect();
        return await request.get("https://"+this.#instance+"/logout",
        {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=0room] - The name of the room, which defaults to 0room.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     */
    async join(room: string = "0room") {
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
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async sendMessage(message: string, room: string = this.#room) {
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
     * Open a box (or pack).
     * @param {string} name - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async openBox(name: string) {
        return await request.post("https://"+this.#instance+"/worker/open", {
            pack: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async sellBlook(name: string, quantity: number = 0) {
        return await request.post("https://"+this.#instance+"/worker/sell", {
            blook: name,
            quantity: quantity.toString()
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getNews() {
        return await request.get("https://"+this.#instance+"/worker/news", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getPacks() {
        return await request.get("https://"+this.#instance+"/worker/packs", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getRarities() {
        return await request.get("https://"+this.#instance+"/worker/rarities", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getBlooks() {
        return await request.get("https://"+this.#instance+"/worker/blooks", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getConfig() {
        return await request.get("https://"+this.#instance+"/worker/config", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getLeaderboard() {
        return await request.get("https://"+this.#instance+"/worker/leaderboard", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get existing messages in a channel
     * @param {string} [room=this.#room] - The room to get messages from (defaults to this.#room, which is either 0room or the room you joined).
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getExistingMessages(room: string = this.#room) {
        return await request.get("https://"+this.#instance+"/worker/messages/" + room, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    async getUser(name: string = "") {
        return await request.get(name === "" ? "https://"+this.#instance+"/worker/user" : "https://"+this.#instance+"/worker/user/" + name, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {Promise} - A promise that must be awaited.
     */
    async getSession() {
        return this.#session;
    }

    /**
     * Add a listener for a particular event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io|SocketIO Documentation}
     */
    on(event: string, callback: any) {
        this.events.on(event, callback);
    }

    /**
     * Add a listener for a particular event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io|SocketIO Documentation}
     * @returns {void} - Returns nothing.
     */
    socketOn(event: string, callback: any) {
        this.#socket.on(event, callback);
    }

    /**
     * Emit an event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link https://nodejs.org/api/events.html|NodeJS EventEmitter model}
     * @returns {void} - Returns nothing.
     */
    emit(event: string, data: any) {
        this.events.emit(event, data);
    }


    /**
     * Emit an event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link http://socket.io|SocketIO Documentation}
     * @returns {void} - Returns nothing.
     */
    socketEmit(event: string, data: any) {
        this.#socket.emit(event, data);
    }

    /**
     * Send a POST request to any URL via Axios.
     * @param {string} url - The URL to post.
     * @param {any} body - The body of the request.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com|Axios Documentation}
     * @returns {Promise} An Axios request to the endpoint you choose, with the body and options you choose.
     */
    async post(url: string, body: any, opts: any) {
        return await request.post(url, body, opts);
    }


    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com|Axios Documentation}
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    async get(url: string, opts: any) {
        return await request.get(url, opts);
    }
}