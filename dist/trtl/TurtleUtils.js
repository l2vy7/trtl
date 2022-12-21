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
     * Hook code after a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookAfter(method, funct) {
        var mth = TurtleUtils.prototype[method];
        if (mth === undefined) {
            TurtleUtils.prototype[method] = funct;
            return;
        }
        var func = funct.toString();
        var entire = mth.toString();
        var code = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var code1 = func.slice(func.indexOf("{") + 1, func.lastIndexOf("}"));
        var codeBeforeReturn = code.slice(0, code.lastIndexOf("return"));
        var codeAfterReturn = code.slice(code.lastIndexOf("return") + 5, code.length - 1);
        TurtleUtils.prototype[method] = codeBeforeReturn + code1 + codeAfterReturn;
    }
    /**
     * Hook code before a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookBefore(method, funct) {
        var mth = TurtleUtils.prototype[method];
        if (mth === undefined) {
            TurtleUtils.prototype[method] = funct;
            return;
        }
        var func = funct.toString();
        var entire = mth.toString();
        var code = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var code1 = func.slice(func.indexOf("{") + 1, func.lastIndexOf("}"));
        TurtleUtils.prototype[method] = code1 + code;
    }
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
     * Register for a Blacket account. This does require the form fields to be filled.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @param {string} age - The user's age (part of form).
     * @param {string} discord - The user's discord (part of signup form).
     * @param {string} playReason - The user's reason for registering (part of form).
     * @returns {Promise} - An Axios request to the /logout endpoint.
     * @async
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async register(username, password, age, discord, playReason) {
        return (await request_1.request.post("https://" + this.#instance + "/worker/register", {
            username: username,
            password: password,
            form: {
                age: age,
                discord: discord,
                body: playReason
            }
        }, {})).data;
    }
    /**
     * Log into a user's account by the username and password, and return the Session ID.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @async
     * @returns {string} - Returns the session ID.
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
            throw new Error("Failed to login.");
        }
        return cook;
    }
}
exports.TurtleUtils = TurtleUtils;
