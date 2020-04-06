/**
 * @typedef {import('./billing').BillingData} BillingData
 * @typedef {import('./cart').CartShippingOption} CartShippingOption
 * @typedef {import('./cart').CartShippingAddress} CartShippingAddress
 * @typedef {import('./checkout').CheckoutDispatchActions} CheckoutDispatchActions
 */

/**
 * @typedef {Object} BillingDataContext
 *
 * @property {BillingData} billingData    The current billing data, including
 *                                        address and email.
 * @property {Function}    setBillingData A function for setting billing data.
 */

/**
 * @typedef {Object} ShippingDataContext
 *
 * @property {ShippingErrorStatus}  shippingErrorStatus   The current error
 *                                                        status for shipping
 *                                                        rates.
 * @property {Function}             dispatchErrorStatus   A function for
 *                                                        dispatching a shipping
 *                                                        rate error status.
 * @property {ShippingErrorTypes}   shippingErrorTypes    The error type
 *                                                        constants for the
 *                                                        shipping rate error
 *                                                        status.
 * @property {CartShippingOption[]} shippingRates         An array of available
 *                                                        shipping rates.
 * @property {Function}             setShippingRates      Used to set the
 *                                                        available shipping
 *                                                        rates.
 * @property {boolean}              shippingRatesLoading  Whether or not the
 *                                                        shipping rates are
 *                                                        being loaded.
 * @property {string[]}             selectedRates         The ids of the rates
 *                                                        that are selected.
 * @property {Function}             setSelectedRates      A function for setting
 *                                                        the selected rates.
 * @property {CartShippingAddress}  shippingAddress       The current set
 *                                                        address for shipping.
 * @property {function()}           setShippingAddress    A function for setting
 *                                                        the shipping address.
 * @property {function()}           onShippingRateSuccess Used to register a
 *                                                        callback to be invoked
 *                                                        when shipping rates
 *                                                        are retrieved
 *                                                        successfully.
 * @property {function()}           onShippingRateSelectSuccess Used to register
 *                                                        a callback to be
 *                                                        invoked when shipping
 *                                                        rate is selected
 *                                                        successfully.
 * @property {function()}           onShippingRateSelectFail Used to register a
 *                                                        callback to be invoked
 *                                                        when shipping rate is
 *                                                        selected unsuccessfully
 * @property {function()}           onShippingRateFail    Used to register a
 *                                                        callback to be invoked
 *                                                        when there is an
 *                                                        error with retrieving
 *                                                        shipping rates.
 * @property {boolean}              needsShipping         True if the cart has
 *                                                        items requiring
 *                                                        shipping.
 */

/**
 * @typedef {Object} ShippingErrorStatus
 *
 * @property {boolean} isPristine        Whether the status is pristine.
 * @property {boolean} isValid           Whether the status is valid.
 * @property {boolean} hasInvalidAddress Whether the address is invalid.
 * @property {boolean} hasError          Whether an error has happened.
 */

/**
 * @typedef {Object} ShippingErrorTypes
 *
 * @property {string} NONE            No shipping error.
 * @property {string} INVALID_ADDRESS Error due to an invalid address for
 *                                    calculating shipping.
 * @property {string} UNKNOWN         When an unknown error has occurred in
 *                                    calculating/retrieving shipping rates.
 */

/**
 * @typedef {Object} PaymentMethodCurrentStatus
 *
 * This contains status information for the current active payment method in
 * the checkout.
 *
 * @property {boolean} isPristine   If true then the payment method state in
 *                                  checkout is pristine.
 * @property {boolean} isStarted    If true then the payment method has been
 *                                  initialized and has started.
 * @property {boolean} isProcessing If true then the payment method is
 *                                  processing payment.
 * @property {boolean} isFinished   If true then the payment method is in a
 *                                  finished state (which may mean it's status
 *                                  is either error, failed, or success)
 * @property {boolean} hasError     If true then the payment method is in an
 *                                  error state.
 * @property {boolean} hasFailed    If true then the payment method has failed
 *                                  (usually indicates a problem with the
 *                                  payment method used, not logic error)
 * @property {boolean} isSuccessful If true then the payment method has
 *                                  completed it's processing successfully.
 */

/**
 * A saved customer payment method object (if exists)
 *
 * @typedef {Object} CustomerPaymentMethod
 *
 * @property {Object}  method     The payment method object (varies on what it
 *                                might contain)
 * @property {string}  expires    Short form of expiry for payment method.
 * @property {boolean} is_default Whether it is the default payment method of
 *                                the customer or not.
 * @property {number}  tokenId    The id of the saved payment method.
 * @property {Object}  actions    Varies, actions that can be done to interact
 *                                with the payment method.
 */

/**
 * A Saved Customer Payment methods object
 *
 * This is an object where the keys are payment gateway slugs and the values
 * Are an array of CustomerPaymentMethod objects.
 *
 * @typedef {Object} SavedCustomerPaymentMethods
 */

/**
 * @typedef {Object} PaymentStatusDispatchers
 *
 * @property {function()}               started
 * @property {function()}               processing
 * @property {function()}               completed
 * @property {function(string)}         error
 * @property {function(string, Object, Object=)} failed
 * @property {function(Object=,Object=)}  success
 */

/**
 * @typedef {function():PaymentStatusDispatchers} PaymentStatusDispatch
 */

