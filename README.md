# Installation
Add `pr.forms` as a dependency to your app. Add all js and sass files to your index.html file.

# Requirements
The validation directive requires the angular-messages module. Install using:
```
bower install --save angular-messages
```

The datepicker directive requires the pickadate library and momentjs. Please install both. For pickadate use the classic theme.
```
bower install --save pickadate
bower install --save momentjs
```
Add pickadate and ui-select .css files to your index.html file:
```
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.css" />
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.date.css" />
<link rel="stylesheet" href="../bower_components/pickadate/lib/themes/classic.time.css" />
<link rel="stylesheet" href="../bower_components/angular-ui-select/dist/select.css" />
```

The select theming applies to ui-select elements, if you want to use select2 through ui-select, download the ui-select library.
```
bower install --save angular-ui-select
```

#Example
```html
<form>
  <div pr-input>
    <input ng-model="name" name="Name" pr-validate-required placeholder="Name">
  </div>
</form>
```