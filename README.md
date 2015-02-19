# Installation
Run `bower install --save git@github.com:praece/ng-forms.git#master`<br>
Add `pr.forms` as a dependency to your app

Add pickadate, ui-select, and select2 .css files to your index.html file:
```
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.css" />
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.date.css" />
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.time.css" />
<link rel="stylesheet" href="../bower_components/angular-ui-select/dist/select.css" />
<link rel="stylesheet" href="../bower_components/select2/select2.css" />
```

Include all javascript files:
```
<script src="../bower_components/jquery/dist/jquery.js"></script>
<script src="../bower_components/angular/angular.js"></script>
<script src="../bower_components/angular-ui-select/dist/select.js"></script>
<script src="../bower_components/pickadate/lib/picker.js"></script>
<script src="../bower_components/pickadate/lib/picker.date.js"></script>
<script src="../bower_components/pickadate/lib/picker.time.js"></script>
<script src="../bower_components/moment/moment.js"></script>
<script src="../bower_components/angular-messages/angular-messages.js"></script>
<script src="../bower_components/lodash/lodash.js"></script>
<script src="../bower_components/praece-ng-forms/dist/praece-ng-forms.js"></script>
```

Import the pr-forms and bootstrap scss directly in your scss file:
```
@import 'bootstrap';
@import 'praece-ng-forms';
```

Add the pr-forms and bootstrap paths to the include path of your sass config:
```
'bower_components/praece-ng-forms/dist'
'bower_components/bootstrap-sass/assets/stylesheets'
```

#Example
```html
<form>
  <div pr-input pr-validate="['required','phone']">
    <input type="text" ng-model="phone">
  </div>
</form>
```
