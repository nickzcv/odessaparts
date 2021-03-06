// react
import React from 'react';
// application
import { AppDispatch } from '~/store/types';
import { optionsSetAll } from '~/store/options/optionsActions';
import { wrapper } from '~/store/store';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const dispatch = context.store.dispatch as AppDispatch;

  await dispatch(optionsSetAll({
    desktopHeaderVariant: 'spaceship/one',
    mobileHeaderVariant: 'two',
  }));
});

function Page() {
  return (
    <React.Fragment />
  );
}

export default Page;
