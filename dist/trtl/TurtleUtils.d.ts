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
export declare class TurtleUtils {
    #private;
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
    constructor(instance?: string);
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
    register(username: string, password: string, age: string, discord: string, playReason: string): Promise<any>;
    /**
     * Log into a user's account by the username and password, and return the Session ID.
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @async
     * @returns {string} - Returns the session ID.
     */
    login(username: string, password: string): Promise<any>;
}
//# sourceMappingURL=TurtleUtils.d.ts.map