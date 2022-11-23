"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurtleUtils = void 0;
const request_1 = require("./util/request");
/**
 * Trtl's utility class.
 * Provides support for anything that does NOT need authentication.
 * @type {TurtleUtils}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 *
 */
class TurtleUtils {
    #instance;
    /**
     * Since this does not need authentication or options.
     * Construct the utility class.
     * @constructor
     * @param {string} instance - The instance of Blacket.
     * @returns {TurtleUtils} - The class.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @see {@link http://socket.io SocketIO Documentation} for more information about SocketIO.
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     */
    constructor(instance = "v2.blacket.org") {
        this.#instance = instance;
    }
    /**
     * Register for a Blacket account.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @param {string} accessCode - The access code. Will be removed at a later date (around December 30th).
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async register(username, password, accessCode) {
        return await request_1.request.post("https://" + this.#instance + "/worker/register", {
            username: username,
            password: password,
            accessCode: accessCode,
        }, {});
    }
    /**
     * **THIS IS IMPORTANT** - DO NOT USE THIS METHOD. This is a stub and will do nothing. Support will be implemented in the future.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     */
    async login(username, password) {
        var cook;
        try {
            var resp = await request_1.request.post("https://v2.blacket.org/worker/login", {
                username: username,
                password: password,
            }, {
                headers: {
                    Cookie: "",
                },
            });
            cook = resp.headers
                .get("set-cookie")[0]
                .split("; ")[0]
                .replace("connect.sid=", "");
        }
        catch (e) {
            throw new Error('Failed to login.');
        }
        return cook;
    }
}
exports.TurtleUtils = TurtleUtils;
