import { request } from "./util/request";

/**
 * The TurtleContent class. Used to get content from a Blacket instance.
 * @type {TurtleContent}
 * @class
 * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
 * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
 */
export class TurtleContent {
  #instance: string;

  /**
   * Construct the TurtleContent class.
   * @constructor
   * @param {string} [instance=v2.blacket.org] - The instance Host Name: For example, "v2.blacket.org".
   * @returns {TurtleContent} - The TurtleContent class.
   * @see {@link http://axios-http.com Axios Documentation} for more information about Axios.
   * @see {@link https://trtl.acaiberii.win/docs/ Trtl Documentation} for more information about Trtl.
   */
  constructor(instance: string = "v2.blacket.org") {
    this.#instance = instance;
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
      "https://" + this.#instance + "/content/blooks/" + name + ".png",
      {}
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
      "https://" + this.#instance + "/content/banners/" + name + ".png",
      {}
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
      "https://" + this.#instance + "/content/" + name + ".png",
      {}
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
      "https://" + this.#instance + "/images/" + name + "." + ext,
      {}
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
