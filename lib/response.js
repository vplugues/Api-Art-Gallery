'use strict';

// JSON API Response Structure (http://jsonapi.org/format/)
// Refer to README for more information on how to build the response object.

const response = {
  // A successful response
  getSuccessMessage(data = {}, links = {}) {
    return { links, data };
  },

  // An unsuccessful repsonse
  getErrorMessage(errors = {}) {
    return { errors };
  },

  // invalid response
  invalidated(request, reply, source, error = { output: { statusCode: 'UNKNOWN' } }) {
    const errorObject = {
      status: `${error.output.statusCode}`,
      title: 'Joi Validation Error',
      detail: {
        message: error.message || 'No Error Message',
      },
      links: {
        about: 'https://github.com/hapijs/joi/blob/v10.2.2/API.md#errors',
      },
    };
    return reply(response.getErrorMessage(errorObject));
  },
};
module.exports = response;
