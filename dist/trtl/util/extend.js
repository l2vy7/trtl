"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
var exists = (val) => val !== null && val !== undefined && typeof val !== "undefined";
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Create an extensive middleware that extends a class.
 * @param classx - The class (without the prototype, we'll handle that.)
 * @param mods - The list of method names to extend (or define), and where they should be placed.
 * @example
 * Middleware.extend(TurtleClient, {
 *     send : ['before', `
 *          console.log('Sending message...');
 *     `],
 *     myNewMethod : ['arg1, arg2, arg3', `
 *          return arg1 + arg2 + arg3;
 *     `]
 * })
 */
function extend(classx, mods) {
    var proto = classx.prototype;
    for (var x of Object.entries(mods)) {
        if (!exists(proto[x[0]]))
            classx.prototype[x[0]] = Function(...x[1][0].split(",").join(", ").split(", "), x[1][1]);
        else
            classx.prototype["hook" + capitalizeFirstLetter(x[1][0])](x[0], x[1][1]);
    }
}
exports.extend = extend;
