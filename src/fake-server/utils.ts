// application
import { ICursorBasedNavigation, IPageBasedNavigation } from '~/interfaces/list';

export function makeIdGenerator() {
    let lastId = 0;

    return (() => () => {
        lastId += 1;

        return lastId;
    })();
}

export function delayResponse<T>(input: Promise<T> | (() => Promise<T>), time = 500): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(resolve, time);
    }).then(() => (input instanceof Promise ? input : input()));
}

export function error<T>(message: string): Promise<T> {
    return Promise.reject<T>(new Error(message));
}

export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}

export function makePageBasedNavigation<T>(items: T[], limit: number, page: number): [T[], IPageBasedNavigation] {
    const total = items.length;
    const pages = Math.ceil(items.length / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    const chunk = items.slice(from - 1, to);

    return [
        chunk,
        {
            type: 'page',
            limit,
            total,
            page,
            pages,
            from,
            to,
        },
    ];
}

export function makeCursorBasedNavigation<T>(
    items: T[],
    limit: number,
    after: string | undefined,
    before: string | undefined,
    cursor: (item: T) => string,
): [T[], ICursorBasedNavigation] {
    let hasPrevPage: boolean = false;
    let hasNextPage: boolean = false;
    let chunk: T[] = [];
    let startCursor: string | null = null;
    let endCursor: string | null = null;
    let total = 0;

    if (after) {
        const index = items.findIndex((x) => cursor(x) === after);

        if (index >= 0) {
            chunk = items.slice(index + 1, index + 1 + limit);

            if (chunk.length > 0) {
                total = items.length;
                hasPrevPage = index > 0;
                hasNextPage = index + limit < total - 1;
                startCursor = cursor(chunk[0]);
                endCursor = cursor(chunk[chunk.length - 1]);
            }
        }
    } else if (before) {
        const index = items.findIndex((x) => cursor(x) === before);

        if (index >= 0) {
            chunk = items.slice(Math.max(index - limit, 0), index);

            if (chunk.length > 0) {
                total = items.length;
                hasPrevPage = index - limit > 0;
                hasNextPage = index < total;
                startCursor = cursor(chunk[0]);
                endCursor = cursor(chunk[chunk.length - 1]);
            }
        }
    } else {
        chunk = items.slice(0, limit);

        if (chunk.length > 0) {
            total = items.length;
            hasNextPage = total > limit;
            startCursor = cursor(chunk[0]);
            endCursor = cursor(chunk[chunk.length - 1]);
        }
    }

    return [
        chunk,
        {
            type: 'cursor',
            limit,
            total,
            startCursor,
            endCursor,
            hasPreviousPage: hasPrevPage,
            hasNextPage,
        },
    ];
}
