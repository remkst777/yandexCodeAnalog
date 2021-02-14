import Service from './service';
export default class {
    private service;
    constructor(service: Service);
    create(dto: any): Promise<void>;
    findAll(): Promise<any[]>;
}
