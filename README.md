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

Import the pr-forms scss directly in your scss file:
```
@import praece-ng-forms;
```

Add the pr-forms include path to your sass config:
```
bower-components/praece-ng-form/dist
```

#Example
```html
<form>
  <div pr-input pr-validate="['required','phone']">
    <input type="text" ng-model="phone">
  </div>
</form>
```
