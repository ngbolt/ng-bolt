(function(){
  'use strict'
  {%- for id, item in doc.items %}

  {$ item.content $}

  {% endfor %}
})();