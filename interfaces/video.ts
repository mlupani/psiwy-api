import { ICustodian, IReceptor } from './';

export interface IVideo {
    authorID: number;
    duration: number;
    url:string;
    title: string;
    description: string;
    custodians: ICustodian[];
    receptors: IReceptor[];
    delivered: boolean;
    deliveryDate?: boolean;
    createdAt: Date;
    lastUpdateDate: Date;
}
