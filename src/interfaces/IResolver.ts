export interface IResolver {
    handle(...args: object[]): Promise<object | string>;
}
