/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * The TurtleClient class.
 * @type {TurtleClient}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 
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
     * @param {string} [instance=blacket.org] - The instance Host Name: For example, "blacket.org".
     * @param {boolean} [secure=true] - Set to false if the instance is not secure.
     * @returns {TurtleClient} - The client.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     *
     */
    constructor(session: string, instance?: string, proxy?: string, secure?: boolean);
    getSocket(): WebSocket;
    /**
     * Hook code after a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookAfter(method: string, funct: Function): void;
    /**
     * Hook code before a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookBefore(method: string, funct: Function): void;
    wait(): Promise<unknown>;
    /**
     * Log out of your account if required for security or other reasons.
     * @async
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    logout(): Promise<any>;
    /**
     * Join a specific room, which you can then send messages in or get existing messages from.
     * @param {string} [name=global] - The name of the room, which defaults to global.
     * @async
     * @returns {Promise} - A promise that must be awaited.
     
     */
    join(room?: string): Promise<unknown>;
    /**
     * Send a message in a room.
     * @param {string} message - The content of the message.
     * @async
     * @returns {void} - Returns nothing.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    send(message: string): Promise<void>;
    /**
     * Claim daily tokens.
     * @async
     * @returns {Promise} - Response of /worker/claim endpoint as json.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    claim(): Promise<any>;
    /**
     * Open a box (or pack).
     * @param {string} pack - The name of the box (or pack) to open.
     * @async
     * @returns {Promise} - An Axios request to the /worker/open endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    open(pack: string): Promise<any>;
    /**
     * Sell a blook or multiple blooks
     * @param {string} name - The name of the blook.
     * @param {number} [quantity=0] - The quantity to sell.
     * @async
     * @returns {Promise} - An Axios request to the /worker/sell endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    sell(name: string, quantity?: number): Promise<any>;
    /**
     * Get the news of the current instance.
     * @async
     * @returns {Promise} - An Axios request to the /worker/news endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    news(): Promise<any>;
    /**
     * Get the available packs of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/packs endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    packs(): Promise<any>;
    /**
     * Get the rarities of blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/rarities endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    rarities(): Promise<any>;
    /**
     * Get the available blooks.
     * @async
     * @returns {Promise} - An Axios request to the /worker/blooks endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    blooks(): Promise<any>;
    /**
     * Get the available badges.
     * @async
     * @returns {Promise} - An Axios request to the /worker/badges endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    badges(): Promise<any>;
    /**
     * Get the current instance's configuration.
     * @async
     * @returns {Promise} - An Axios request to the /worker/config endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    config(): Promise<any>;
    /**
     * Get users that are on the leaderboard.
     * @async
     * @returns {Promise} - An Axios request to the /worker/leaderboard endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    leaderboard(): Promise<any>;
    /**
     * Get existing messages in a channel. Be careful, this switches your room.
     * @async
     * @returns {Promise} - An Axios request to the /worker/messages endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    messages(room?: string): Promise<unknown>;
    /**
     * Get detailed information about yourself, or less detailed information about others.
     * @param {string} [name=] - A user's name. Leave blank for yourself, or use a string for others.
     * @async
     * @returns {Promise} - An Axios request to the /worker/user endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    user(name?: string): Promise<any>;
    /**
     * Get the client's session ID. Please do not share this with others: this will allow others to access your account.
     * @returns {string} - The session ID.
     */
    session(): Promise<string>;
    /**
     * Add a listener for a particular event from the class's EventEmitter (client.events).
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
     * @return {void} - Returns nothing.
     */
    on(event: string, callback: any): void;
    /**
     * Add a listener for a particular event from the Blacket socket.
     * @param {string} event - The event's name.
     * @param {any} callback - The callback that is called when the event is received.
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
    post(url: string, body: any, opts: any): Promise<any>;
    /**
     * Send a GET request to any URL via Axios.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    get(url: string, opts: any): Promise<any>;
    /**
     * Set your account's banner.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    banner(name: string): Promise<any>;
    /**
     * Set your account's blook (icon).
     * @param {string} name - The name of the icon.
     * @async
     * @returns {Promise} - An Axios request to the /worker/set endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    blook(name: string): Promise<any>;
    /**
     * Change your account's username.
     * @param {string} name - The new username.
     * @param {string} password - The bot's password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    username(name: string, password: string): Promise<any>;
    color(newColor: string): Promise<any>;
    /**
     * Change your account's password.
     * @param {string} oldPassword - The bot's old password.
     * @param {string} newPassword - The bot's new password.
     * @async
     * @returns {Promise} - An Axios request to the /worker/change endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    password(oldPassword: string, newPassword: string): Promise<any>;
    /**
     * Set the global request handler's proxy. Also affects TurtleClient.get and TurtleClient.post.
     * Most used for farming boxes.
     * @param {string} type - The type (usually http or https) of the proxy.
     * @param {string} url - The URL of the proxy (excluding https:// or /whatever)
     * @async
     */
    proxy(type: string, url: string): Promise<void>;
    /**
     * Get the ID of a user. Used mainly for TurtleClient.trade.
     * @param user - The name of the user to get the ID from.
     * @async
     */
    id(user: string): Promise<any>;
    /**
     * Trades with a user. Should be wrapped in a .on("connected"). Can be awaited.
     * @param name - Name of the user you want to trade with
     * @example
     * client.trade('acai');
     * @async
     */
    trade(name: string): Promise<boolean>;
    /**
     * Fires when the other user updates their blooks.
     * @param callback The callback to be called when the other user updates their blooks
     */
    onBlookChange(callback: any): void;
    /**
     * Cancels your current trade request.
     */
    cancel(): void;
    /**
     * Waits for a trade to be accepted or declined. Returns true if the trade was accepted and false if the trade was declined.
     * @async
     */
    waitTrade(): Promise<boolean>;
    /**
     * Adds one or more of a blook to a trade
     * @param name - The blook to add to the trade
     * @param {number} [count=1] - The number of blooks to trade. Default one.
     */
    tradeBlook(name: string, count?: number): void;
    /**
     * Removes a blook from the trade.
     * @param name The name of the blook to remove.
     */
    removeBlook(name: string): void;
    /**
     * Declines a trade while inside.
     */
    declineTrade(): void;
    acceptTrade(): void;
}
//# sourceMappingURL=TurtleClient.d.ts.map