import {
    request
} from "./util/request";

/**
 * The TurtleContent class. Used to get content from a Blacket instance.
 * @type {TurtleContent}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
export class TurtleContent {
    #instance: string;
    #protocol: string;
    /**
     * Construct the TurtleContent class.
     * @constructor
     * @param {string} [instance=blacket.org] - The instance Host Name: For example, "blacket.org".
     * @param {string} [secure=true] - If the connection should be made securely.
     * @returns {TurtleContent} - The TurtleContent class.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
     */
    constructor(instance: string = "blacket.org", secure: boolean = true) {
        this.#instance = instance;
        this.#protocol = secure ? "https://" : "http://";
    }

    /**
     * Hook code after a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookAfter(method: string, funct: Function) {
        var mth = TurtleContent.prototype[method];
        if (mth === undefined) {
            TurtleContent.prototype[method] = funct;
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
        TurtleContent.prototype[method] =
            codeBeforeReturn + code1 + codeAfterReturn;
    }

    /**
     * Hook code before a function is called. Great for plugins and middlewares.
     * @param {string} method - The name of the method in the class.
     * @param {Function} funct - The function's code.
     */
    hookBefore(method: string, funct: Function) {
        var mth = TurtleContent.prototype[method];
        if (mth === undefined) {
            TurtleContent.prototype[method] = funct;
            return;
        }
        var func = funct.toString();
        var entire = mth.toString();
        var code = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
        var code1 = func.slice(func.indexOf("{") + 1, func.lastIndexOf("}"));
        TurtleContent.prototype[method] = code1 + code;
    }

    /**
     * Get the image of a blook by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the blook.
     * @async
     * @returns {Promise} - An Axios request to the /content/blooks/ endpoint, to get the blook desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getBlook(name: string) {
        return request.stream(
            this.#protocol + this.#instance + "/content/blooks/" + name + ".png", {}
        );
    }

    /**
     * Get the image of a banner by a name. Does not require a Session ID for authentication.
     * @param {string} name - The name of the banner.
     * @async
     * @returns {Promise} - An Axios request to the /content/banners/ endpoint, to get the banner desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getBanner(name: string) {
        return request.stream(
            this.#protocol + this.#instance + "/content/banners/" + name + ".png", {}
        );
    }

    /**
     * Get a generic image (such as levelStar.png). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @async
     * @returns {Promise} - An Axios request to the /content/ endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getGeneric(name: string) {
        return request.stream(
            this.#protocol + this.#instance + "/content/" + name + ".png", {}
        );
    }

    /**
     * Get a generic image from /images/ (such as images/blacketImageRainbow.gif). Does not require a Session ID for authentication.
     * @param {string} name - The name of the image.
     * @param {string} [ext=png] - The extension of the image (unlike /content/ where all are .png files).
     * @async
     * @returns {Promise} - An Axios request to the /images endpoint, to get the image desired. Returns data in a stream format.
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     */
    async getGenericImages(name: string, ext: string = "png") {
        return request.stream(
            this.#protocol + this.#instance + "/images/" + name + "." + ext, {}
        );
    }

    /**
     * Get a stream (preferably an image stream) of a URL.
     * @param {string} url - The URL to get.
     * @param {any} opts - The options of the request.
     * @async
     * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
     * @returns {Promise} An Axios request to the endpoint you choose, with the options you choose.
     */
    async getStream(url: string, opts: any) {
        return request.stream(url, opts);
    }
}