import Router from "vue-router";
const conf = require("./nuxt.config").default.buildModules;

let subdomains; // get the domains from the nuxt.config.js
let domainPath;
conf.forEach((config) => {
  if (config[0] == "k-domains") {
    subdomains = [
      ...config[1].subDomains.map((data) => data.domain),
      config[1].rootDomain.domain,
    ]; //   add the subdomains and rootDomain in the array
    domainPath = [
      ...config[1].subDomains.map((data) => data.path),
      config[1].rootDomain.path,
    ];
    return;
  }
});

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions || createDefaultRouter(ssrContext).options;
  let routesDirectory = null;
  const defaultDomain = subdomains[subdomains.length - 1];
  function getRoutesDirectory(host) {
    const matcher = host.match(
      /^(\w+(-\w+)?)\.(localhost|\w+(-\w+)?)(\.\w+)?/
    ) || [defaultDomain];
    const routesDirectory = matcher[1] || matcher[0];
    // if the subdomain is not in the list of user provided domains, set the rootdirectory to root - domain given by the user
    const findDomainPath =
      subdomains.find((data) => data === routesDirectory) || defaultDomain;
    const getPath =
      domainPath[subdomains.findIndex((data) => data === findDomainPath)];
    return getPath;
  }

  if (process.server && ssrContext && ssrContext.nuxt && ssrContext.req) {
    const req = ssrContext.req;
    routesDirectory = getRoutesDirectory(req.headers.host);
    ssrContext.nuxt.routesDirectory = routesDirectory;
  }
  if (process.client) {
    // Get what we saved on SSR
    if (window.__NUXT__ && window.__NUXT__.routesDirectory) {
      routesDirectory = window.__NUXT__.routesDirectory;
    }
    if (!routesDirectory) {
      routesDirectory = getRoutesDirectory(window.location.host);
    }
  }

  function isUnderDirectory(route, directory) {
    let isUnderDir = false;
    const path = route.path;
    if (typeof directory == "object") {
      directory.map((dir) => {
        if (path === "/" + dir || path.startsWith("/" + dir + "/")) {
          isUnderDir = true;
        }
      });
      return isUnderDir;
    } else {
      return path === "/" + directory || path.startsWith("/" + directory + "/");
    }
  }

  let newRoutes = options.routes;
  if (routesDirectory) {
    newRoutes = options.routes
      .filter((route) => {
        // remove routes from other directories
        const toRemove = subdomains.filter((domain) => {
          return domain != routesDirectory;
        });
        return !isUnderDirectory(route, toRemove);
      })
      .map((route) => {
        // remove directory from path and route-name
        if (isUnderDirectory(route, routesDirectory)) {
          return {
            ...route,
            path: route.path.substr(routesDirectory.length + 1) || "/",
            name: route.name.substr(routesDirectory.length + 1) || "index",
          };
        } else if (isUnderDirectory(route, "shared")) {
          return {
            ...route,
            path: route.path.substr("shared".length + 1) || "/",
            name: route.name.substr("shared".length + 1) || "index",
          };
        }
        return route;
      });
  }

  return new Router({
    ...options,
    routes: newRoutes,
  });
}
