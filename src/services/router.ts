/* eslint-disable import/prefer-default-export */

// third-party
import { UrlObject } from 'url';
// application
import { IAppLinkHref, normalizeLinkHref } from '~/components/shared/AppLink';

type PushArgs = [url: UrlObject, as?: UrlObject, options?: {}];

export function hrefToRouterArgs(linkHref: IAppLinkHref): PushArgs {
    const { href, as, shallow } = normalizeLinkHref(linkHref);

    return [href, as, { shallow }];
}
