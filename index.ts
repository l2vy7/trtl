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

export class TurtleClient {
    #session: string;
    #socket: Socket;

    #room: string;

    events: EventEmitter;

    constructor(session: string) {
        this.events = new EventEmitter({
            captureRejections: true
        });
        this.#room = "0room";
        this.#session = session;
        this.#socket = io("https://blacket.org", {
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
        return await request.get("https://v2.blacket.org/logout",
        {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async join(room: string = "0room") {
        this.#room = room;
        this.#socket.emit("joinRoom", {
            id: room
        });
    }

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

    async openBox(name: string) {
        return await request.post("https://v2.blacket.org/worker/open", {
            pack: name
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async sellBlook(name: string, quantity: number) {
        return await request.post("https://v2.blacket.org/worker/sell", {
            blook: name,
            quantity: quantity.toString()
        }, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getNews() {
        return await request.get("https://v2.blacket.org/worker/news", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getPacks() {
        return await request.get("https://v2.blacket.org/worker/packs", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getRarities() {
        return await request.get("https://v2.blacket.org/worker/rarities", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getBlooks() {
        return await request.get("https://v2.blacket.org/worker/blooks", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getConfig() {
        return await request.get("https://v2.blacket.org/worker/config", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getLeaderboard() {
        request.get("https://v2.blacket.org/worker/leaderboard", {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getExistingMessages(room: string = "0room") {
        return await request.get("https://v2.blacket.org/worker/messages/" + room, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getUser(name: string = "") {
        return await request.get(name === "" ? "https://v2.blacket.org/worker/user" : "https://v2.blacket.org/worker/user/" + name, {
            headers: {
                "Cookie": 'connect.sid=' + this.#session
            }
        })
    }

    async getSession() {
        return this.#session;
    }
}