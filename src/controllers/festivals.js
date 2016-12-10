angular.module('finalProject')
  .controller('FestivalsIndexController', FestivalsIndexController)
  .controller('FestivalsShowController', FestivalsShowController)
  .controller('FestivalsEditController', FestivalsEditController);


FestivalsIndexController.$inject = ['Festival'];
function FestivalsIndexController(Festival) {
  const festivalsIndex = this;

  festivalsIndex.all = Festival.query();
}

FestivalsShowController.$inject = ['Festival', '$state'];
function FestivalsShowController(Festival, $state) {
  const festivalsShow = this;

  festivalsShow.festival = Festival.get($state.params);

  function deleteFestival() {
    festivalsShow.festival.$remove(() => {
      $state.go('festivalsIndex');
    });
  }

  // let id = $state.params.id;
  // const FestivalsId = Festival._id;
  //
  // if (id === '') {
  //   id = FestivalsId;
  // }
  //
  // function isOwnProfile() {
  //   console.log('is Festival?', isOwnProfile());
  //   return FestivalsId === id ? true : false;
  // }
  //
  // FestivalsShow.isOwnProfile = isOwnProfile;
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
