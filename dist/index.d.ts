/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com|Axios Documentation}
 * @see {@link http://socket.io|SocketIO Documentation}
 * @see {@link https://github.com/l2vy7/trtl/blob/main/DOCS.md|Trtl Documentation}
 */
export declare class TurtleClient {
    #private;
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
    constructor(session: string, instance?: string);
    /**
     * Log out of your account if required for security or other reasons.
     * @async
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    logout(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=0room] - The name of the room, which defaults to 0room.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     */
    join(room?: string): Promise<void>;
    /**
     * Send a message in a room.
     * @param {string} name - The name of the blook
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    sendMessage(message: string, room?: string): Promise<void>;
    /**
     * Open a box (or pack).
     * @param {string} name - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    openBox(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    sellBlook(name: string, quantity?: number): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getNews(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getPacks(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getRarities(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getBlooks(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getConfig(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getLeaderboard(): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get existing messages in a channel
     * @param {string} [room=this.#room] - The room to get messages from (defaults to this.#room, which is either 0room or the room you joined).
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getExistingMessages(room?: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com|Axios Documentation}
     */
    getUser(name?: string): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {Promise} - A promise that must be awaited.
     */
    getSession(): Promise<string>;
    /**
     * Add a listener for a particular event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io|SocketIO Documentation}
     */
    on(event: string, callback: any): void;
    /**
     * Add a listener for a particular event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @see {@link http://socket.io|SocketIO Documentation}
     * @returns {void} - Returns nothing.
     */
    socketOn(event: string, callback: any): void;
    /**
     * Emit an event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link https://nodejs.org/api/events.html|NodeJS EventEmitter model}
     * @returns {void} - Returns nothing.
     */
    emit(event: string, data: any): void;
    /**
     * Emit an event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} data - The event's data.
     * @see {@link http://socket.io|SocketIO Documentation}
     * @returns {void} - Returns nothing.
     */
    socketEmit(event: string, data: any): void;
    /**
     * Send a POST request to any URL via Axios.
     * @param {string} url - The URL to post.
     * @param {any} body - The body of the request.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com|Axios Documentation}
     * @returns {Promise} An Axios request to the endpoint you choose, with the body and options you choose.
     */
    post(url: string, body: any, opts: any): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com|Axios Documentation}
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    get(url: string, opts: any): Promise<import("axios").AxiosResponse<any, any>>;
}
//# sourceMappingURL=index.d.ts.map