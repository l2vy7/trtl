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
export declare function extend(classx: any, mods: any): void;
//# sourceMappingURL=extend.d.ts.map