angular.module('finalProject')
  .controller('FestivalsIndexController', FestivalsIndexController)
  .controller('FestivalsShowController', FestivalsShowController)
  .controller('FestivalsEditController', FestivalsEditController);


FestivalsIndexController.$inject = ['Festival'];
function FestivalsIndexController(Festival) {
  const festivalsIndex = this;

  festivalsIndex.all = Festival.query();
}

FestivalsShowController.$inject = ['Festival', '$state', 'Comment', 'User'];
function FestivalsShowController(Festival, $state, Comment, User) {
  const festivalsShow = this;

  festivalsShow.festival = Festival.get($state.params);

  festivalsShow.comment = {
    festival_id: $state.params.id
  };

  function addComment() {
    Comment.save(festivalsShow.comment, () => {
      $state.reload();
    });
  }

  festivalsShow.add = addComment;


  function addFestival() {
    festivalsShow.festival.UserFavouriteArray = [];

    User.save(festivalsShow.festival, () => {
      $state.reload();
    });
  }
  // add main-message- added to favourites!

  festivalsShow.addFestival = addFestival;


  function deleteFestival() {
    festivalsShow.festival.$remove(() => {
      $state.go('festivalsIndex');
    });
  }

  festivalsShow.delete = deleteFestival;
}


FestivalsEditController.$inject = ['Festival', '$state'];
function FestivalsEditController(Festival, $state) {
  const festivalsEdit = this;

  festivalsEdit.festival = Festival.get($state.params);

  function update() {
    festivalsEdit.festival.$update(() => {
      $state.go('festivalsShow', $state.params);
    });
  }

  this.update = update;

}
