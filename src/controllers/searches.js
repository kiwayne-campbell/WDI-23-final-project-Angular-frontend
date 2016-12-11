angular.module('finalProject')
  .controller('SearchesIndexController', SearchesIndexController)
  .controller('SearchesShowController', SearchesShowController);


SearchesIndexController.$inject = ['Search'];
function SearchesIndexController(Search) {
  const searchesIndex = this;

  searchesIndex.all = Search.query();
}

SearchesShowController.$inject = ['Search', '$state'];
function SearchesShowController(Search, $state) {
  const searchesShow = this;

  searchesShow.search = Search.get($state.params);

}
