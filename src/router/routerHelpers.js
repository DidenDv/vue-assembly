export function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages/${component}.vue`);
}

/**
 * @param path
 * @param componentName - Name of the file in 'pages' folder
 * @param additionalParams - See https://router.vuejs.org/api/#the-route-object
 * @returns Vue Route object
 */
export function makeRoute(path, componentName, additionalParams = {}) {
  return {
    path,
    name: componentName,
    component: load(componentName),
    ...additionalParams
  };
}
