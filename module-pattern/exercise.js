/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
'use strict';

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
var UrlParser = (function () {
  
  const protocol = (url) =>{
    return url.split(":")[0]
  }
  const domain = (url) =>{
    return url.split("/")[2]
  }
  const path = (url) =>{
    return url.split("/")[3].split("?")[0]
  }
  const querystring = (url) =>{
    return url.split("/")[3].split("?")[1]
  }

  return {
    // a function that takes a URL and returns its protocol
    protocol: protocol,

    // a function that takes a URL and returns its domain
    domain: domain,

    // a function that takes a URL and returns its path
    path: path,

    // a function that takes a URL and returns its query string
    querystring: querystring,
  };
})();

  console.log(UrlParser.protocol("https://www.example.com/hello?foo=1&bar=2"))
/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */
var createUrlBuilder = function (host) {
  var builder = function (obj) {
    let path = (val) => `/${val}`;

    let querystr = function (obj) {
      let keys = Object.keys(obj)
      return `?${keys[0]}=${obj[keys[0]]}&${keys[1]}=${obj[keys[1]]}`
    }
      builder.path = () => host + path(obj.path)
      builder.querystr = () => host + path(obj.querystr)

    return `${host}${path(obj.path)}${querystr(obj.querystr)}`
  }

  return builder;
}

module.exports = {
  UrlParser,
  createUrlBuilder,
};
