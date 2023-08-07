// DELETAR ESSE ARQUIVO !!!!!!!!!!!! <<<<<<<<

export interface returnHandle {
    message: string;
    data?: any;
}

export interface IController {
    handle(...args: any[]): Promise<returnHandle>;
}
