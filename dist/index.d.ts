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
/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
export declare class TurtleClient {
    #private;
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
    constructor(session: string, instance?: string);
    /**
     * Log out of your account if required for security or other reasons.
     * @async
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    logout(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=0room] - The name of the room, which defaults to 0room.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     */
    join(room?: string): Promise<void>;
    /**
     * Send a message in a room.
     * @param {string} name - The name of the blook
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    sendMessage(message: string, room?: string): Promise<void>;
    /**
     * Claim daily tokens.
     * @async
     * @returns {Promise} - An Axios request to the /worker/claim endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    claim(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Open a box (or pack).
     * @param {string} name - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    openBox(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook.
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    sellBlook(name: string, quantity?: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getNews(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getPacks(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getRarities(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getBlooks(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getConfig(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getLeaderboard(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get existing messages in a channel
     * @param {string} [room=this.#room] - The room to get messages from (defaults to this.#room, which is either 0room or the room you joined).
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getExistingMessages(room?: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getUser(name?: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {string} - The session ID.
     */
    getSession(): Promise<string>;
    /**
     * Add a listener for a particular event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @return {void} - Returns nothing.
     */
    on(event: string, callback: any): void;
    /**
     * Add a listener for a particular event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @returns {void} - Returns nothing.
     */
    socketOn(event: string, callback: any): void;
    /**
     * Emit an event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link https://nodejs.org/api/events.html NodeJS EventEmitter Model} for more information about the NodeJS EventEmitter model.
     * @returns {void} - Returns nothing.
     */
    emit(event: string, data: any): void;
    /**
     * Emit an event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @returns {void} - Returns nothing.
     */
    socketEmit(event: string, data: any): void;
    /**
     * Send a POST request to any URL via Axios.
     * @param {string} url - The URL to post.
     * @param {any} body - The body of the request.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the body and options you choose.
     */
    post(url: string, body: any, opts: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    get(url: string, opts: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Set your account's banner.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    setBanner(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Set your account's blook (icon).
     * @param {string} name - The name of the icon.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    setBlook(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Change your account's username.
     * @param {string} name - The new username.
     * @param {string} password - The bot's password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    changeUsername(name: string, password: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Change your account's password.
     * @param {string} oldPassword - The bot's old password.
     * @param {string} newPassword - The bot's new password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    changePassword(oldPassword: string, newPassword: string): Promise<import("axios").AxiosResponse<any, any>>;
}
/**
 * The TurtleContent class. Used to get content from a Blacket instance.
 * @type {TurtleContent}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
export declare class TurtleContent {
    #private;
    /**
     * Construct the TurtleContent class.
     * @constructor
     * @param {string} [instance=v2.blacket.org] - The instance Host Name: For example, "v2.blacket.org".
     * @returns {TurtleContent} - The TurtleContent class.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     */
    constructor(instance?: string);
    /**
     * Get the image of a blook by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the blook.
     * @async
     * @returns {Promise} - An Axios request to the /content/blooks/ endpoint, to get the blook desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getBlook(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the image of a banner by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /content/banners/ endpoint, to get the banner desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getBanner(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get a generic image (such as levelStar.png). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @async
     * @returns {Promise} - An Axios request to the /content/ endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getGeneric(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get a generic image from /images/ (such as images/blacketImageRainbow.gif). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @param {string} [ext=png] - The extension of the image (unlike /content/ where all are .png files).
     * @async
     * @returns {Promise} - An Axios request to the /images endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    getGenericImages(name: string, ext?: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get a stream (preferably an image stream) of a URL.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @async
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    getStream(url: string, opts: any): Promise<import("axios").AxiosResponse<any, any>>;
}
//# sourceMappingURL=index.d.ts.map