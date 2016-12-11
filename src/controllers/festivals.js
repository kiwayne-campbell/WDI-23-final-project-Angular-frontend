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

  function addComment() {
    console.log('this works');
    festivalsShow.festival.comments.push(festivalsShow.commentToAdd);
    festivalsShow.titleToAdd = '';
    festivalsShow.dateToAdd = '';
    festivalsShow.bodyToAdd = '';
    festivalsShow.festival.$update((res) => {
      return res;
    });
  }

  festivalsShow.add = addComment;

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
