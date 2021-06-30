// application
import { IBaseCategory, ICategory } from '~/interfaces/category';
import { INavigation } from '~/interfaces/list';

export function baseUrl(url: string): string {
    if (/^\/([^/]|$)/.test(url)) {
        return `${process.env.basePath}${url}`;
    }

    return url;
}

export function getCategoryPath<T extends IBaseCategory>(category: T | null | undefined): T[] {
    return category ? [...getCategoryPath(category.parent), category] : [];
}

export function getCategoryParents(category: ICategory): ICategory[] {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}

export function isArrayOfStrings(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'string').includes(true);
}

export function isArrayOfNumbers(value: any): value is number[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'number').includes(true);
}

export function isEmptyList(navigation: INavigation): boolean {
    return (
        // Page based navigation
        (navigation.type === 'page' && navigation.total === 0)
        // Cursor based navigation
        || (navigation.type === 'cursor' && navigation.startCursor === null && navigation.endCursor === null)
    );
}
