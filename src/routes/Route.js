// import React from 'react';
// import PropTypes from 'prop-types';
// import { Route, Redirect } from 'react-router-dom';

// import { store } from '../store';

// export default function RouteWrapper({
//   component: Component,
//   isPrivate,
//   ...rest
// }) {
//   console.log('state', store.getState());
//   const { signed, token } = store.getState().auth;
//   console.log('auth', signed, isPrivate, token);

//   if (signed && isPrivate) {
//     return <Redirect to="/home" />;
//   }

//   if (!signed && isPrivate) {
//     return <Redirect to="/" />;
//   }

//   return <Route {...rest} component={Component} />;
// }

// RouteWrapper.propTypes = {
//   isPrivate: PropTypes.bool,
//   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
//     .isRequired,
// };

// RouteWrapper.defaultProps = {
//   isPrivate: false,
// };