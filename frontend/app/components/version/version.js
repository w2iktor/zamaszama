'use strict';

angular.module('zamaszamaApp.version', [
  'zamaszamaApp.version.interpolate-filter',
  'zamaszamaApp.version.version-directive'
])

.value('version', '0.1');
