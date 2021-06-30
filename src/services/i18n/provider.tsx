// react
import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
} from 'react';
// third-party
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
// application
import GlobalIntlProvider from '~/services/i18n/global-intl';
import { ILanguage } from '~/interfaces/language';
import { LanguageLocaleContext, LanguageSetLocaleContext } from '~/services/i18n/context';
import {
    getDefaultLanguage,
    getDefaultLocale,
    getLanguageByLocale,
    loadMessages,
} from '~/services/i18n/utils';

export interface ILanguageProviderProps {
    messages: Record<string, string>;
}

const cache: Record<string, Promise<Record<string, string>>> = {};

export async function getLanguageInitialProps(language: ILanguage | null): Promise<ILanguageProviderProps> {
    const locale = language ? language.locale : getDefaultLocale();

    if (process.browser) {
        if (!cache[locale]) {
            cache[locale] = loadMessages(locale);
        }

        return { messages: await cache[locale] };
    }

    return {
        messages: await loadMessages(locale),
    };
}

function LanguageProvider(props: PropsWithChildren<ILanguageProviderProps>) {
    const { children, messages } = props;
    const router = useRouter();
    const language = getLanguageByLocale(router.locale!) || getDefaultLanguage();
    const { locale } = language;

    // Puts the initial translation into the cache.
    useEffect(() => {
        if (!cache[locale]) {
            cache[locale] = Promise.resolve(messages);
        }
    }, [locale, messages]);

    const setLocale = useCallback((newLocale: string) => {
        setTimeout(() => {
            router.push(router.asPath, undefined, { locale: newLocale }).then();
        }, 0);
    }, [router]);

    useEffect(() => {
        document.documentElement.lang = language.locale;
        document.documentElement.dir = language.direction;
    }, [language]);

    return (
        <LanguageLocaleContext.Provider value={locale}>
            <LanguageSetLocaleContext.Provider value={setLocale}>
                <IntlProvider locale={locale} messages={messages}>
                    <GlobalIntlProvider>
                        {children}
                    </GlobalIntlProvider>
                </IntlProvider>
            </LanguageSetLocaleContext.Provider>
        </LanguageLocaleContext.Provider>
    );
}

export default LanguageProvider;
