// react
import React from 'react';
// application
import getShopPageData from '~/store/shop/shopHelpers';
import ShopPageShop from '~/components/shop/ShopPageShop';
import { wrapper } from '~/store/store';

/**
 * To use cursor-based navigation, the ShopApi.getProductsList (src/api/base/shop.api.ts) method must return:
 * {
 *     items: [
 *         // ...
 *     ],
 *     sort: 'default',
 *     navigation: {
 *         type: 'cursor',
 *         // ... other cursor-based navigation properties.
 *     },
 *     filters: [
 *         // ...
 *     ],
 * }
 */

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  await getShopPageData(context, 'interior-parts');
});

function Page() {
  return (
    <ShopPageShop
      layout="grid"
      gridLayout="grid-4-sidebar"
      sidebarPosition="start"
    />
  );
}

export default Page;
