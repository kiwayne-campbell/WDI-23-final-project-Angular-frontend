angular.module('finalProject')
  .controller('CommentsIndexController', CommentsIndexController)
  .controller('CommentsShowController', CommentsShowController)
  .controller('CommentsEditController', CommentsEditController);


CommentsIndexController.$inject = ['Comment'];
function CommentsIndexController(Comment) {
  const commentsIndex = this;

  commentsIndex.all = Comment.query();
}

// CommentsNewController.$inject = ['Comment', '$state', '$auth'];
// function CommentsNewController(Comment, $state, $auth) {
//   const commentsNew = this;
//
//
//   function create() {
//     Comment.save($state.params, () => {
//       commentsNew.comment.userId = $auth.getPayload().id;
//       commentsNew.comment.festivalId = festivalsShow.festival.id;
//
//       $state.go('commentsShow', $state.params);
//     });
//   }
//
//   commentsNew.create = create;
// }


CommentsShowController.$inject = ['Comment', '$state'];
function CommentsShowController(Comment, $state) {
  const commentsShow = this;

  commentsShow.comment = Comment.get($state.params);

  function deleteComments() {
    commentsShow.comment.$remove(() => {
      $state.go('commentsIndex');
    });
  }

  commentsShow.delete = deleteComments;
}


CommentsEditController.$inject = ['Comments', '$state'];
function CommentsEditController(Comments, $state) {
  const commentsEdit = this;

  commentsEdit.comment = Comment.get($state.params);

  function update() {
    commentsEdit.comment.$update(() => {
      $state.go('commentsShow', $state.params);
    });
  }

  this.update = update;

}
