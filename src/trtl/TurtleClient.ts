import { request } from "./util/request";

import { io, Socket } from "socket.io-client";
import { EventEmitter } from "events";

/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
export class TurtleClient {
  #session: string;
  #socket: Socket;

  #room: string;

  #instance: string;

  /**
   * The client's EventEmitter.
   * @type {EventEmitter}
   * @see {@link https://nodejs.org/api/events.html NodeJS EventEmitter Model} for more information about the NodeJS EventEmitter model.
   */
  events: EventEmitter;

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
  constructor(
    session: string,
    instance: string = "v2.blacket.org",
    proxy: string = ""
  ) {
    this.#instance = instance;
    this.events = new EventEmitter({
      captureRejections: true,
    });
    this.#room = "0room";
    this.#session = session;
    this.#socket = io("https://" + this.#instance + "", {
      extraHeaders: {
        Cookie: "connect.sid=" + session + ";",
      },
    });
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
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Join a specific room, which you can then send messages in or get existing messages from.
   * @param {string} [name=global] - The name of the room, which defaults to 0room.
   * @async
   * @returns {Promise} - A promise that must be awaited.
   * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
   */
  async join(room: string = "global") {
    this.#room = room;
    this.#socket.emit("join", room);
  }

  /**
   * Send a message in a room.
   * @param {string} message - The content of the message.
   * @async
   * @returns {void} - Returns nothing.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   * @deprecated WARNING: Disabled for Blacket chat update.
   */
  async send(message: string) {
    this.#socket.emit("chat", message);
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
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Open a box (or pack).
   * @param {string} name - The name of the box (or pack) to open.
   * @async
   * @returns {Promise} - An Axios request to the /worker/open endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async open(name: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/open",
      {
        pack: name,
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Sell a blook or multiple blooks
   * @param {string} name - The name of the blook.
   * @param {number} [quantity=0] - The quantity to sell.
   * @async
   * @returns {Promise} - An Axios request to the /worker/sell endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async sell(name: string, quantity: number = 0) {
    return await request.post(
      "https://" + this.#instance + "/worker/sell",
      {
        blook: name,
        quantity: quantity.toString(),
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Get the news of the current instance.
   * @async
   * @returns {Promise} - An Axios request to the /worker/news endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async news() {
    return await request.get("https://" + this.#instance + "/worker/news", {
      headers: {
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Get the available packs of blooks.
   * @async
   * @returns {Promise} - An Axios request to the /worker/packs endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async packs() {
    return await request.get("https://" + this.#instance + "/worker/packs", {
      headers: {
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Get the rarities of blooks.
   * @async
   * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async rarities() {
    return await request.get("https://" + this.#instance + "/worker/rarities", {
      headers: {
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Get the available blooks.
   * @async
   * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async blooks() {
    return await request.get("https://" + this.#instance + "/worker/blooks", {
      headers: {
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Get the current instance's configuration.
   * @async
   * @returns {Promise} - An Axios request to the /worker/config endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async config() {
    return await request.get("https://" + this.#instance + "/worker/config", {
      headers: {
        Cookie: "connect.sid=" + this.#session,
      },
    });
  }

  /**
   * Get users that are on the leaderboard.
   * @async
   * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async leaderboard() {
    return await request.get(
      "https://" + this.#instance + "/worker/leaderboard",
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Get existing messages in a channel
   * @param {string} [room=this.#room] - The room to get messages from (defaults to this.#room, which is either 0room or the room you joined).
   * @async
   * @returns {Promise} - An Axios request to the /worker/messages endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async messages(room: string = this.#room) {
    return await request.get(
      "https://" + this.#instance + "/worker/messages/" + room,
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Get detailed information about yourself, or less detailed information about others.
   * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
   * @async
   * @returns {Promise} - An Axios request to the /worker/user endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async user(name: string = "") {
    return await request.get(
      name === ""
        ? "https://" + this.#instance + "/worker/user"
        : "https://" + this.#instance + "/worker/user/" + name,
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
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
  on(event: string, callback: any) {
    this.events.on(event, callback);
  }

  /**
   * Add a listener for a particular event from the Blacket socket.
   * @param {string} event - The event's name.
   * @param {any} callback - The callback that is called when the event is received.
   * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
   * @returns {void} - Returns nothing.
   */
  socketOn(event: string, callback: any) {
    this.#socket.on(event, callback);
  }

  /**
   * Emit an event from the class's EventEmitter (client.events).
   * @param {string} event - The event's name.
   * @param {any} data - The event's data.
   * @see {@link https://nodejs.org/api/events.html NodeJS EventEmitter Model} for more information about the NodeJS EventEmitter model.
   * @returns {void} - Returns nothing.
   */
  emit(event: string, data: any) {
    this.events.emit(event, data);
  }

  /**
   * Emit an event from the Blacket socket.
   * @param {string} event - The event's name.
   * @param {any} data - The event's data.
   * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
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
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   * @returns {Promise} An Axios request to the endpoint you choose, with the body and options you choose.
   */
  async post(url: string, body: any, opts: any) {
    return await request.post(url, body, opts);
  }

  /**
   * Send a GET request to any URL via Axios.
   * @param {string} url - The URL to get.
   * @param {any} opts - The options of the request.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
   */
  async get(url: string, opts: any) {
    return await request.get(url, opts);
  }

  /**
   * Set your account's banner.
   * @param {string} name - The name of the banner.
   * @async
   * @returns {Promise} - An Axios request to the /worker/set endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async banner(name: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/set",
      {
        type: "banner",
        banner: name,
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Set your account's blook (icon).
   * @param {string} name - The name of the icon.
   * @async
   * @returns {Promise} - An Axios request to the /worker/set endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async blook(name: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/set",
      {
        type: "blook",
        blook: name,
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Change your account's username.
   * @param {string} name - The new username.
   * @param {string} password - The bot's password.
   * @async
   * @returns {Promise} - An Axios request to the /worker/change endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async username(name: string, password: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/change",
      {
        type: "username",
        username: name,
        password: password,
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Change your account's password.
   * @param {string} oldPassword - The bot's old password.
   * @param {string} newPassword - The bot's new password.
   * @async
   * @returns {Promise} - An Axios request to the /worker/change endpoint.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   */
  async password(oldPassword: string, newPassword: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/change",
      {
        type: "password",
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Cookie: "connect.sid=" + this.#session,
        },
      }
    );
  }

  /**
   * Set the global request handler's proxy. Also affects TurtleClient.get and TurtleClient.post.
   * Most used for farming boxes.
   * @param {string} type - The type (usually http or https) of the proxy.
   * @param {string} url - The URL of the proxy (excluding https:// or /whatever)
   */
  async proxy(type: string, url: string) {
    return await request.proxy(type, url);
  }
}
