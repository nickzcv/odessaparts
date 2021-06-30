// react
import { useEffect } from 'react';
// third-party
import { useRouter } from 'next/router';
// application
import { hrefToRouterArgs } from '~/services/router';
import { IAppLinkHref } from '~/components/shared/AppLink';

interface Props {
    href: IAppLinkHref;
}

function Redirect(props: Props) {
    const { href } = props;
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            router.push(...hrefToRouterArgs(href)).then();
        }
    }, []);

    return null;
}

export default Redirect;
