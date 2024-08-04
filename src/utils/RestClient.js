export class ServerError extends Error {
  constructor(response, ...params) {
    super(...params);

    this.name = 'ServerError';
    this.response = {};

    return this;
  }
}

/**
 *
 * @param {*} url
 * @param {*} options
 * @param {*} ignoreAuth
 * @param {*} returnHttpResponseInfo - return an object instead of only the data. {httpStatus:200, data:{//http response data},headers:{//http response headers}}}
 * @returns
 */
export async function request(
  url,
  options = {},
  ignoreAuth = false,
  returnHttpResponseInfo = false
) {
  const config = {
    method: 'GET',
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push('url');
  }

  if (
    !config.payload &&
    config.method !== 'GET' &&
    config.method !== 'DELETE' &&
    config.method !== 'POST'
  ) {
    errors.push('payload');
  }

  if (errors.length) {
    const errorMsg = `Error! You must pass \`${errors.join('`, `')}\``;
    throw new Error(errorMsg);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'accept-encoding': 'gzip',
  };

  const params = {
    headers,
    method: config.method,
  };

  if (params.method !== 'GET' && config.payload) {
    params.body = JSON.stringify(config.payload);
  }

  return fetch(url, params)
    .then(async (response) => {
      if (response.status > 299) {
        const error = new ServerError(response.statusText);
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          error.response = {
            status: response.status,
            data: await response.json(),
          };
        } else {
          error.response = {
            status: response.status,
            data: await response.text(),
          };
        }

        throw error;
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json().then((data) => {
            return returnHttpResponseInfo
              ? {
                  data,
                  httpStatus: response.status,
                  headers: response.headers,
                }
              : data;
          });
        }
        return response.blob().then((data) => {
          return returnHttpResponseInfo
            ? {
                data,
                httpStatus: response.status,
                headers: response.headers,
              }
            : data;
        });
      }
    })
    .catch((err) => {
      if (err instanceof ServerError) {
        throw err;
      } else {
        const error = new ServerError(err.message);
        error.response = {
          status: 500,
          data: 'ERROR',
        };
        throw error;
      }
    });
}
