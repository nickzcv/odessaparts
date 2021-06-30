// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import AppImage from '~/components/shared/AppImage';
import Navigation, { INavigationEvent } from '~/components/shared/Navigation';
import Rating from '~/components/shared/Rating';
import { IReviewsList } from '~/interfaces/list';
import { isEmptyList } from '~/services/utils';

interface Props {
    list: IReviewsList;
    page?: number;
    onNavigate?: (event: INavigationEvent) => void;
}

function ReviewsList(props: Props) {
    const { list, page, onNavigate } = props;

    return (
        <div className="reviews-list">
            {isEmptyList(list.navigation) && (
                <FormattedMessage id="TEXT_REVIEWS_LIST_EMPTY" />
            )}
            {!isEmptyList(list.navigation) && (
                <React.Fragment>
                    <ol className="reviews-list__content">
                        {list.items.map((review, index) => (
                            <li key={index} className="reviews-list__item">
                                <div className="review">
                                    <div className="review__body">
                                        <div className="review__avatar">
                                            <AppImage src={review.avatar} />
                                        </div>
                                        <div className="review__meta">
                                            <div className="review__author">{review.author}</div>
                                            <div className="review__date">
                                                <FormattedMessage
                                                    id="FORMAT_DATE_MEDIUM"
                                                    values={{ date: Date.parse(review.date) }}
                                                />
                                            </div>
                                        </div>
                                        <div className="review__rating">
                                            <Rating value={review.rating} />
                                        </div>
                                        <div className="review__content typography">
                                            {review.content}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="reviews-list__pagination">
                        <Navigation data={list.navigation} page={page} onNavigate={onNavigate} />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default ReviewsList;
