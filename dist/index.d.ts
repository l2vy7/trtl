/// <reference types="node" />
import { EventEmitter } from "events";
export declare class TurtleClient {
    #private;
    events: EventEmitter;
    constructor(session: string);
    logout(): Promise<import("axios").AxiosResponse<any, any>>;
    join(room?: string): Promise<void>;
    sendMessage(message: string, room: string): Promise<void>;
    openBox(name: string): Promise<import("axios").AxiosResponse<any, any>>;
    sellBlook(name: string, quantity: number): Promise<import("axios").AxiosResponse<any, any>>;
    getNews(): Promise<import("axios").AxiosResponse<any, any>>;
    getPacks(): Promise<import("axios").AxiosResponse<any, any>>;
    getRarities(): Promise<import("axios").AxiosResponse<any, any>>;
    getBlooks(): Promise<import("axios").AxiosResponse<any, any>>;
    getConfig(): Promise<import("axios").AxiosResponse<any, any>>;
    getLeaderboard(): Promise<void>;
    getExistingMessages(room?: string): Promise<import("axios").AxiosResponse<any, any>>;
    getUser(name?: string): Promise<import("axios").AxiosResponse<any, any>>;
    getSession(): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map