import { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';


import { openModal } from 'mastodon/actions/modal';
import { registrationsOpen } from 'mastodon/initial_state';
import { useAppDispatch, useAppSelector } from 'mastodon/store';

const SignInBanner = () => {
  const dispatch = useAppDispatch();

  const openClosedRegistrationsModal = useCallback(
    () => dispatch(openModal({ modalType: 'CLOSED_REGISTRATIONS' })),
    [dispatch],
  );

  let signupButton;

  const signupUrl = useAppSelector((state) => state.getIn(['server', 'server', 'registrations', 'url'], null) || '/auth/auth/openid_connect');

  if (registrationsOpen) {
    signupButton = (
      <form action={signupUrl} method='post'>
        <input type='hidden' name='intent' value='signup' />
        <button className='button button--block'>
          <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
        </button>
      </form>
    );
  } else {
    signupButton = (
      <button className='button button--block' onClick={openClosedRegistrationsModal}>
        <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
      </button>
    );
  }

  return (
    <div className='sign-in-banner'>
      <p><FormattedMessage id='sign_in_banner.text' defaultMessage='Sign in to follow profiles or hashtags, favourite, share and reply to posts. You can also interact from your account on a different server.' /></p>
      {signupButton}
      <a href='/auth/auth/openid_connect' rel='nofollow' className='button button--block button-tertiary' data-method='post'><FormattedMessage id='sign_in_banner.sign_in' defaultMessage='Sign in' /></a>
    </div>
  );
};

export default SignInBanner;
