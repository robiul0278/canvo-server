export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface PaginateOptions {
    page: number;
    limit: number;
    sort?: Record<string, 1 | -1>;
    populate?: string | {
        path: string;
        select?: string;
    } | (string | {
        path: string;
        select?: string;
    })[];
    select?: string;
    lean?: boolean;
}
export type FilterObject = Record<string, any>;
export declare class QueryHelper {
    static buildTextSearch(fields: string[], term?: string | null): FilterObject | undefined;
    static buildRegexFilter(field: string, term?: string | null): FilterObject | undefined;
    static buildRangeFilter(field: string, min?: number | null, max?: number | null): FilterObject | undefined;
    static buildDateRangeFilter(field: string, startDate?: string | Date | null, endDate?: string | Date | null): FilterObject | undefined;
    static buildMatchFilter(field: string, value?: any): FilterObject | undefined;
    static buildBoolFilter(field: string, value?: boolean | null): FilterObject | undefined;
    static buildInFilter(field: string, values?: any[]): FilterObject | undefined;
    static buildExistsFilter(field: string, exists?: boolean): FilterObject;
    static buildOrFilter(...conditions: (FilterObject | undefined)[]): FilterObject | undefined;
    static buildNotEqualFilter(field: string, value?: any): FilterObject | undefined;
    static buildSort(sortKey?: string | null, defaults?: Record<string, 1 | -1>): Record<string, 1 | -1>;
    static combine(...filters: (FilterObject | undefined)[]): FilterObject;
    static getSkip(page: number, limit: number): number;
    static buildPaginatedResponse<T>(items: T[], total: number, page: number, limit: number): PaginatedResult<T>;
    static paginate<T>(model: any, filter: FilterObject, options: PaginateOptions): Promise<PaginatedResult<T>>;
}
