export interface IResolver {
    handle(...args: object[] | string[]): Promise<object | string | boolean>;
}
