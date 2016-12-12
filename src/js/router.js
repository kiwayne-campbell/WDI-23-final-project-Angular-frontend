angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('festivalsIndex', {
      url: '/festivals',
      templateUrl: '/templates/festivalsIndex.html',
      controller: 'FestivalsIndexController as festivalsIndex'
    })
    .state('festivalsShow', {
      url: '/festivals/:id',
      templateUrl: '/templates/festivalsShow.html',
      controller: 'FestivalsShowController as festivalsShow'
    })
    .state('festivalsEdit', {
      url: '/festivals/:id/edit',
      templateUrl: '/templates/festivalsEdit.html',
      controller: 'FestivalsEditController as festivalsEdit'
    })
    .state('commentsIndex', {
      url: '/comments',
      templateUrl: '/templates/commentsIndex.html',
      controller: 'CommentsIndexController as commentsIndex'
    })
    .state('commentsNew', {
      url: '/comments/new',
      templateUrl: '/templates/commentsNew.html',
      controller: 'CommentsNewController as commentsNew'
    })
    .state('commentsShow', {
      url: '/comments/:id',
      templateUrl: '/templates/commentsShow.html',
      controller: 'CommentsShowController as commentsShow'
    })
    .state('commentsEdit', {
      url: '/comments/:id/edit',
      templateUrl: '/templates/commentsEdit.html',
      controller: 'CommentsEditController as commentsEdit'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'LoginController as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });


  $urlRouterProvider.otherwise('/home');
}
