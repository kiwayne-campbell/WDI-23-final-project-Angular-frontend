angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);


UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth', 'Festival'];
function UsersShowController(User, $state, $auth, Festival) {
  const usersShow = this;

  // const currentUserId = $auth.getPayload().id;
  // console.log('currentUserId:', currentUserId);
  // usersShow.Edit = false;

  // wait until data has been returned from db to run function.
  // User.get($state.params).$promise.then((data) => {
  //   console.log(data);
  //   usersShow.user = data;
  //   allowUserToEdit();
  // });

  //prevent logged in user editing other users
  // function allowUserToEdit() {
    // console.log('user to edit:', usersShow.user.id);
    // console.log('currentUser:', currentUserId);
  //   if (usersShow.user.id === currentUserId) {
  //     usersShow.Edit = true;
  //     console.log('usersShow.user.id:',usersShow.user.id);
  //   }
  // }
  //
  // usersShow.allowUserToEdit = allowUserToEdit;

  function isCurrentUser() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

// get payload gives us current users id - user ID is IN TOKEN (BACKEND)
  usersShow.isCurrentUser = isCurrentUser;
  console.log(isCurrentUser);

  usersShow.user = User.get($state.params);


  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  usersShow.delete = deleteUser;

}


UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  this.update = update;

}
