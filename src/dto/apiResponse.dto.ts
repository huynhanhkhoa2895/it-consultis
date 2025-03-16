export default class ApiResponse<T> {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: T[];

    constructor(init?: Partial<ApiResponse<T>>) {
        Object.assign(this, init);
    }
}