/**
 * @typedef {Object} PaymentMethodDataContext
 *
 * @property {PaymentStatusDispatch}       setPaymentStatus                 Sets the payment status
 *                                                                          for the payment method.
 * @property {PaymentMethodCurrentStatus}  currentStatus                    The current payment
 *                                                                          status.
 * @property {Object}                      paymentStatuses                  An object of payment
 *                                                                          status constants.
 * @property {Object}                      paymentMethodData                Arbitrary data to be
 *                                                                          passed along for
 *                                                                          processing by the
 *                                                                          payment method on the
 *                                                                          server.
 * @property {string}                      errorMessage                     An error message
 *                                                                          provided by the payment
 *                                                                          method if there is an
 *                                                                          error.
 * @property {string}                      activePaymentMethod              The active payment
 *                                                                          method slug.
 * @property {function()}                  setActivePaymentMethod           A function for setting
 *                                                                          the active payment
 *                                                                          method.
 * @property {SavedCustomerPaymentMethods} customerPaymentMethods           Returns the customer
 *                                                                          payment for the customer
 *                                                                          if it exists.
 * @property {Object}                      paymentMethods                   Registered payment
 *                                                                          methods.
 * @property {Object}                      expressPaymentMethods            Registered express
 *                                                                          payment methods.
 * @property {boolean}                     paymentMethodsInitialized        True when all registered
 *                                                                          payment methods have
 *                                                                          been initialized.
 * @property {boolean}                     expressPaymentMethodsInitialized True when all registered
 *                                                                          express payment methods
 *                                                                          have been initialized.
 * @property {function(function())}        onPaymentProcessing              Event registration
 *                                                                          callback for registering
 *                                                                          observers for the
 *                                                                          payment processing
 *                                                                          event.
 * @property {function(function())}        onPaymentSuccess                 Event registration
 *                                                                          callback for registering
 *                                                                          observers for the
 *                                                                          successful payment
 *                                                                          event.
 * @property {function(function())}        onPaymentFail                    Event registration
 *                                                                          callback for registering
 *                                                                          observers for the
 *                                                                          failed payment event.
 * @property {function(function())}        onPaymentError                   Event registration
 *                                                                          callback for registering
 *                                                                          observers for the
 *                                                                          payment error event.
 * @property {function(string)}            setExpressPaymentError           A function used by
 *                                                                          express payment methods
 *                                                                          to indicate an error
 *                                                                          for checkout to handle.
 *                                                                          It receives an error
 *                                                                          message string. Does not
 *                                                                          change payment status.
 */

/**
 * @typedef {Object} CheckoutDataContext
 *
 * @property {string}                       submitLabel               The label to use for the
 *                                                                    submit checkout button.
 * @property {function()}                   onSubmit                  The callback to register with
 *                                                                    the checkout submit button.
 * @property {boolean}                      isComplete                True when checkout is complete
 *                                                                    and ready for redirect.
 * @property {boolean}                      isProcessingComplete      True when checkout processing
 *                                                                    is complete.
 * @property {boolean}                      isIdle                    True when the checkout state
 *                                                                    has changed and checkout has
 *                                                                    no activity.
 * @property {boolean}                      isProcessing              True when checkout has been
 *                                                                    submitted and is being
 *                                                                    processed by the server.
 * @property {boolean}                      isCalculating             True when something in the
 *                                                                    checkout is resulting in
 *                                                                    totals being calculated.
 * @property {boolean}                      hasError                  True when the checkout is in
 *                                                                    an error state. Whatever
 *                                                                    caused the error
 *                                                                    (validation/payment method)
 *                                                                    will likely have triggered a
 *                                                                    notice.
 * @property {string}                       redirectUrl               This is the url that checkout
 *                                                                    will redirect to when it's
 *                                                                    ready.
 * @property {function(function(),number=)} onCheckoutCompleteSuccess Used to register a callback
 *                                                                    that will fire when the
 *                                                                    checkout is marked complete
 *                                                                    successfully.
 * @property {function(function(),number=)} onCheckoutCompleteError   Used to register a callback
 *                                                                    that will fire when the
 *                                                                    checkout is marked complete
 *                                                                    and has an error.
 * @property {function(function(),number=)} onCheckoutProcessing      Used to register a callback
 *                                                                    that will fire when the
 *                                                                    checkout has been submitted
 *                                                                    before being sent off to the
 *                                                                    server.
 * @property {CheckoutDispatchActions}      dispatchActions           Various actions that can be
 *                                                                    dispatched for the checkout
 *                                                                    context data.
 * @property {number}                       orderId                   This is the ID for the draft
 *                                                                    order if one exists.
 * @property {boolean}                      hasOrder                  True when the checkout has a
 *                                                                    draft order from the API.
 * @property {boolean}                      isCart                    When true, means the provider
 *                                                                    is providing data for the cart.
 */

/**
 * @typedef {Object} EditorDataContext
 *
 * @property {boolean}                 isEditor           Indicates whether in
 *                                                        the editor context
 *                                                        (true) or not (false).
 * @property {number}                  currentPostId      The post ID being edited.
 */

/**
 * @typedef {Object} ValidationContext
 *
 * @property {function(string):Object}  getValidationError       Return validation error for the
 *                                                               given property.
 * @property {function(Object)}         setValidationErrors      Receive an object of properties and
 *                                                               error messages as strings and adds
 *                                                               to the validation error state.
 * @property {function(string)}         clearValidationError     Clears a validation error for the
 *                                                               given property name.
 * @property {function()}               clearAllValidationErrors Clears all validation errors
 *                                                               currently in state.
 * @property {function(string)}         getValidationErrorId     Returns the css id for the
 *                                                               validation error using the given
 *                                                               inputId string.
 * @property {function(string)}         hideValidationError      Sets the hidden prop of a specific
 *                                                               error to true.
 * @property {function(string)}         showValidationError      Sets the hidden prop of a specific
 *                                                               error to false.
 * @property {function()}               showAllValidationErrors  Sets the hidden prop of all
 *                                                               errors to false.
 * @property {boolean}                  hasValidationErrors      True if there is at least one error.
 */

export {};
