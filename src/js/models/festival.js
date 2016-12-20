angular.module('finalProject')
  .factory('Festival', Festival);

Festival.$inject = ['$resource', 'API_URL'];
function Festival($resource, API_URL) {
  return new $resource(`${API_URL}/festivals/:id`, { id: '@id' }, {
    update: { method: 'PUT' },
    favorite: { method: 'POST', url: `${API_URL}/festivals/:id/favorite` },
    unfavorite: { method: 'POST', url: `${API_URL}/festivals/:id/unfavorite` },
    featured: { method: 'GET', url: `${API_URL}/festivals/featured`, isArray: true }
  });
}
