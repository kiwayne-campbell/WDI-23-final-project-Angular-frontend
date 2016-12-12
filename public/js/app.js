"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function o(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={},r.submit=o}function LoginController(e,t){function o(){e.login(r.credentials).then(function(){var o=e.getPayload().id;console.log(o),localStorage.setItem("currentUserId",o),t.go("usersIndex")})}var r=this;r.credentials={},r.submit=o}function Comment(e,t){return new e(t+"/comments/:id",{id:"@id"},{update:{method:"PUT"}})}function CommentsIndexController(e){var t=this;t.all=e.query()}function CommentsShowController(e,t){function o(){r.comment.$remove(function(){t.go("commentsIndex")})}var r=this;r.comment=e.get(t.params),r.delete=o}function CommentsEditController(e,t){function o(){r.comment.$update(function(){t.go("commentsShow",t.params)})}var r=this;r.comment=Comment.get(t.params),this.update=o}function Festival(e,t){return new e(t+"/festivals/:id",{id:"@id"},{update:{method:"PUT"},favorite:{method:"POST",url:t+"/festivals/:id/favorite"}})}function FestivalsIndexController(e,t){var o=this;o.all=e.query({q:t.params.q})}function FestivalsShowController(e,t,o){function r(){o.save(s.comment,function(){t.reload()})}function l(){s.festival.$favorite(function(){t.go("festivalsIndex")})}function n(){s.festival.$remove(function(){t.go("festivalsIndex")})}var s=this;s.festival=e.get(t.params),s.comment={festival_id:t.params.id},s.add=r,s.favorite=l,s.delete=n}function FestivalsEditController(e,t){function o(){r.festival.$update(function(){t.go("festivalsShow",t.params)})}var r=this;r.festival=e.get(t.params),this.update=o}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here</div>',scope:{center:"="},link:function(t,o){console.log(e.google),console.log(o),new e.google.maps.Map(o[0],{center:t.center,zoom:14})}}}function MainController(e,t,o){function r(){e.logout().then(function(){localStorage.removeItem("currentUserId"),t.go("home")})}function l(o,r){n.message=null,!e.isAuthenticated()&&s.includes(r.name)&&(o.preventDefault(),t.go("login"),n.message="You must be logged in to go there!")}var n=this;n.isLoggedIn=e.isAuthenticated,n.userId=e.getPayload().id,n.logout=r,n.message=null;var s=["usersEdit","usersNew","usersShow"];o.$on("$stateChangeStart",l)}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("festivalsIndex",{url:"/festivals?q",templateUrl:"/templates/festivalsIndex.html",controller:"FestivalsIndexController as festivalsIndex"}).state("festivalsShow",{url:"/festivals/:id",templateUrl:"/templates/festivalsShow.html",controller:"FestivalsShowController as festivalsShow"}).state("festivalsEdit",{url:"/festivals/:id/edit",templateUrl:"/templates/festivalsEdit.html",controller:"FestivalsEditController as festivalsEdit"}).state("commentsIndex",{url:"/comments",templateUrl:"/templates/commentsIndex.html",controller:"CommentsIndexController as commentsIndex"}).state("commentsNew",{url:"/comments/new",templateUrl:"/templates/commentsNew.html",controller:"CommentsNewController as commentsNew"}).state("commentsShow",{url:"/comments/:id",templateUrl:"/templates/commentsShow.html",controller:"CommentsShowController as commentsShow"}).state("commentsEdit",{url:"/comments/:id/edit",templateUrl:"/templates/commentsEdit.html",controller:"CommentsEditController as commentsEdit"}).state("home",{url:"/home",templateUrl:"/templates/home.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),t.otherwise("/home")}function SearchesIndexController(e){var t=this;t.all=e.query()}function SearchesShowController(e,t){var o=this;o.search=e.get(t.params)}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,o,r){function l(){return o.getPayload().id===parseFloat(t.params.id)}function n(){s.user.$remove(function(){t.go("usersIndex")})}var s=this;s.isCurrentUser=l,console.log(l),s.user=e.get(t.params),s.delete=n}function UsersEditController(e,t){function o(){r.user.$update(function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),this.update=o}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Comment",Comment),Comment.$inject=["$resource","API_URL"],angular.module("finalProject").controller("CommentsIndexController",CommentsIndexController).controller("CommentsShowController",CommentsShowController).controller("CommentsEditController",CommentsEditController),CommentsIndexController.$inject=["Comment"],CommentsShowController.$inject=["Comment","$state"],CommentsEditController.$inject=["Comments","$state"],angular.module("finalProject").factory("Festival",Festival),Festival.$inject=["$resource","API_URL"],angular.module("finalProject").controller("FestivalsIndexController",FestivalsIndexController).controller("FestivalsShowController",FestivalsShowController).controller("FestivalsEditController",FestivalsEditController),FestivalsIndexController.$inject=["Festival","$state"],FestivalsShowController.$inject=["Festival","$state","Comment"],FestivalsEditController.$inject=["Festival","$state"],angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window","Festival"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("SearchesIndexController",SearchesIndexController).controller("SearchesShowController",SearchesShowController),SearchesIndexController.$inject=["Search"],SearchesShowController.$inject=["Search","$state"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth","Festival"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
