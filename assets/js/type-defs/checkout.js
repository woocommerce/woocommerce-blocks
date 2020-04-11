/**
 * @typedef {Object} CheckoutDispatchActions
 *
 * @property {function()}               resetCheckout        Dispatches an action that resets
 *                                                           the checkout to a pristine state.
 * @property {function(string)}         setRedirectUrl       Dispatches an action that sets the
 *                                                           redirectUrl to the given value.
 * @property {function(boolean=)}       setHasError          Dispatches an action that sets the
 *                                                           checkout status to having an error.
 * @property {function(Object)}         setAfterProcessing   Dispatches an action that sets the
 *                                                           checkout status to after processing and
 *                                                           also sets the response data accordingly.
 * @property {function()}               incrementCalculating Dispatches an action that increments
 *                                                           the calculating state for checkout by one.
 * @property {function()}               decrementCalculating Dispatches an action that decrements
 *                                                           the calculating state for checkout by one.
 * @property {function(number|string)}  setOrderId           Dispatches an action that stores the draft
 *                                                           order ID and key to state.
 */

/**
 * @typedef {Object} CheckoutStatusConstants
 *
 * @property {string} PRISTINE                   Checkout is in it's initialized state.
 * @property {string} IDLE                       When checkout state has changed but there is no
 *                                               activity happening.
 * @property {string} PROCESSING                 This is the state when the checkout button has been
 *                                               pressed and the checkout data has been sent to the
 *                                               server for processing.
 * @property {string} BEFORE_PROCESSING          This is the state when the checkout processing has
 *                                               been completed.
 * @property {string} COMPLETE                   This is the status when the server has completed
 *                                               processing the data successfully.
 * @property {string} BEFORE_REDIRECT_ON_SUCCESS This is the status when the server has returned a
 *                                               response and before any redirect happens.
 */

export {};
