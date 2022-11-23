import { request } from "./util/request";

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
export class TurtleUtils {
  #instance: string;

  /**
   * Hook code after a function is called. Great for plugins and middlewares.
   * @param {string} method - The name of the method in the class.
   * @param {Function} funct - The function's code.
   */
  hookAfter(method: string, funct: Function) {
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
    var codeAfterReturn = code.slice(
      code.lastIndexOf("return") + 5,
      code.length - 1
    );
    TurtleUtils.prototype[method] = codeBeforeReturn + code1 + codeAfterReturn;
  }

  /**
   * Hook code before a function is called. Great for plugins and middlewares.
   * @param {string} method - The name of the method in the class.
   * @param {Function} funct - The function's code.
   */
  hookBefore(method: string, funct: Function) {
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
  constructor(instance: string = "v2.blacket.org") {
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
  async register(username: string, password: string, accessCode: string) {
    return await request.post(
      "https://" + this.#instance + "/worker/register",
      {
        username: username,
        password: password,
        accessCode: accessCode,
      },
      {}
    );
  }

  /**
   * **THIS IS IMPORTANT** - DO NOT USE THIS METHOD. This is a stub and will do nothing. Support will be implemented in the future.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   */
  async login(username: string, password: string) {
    var cook;
    try {
      var resp = await request.post(
        "https://v2.blacket.org/worker/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Cookie: "",
          },
        }
      );
      cook = resp.headers
        .get("set-cookie")[0]
        .split("; ")[0]
        .replace("connect.sid=", "");
    } catch (e) {
      throw new Error("Failed to login.");
    }
    return cook;
  }
}
