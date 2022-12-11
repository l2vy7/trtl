"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = exports.Debugging = exports.TurtleUtils = exports.TurtleContent = exports.TurtleClient = void 0;
/**
 * /*
 *  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄
 * ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌
 *  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌
 *      ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌
 *      ▐░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌
 *      ▐░▌     ▐░▌      ▐░▌      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
 *      ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░░░░░░░░░░░▌
 *       ▀       ▀         ▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀
 * .########..########.########....###.....######..########....###....########........##..######.....########..#######..########.....########..##..........###.....######..##....##.########.########.##.....##..#######.....
 * .##.....##.##..........##......##.##...##....##....##......##.##...##.....##.......##.##....##....##.......##.....##.##.....##....##.....##.##.........##.##...##....##.##...##..##..........##....##.....##.##.....##....
 * .##.....##.##..........##.....##...##..##..........##.....##...##..##.....##.......##.##..........##.......##.....##.##.....##....##.....##.##........##...##..##.......##..##...##..........##....##.....##........##....
 * .########..######......##....##.....##..######.....##....##.....##.########........##..######.....######...##.....##.########.....########..##.......##.....##.##.......#####....######......##....##.....##..#######.....
 * .##.....##.##..........##....#########.......##....##....#########.##...##...##....##.......##....##.......##.....##.##...##......##.....##.##.......#########.##.......##..##...##..........##.....##...##..##...........
 * .##.....##.##..........##....##.....##.##....##....##....##.....##.##....##..##....##.##....##....##.......##.....##.##....##.....##.....##.##.......##.....##.##....##.##...##..##..........##......##.##...##........###
 * .########..########....##....##.....##..######.....##....##.....##.##.....##..######...######.....##........#######..##.....##....########..########.##.....##..######..##....##.########....##.......###....#########.###
 *
 *
 * TRTL Library
 * 2022
 * acaiberii.win
 *
 * Forks and modification are allowed, but please include this license.
 *
 * Copyright 2022 Acaiberii/L2vy7
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var TurtleClient_1 = require("./trtl/TurtleClient");
Object.defineProperty(exports, "TurtleClient", { enumerable: true, get: function () { return TurtleClient_1.TurtleClient; } });
var TurtleContent_1 = require("./trtl/TurtleContent");
Object.defineProperty(exports, "TurtleContent", { enumerable: true, get: function () { return TurtleContent_1.TurtleContent; } });
var TurtleUtils_1 = require("./trtl/TurtleUtils");
Object.defineProperty(exports, "TurtleUtils", { enumerable: true, get: function () { return TurtleUtils_1.TurtleUtils; } });
exports.Debugging = __importStar(require("./trtl/modular/Debugging"));
exports.Middleware = __importStar(require("./trtl/util/extend"));
