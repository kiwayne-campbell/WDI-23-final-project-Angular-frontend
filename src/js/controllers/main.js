angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  // $window.localStorage.setItem(currentUserId);

  main.isLoggedIn = $auth.isAuthenticated;
  main.userId = $auth.getPayload().id;

  function logout() {
    $auth.logout()
      .then(() => {
        localStorage.removeItem('currentUserId');
        $state.go('home');

      });
  }

  main.logout = logout;

  main.message = null;
  const protectedStates = ['usersEdit', 'usersNew', 'usersShow'];

  function secureState(e, toState) {
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);
}
