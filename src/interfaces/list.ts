// application
import { IFilter } from './filter';
import { IOrder } from './order';
import { IReview } from './review';

export interface IList<T> {
    /** Array of list items. */
    items: T[];
}

export interface ISortableList<T> extends IList<T> {
    /** Sorting algorithm. */
    sort: string;
}

export interface ICursorBasedNavigation {
    type: 'cursor';

    startCursor: string | null;

    endCursor: string | null;

    hasPreviousPage: boolean;

    hasNextPage: boolean;

    /** Items per page. */
    limit: number;

    /** Total items in list. Not a items.length. */
    total?: number;
}

export interface IPageBasedNavigation {
    type: 'page';

    /** Current page. */
    page: number;

    /** Items per page. */
    limit: number;

    /** Total items in list. Not a items.length. */
    total: number;

    /** Total number of pages. */
    pages: number;

    /** Common number of the first item on the current page. */
    from: number;

    /** Common number of the last item on the current page. */
    to: number;
}

export type INavigation = ICursorBasedNavigation | IPageBasedNavigation;

export interface INavigableList<T> extends IList<T> {
    navigation: INavigation;
}

export interface IFilterableList<T> extends IList<T> {
    filters: IFilter[];
}

export interface IListOptions {
    sort?: string;
    limit?: number;
    // Page based navigation
    page?: number;
    // Cursor based navigation
    before?: string;
    after?: string;
}

export interface IFilterValues {
    [filterSlug: string]: string;
}

export type IOrdersList = ISortableList<IOrder> & INavigableList<IOrder>;

export type IReviewsList = ISortableList<IReview> & INavigableList<IReview>;
