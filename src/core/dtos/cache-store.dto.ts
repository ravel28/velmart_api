import { CacheTypeEnum } from "../enums/cache.enum"

export class CacheStoreDto {
    category: CacheTypeEnum;
    store: string;
    time?: number;
}