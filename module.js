'use strict';

angular.module('pr.forms', ['ui.select2']);

angular.module('pr.forms').run(['uiSelect2Config', function(uiSelect2Config) {
    uiSelect2Config.minimumResultsForSearch = 5;
}]);