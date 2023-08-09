export interface IResolver {
    handle(...args: any[]): Promise<object | string | boolean>;
}
