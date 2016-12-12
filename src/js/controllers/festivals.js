angular.module('finalProject')
  .controller('FestivalsIndexController', FestivalsIndexController)
  .controller('FestivalsShowController', FestivalsShowController)
  .controller('FestivalsEditController', FestivalsEditController);


FestivalsIndexController.$inject = ['Festival', '$state'];
function FestivalsIndexController(Festival, $state) {
  const festivalsIndex = this;
  festivalsIndex.all = Festival.query({ q: $state.params.q });

  // festivalsIndex.all = Festival.query();
}

FestivalsShowController.$inject = ['Festival', '$state', 'Comment'];
function FestivalsShowController(Festival, $state, Comment) {
  const festivalsShow = this;

  festivalsShow.festival = Festival.get($state.params);

  festivalsShow.comment = {
    festival_id: $state.params.id
  };

  festivalsShow.festivals = {
    festival_id: $state.params.id
  };

  console.log(festivalsShow.festivals);

  function addComment() {
    Comment.save(festivalsShow.comment, () => {
      $state.reload();
    });
  }


  festivalsShow.add = addComment;


  function favorite() {
    festivalsShow.festival.$favorite(() => {
      $state.go('festivalsIndex');
    });
  }
  // add main-message- added to favourites!

  festivalsShow.favorite = favorite;


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
