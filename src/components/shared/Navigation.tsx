// react
import React, { useCallback } from 'react';
// third-party
import classNames from 'classnames';
// application
import Pagination from '~/components/shared/Pagination';
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from '~/svg';
import { INavigation } from '~/interfaces/list';

export type INavigationEvent =
    {type: 'page'; page: number} |
    {type: 'before'; before: string} |
    {type: 'after'; after: string};

interface Props {
    data: INavigation;
    page?: number;
    onNavigate?: (event: INavigationEvent) => void;
}

function Navigation(props: Props) {
    const { data, page, onNavigate } = props;

    const onPageChange = useCallback((page: number) => {
        if (onNavigate) {
            onNavigate({ type: 'page', page });
        }
    }, []);

    const onBefore = () => {
        if (onNavigate && data.type === 'cursor' && data.startCursor) {
            onNavigate({ type: 'before', before: data.startCursor });
        }
    };

    const onAfter = () => {
        if (onNavigate && data.type === 'cursor' && data.endCursor) {
            onNavigate({ type: 'after', after: data.endCursor });
        }
    };

    if (data.type === 'page') {
        return (
            <Pagination
                current={page || data.page}
                total={data.pages}
                siblings={2}
                onPageChange={onPageChange}
            />
        );
    }

    if (data.type === 'cursor') {
        return (
            <ul className="pagination">
                <li className={classNames('page-item', { disabled: !data.hasPreviousPage })}>
                    <button
                        type="button"
                        className="page-link page-link--with-arrow"
                        aria-label="Previous"
                        onClick={onBefore}
                    >
                        <span className="page-link__arrow page-link__arrow--left" aria-hidden="true">
                            <ArrowRoundedLeft7x11Svg />
                        </span>
                    </button>
                </li>

                <li className={classNames('page-item', { disabled: !data.hasNextPage })}>
                    <button
                        type="button"
                        className="page-link page-link--with-arrow"
                        aria-label="Next"
                        onClick={onAfter}
                    >
                        <span className="page-link__arrow page-link__arrow--right" aria-hidden="true">
                            <ArrowRoundedRight7x11Svg />
                        </span>
                    </button>
                </li>
            </ul>
        );
    }

    throw new Error('Unsupported navigation type');
}

export default Navigation;
