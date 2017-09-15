
export function getBaseLocation() {
  let paths: string[] = location.pathname.split('/').splice(1, 1);
  let basePath: string = (paths && paths[0]) || 'c2s-ui'; // Default: c2s-ui
  return '/' + basePath + '/';
}
