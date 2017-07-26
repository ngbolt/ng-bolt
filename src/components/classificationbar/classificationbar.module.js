(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_classificationbar
   * @description ngBoltJS Classification Bar module.
   *
   * @since 2.0.0
   *
   */
  angular.module('blt_classificationbar', [])
    .component('bltClassificationbar', bltClassificationbar())
  ;

  /**
   * @ngdoc directive
   * @name bltClassificationBar
   * @module blt_classificationbar
   * @description The bltClassificationBar component provides a simple, standardized way to add a DoD standards compliant
   * classification label to pages/content in your application. The levels supported by this component are:
   * **Unclassified**, **Confidential**, **Secret**, and **Top Secret**.
   *
   * To use this component, simply include the component element as the first element in your main html. (This
   * element can be included anywhere in your application where you'd like the classification bar to appear, but
   * standard practice is to show it at the top of the main application page.)
   *
   * To define the classification level, provide one of the valid levels in the `data-classification` attribute.
   *
   * To define the verbosity of the classification label, assign a value to the `data-verbosity` attribute. A value of
   * 0 will result in only the specified classification label being displayed: "UNCLASSIFIED". A level of 1 will
   * increase verbosity to: "Highest Possible Classification: UNCLASSIFIED". A level of 2 will increase verbosity
   * further to: "This page contains dynamic content - Highest Possible Classification: UNCLASSIFIED".
   *
   * To further customize the presentation of this text, you can use the `data-custom-text` attribute. This attribute
   * accepts free text content which will be displayed in place of the default messaging. The only requirement is that
   * the text contain at least one reference to the classification level specified in `data-classification`.
   *
   * @example <caption>Unclassified classification bar with default verbosity level label "UNCLASSIFIED"</caption>
   * <example runnable="true">
   *   <html>
   *     <blt-classificationbar data-classification="unclassified"></blt-classificationbar>
   *   </html>
   * </example>
   *
   * @example <caption>Secret classification bar with label "This page contains dynamic content -
   * Highest Possible Classification: SECRET"</caption>
   * <example runnable="true">
   *   <html>
   *     <blt-classificationbar data-classification="secret"
   *                            data-verbosity="2">
   *     </blt-classificationbar>
   *   </html>
   * </example>
   *
   * @example <caption>Top Secret classification bar with VALID usage of custom text label "CLASSIFICATION:
   * TOP SECRET"</caption>
   * <example runnable="true">
   *   <html>
   *     <blt-classificationbar data-classification="topsecret"
   *                            data-custom-text="CLASSIFICATION: TOP SECRET">
   *     </blt-classificationbar>
   *  </html>
   * </example>
   *
   * @example <caption>INVALID custom text label "Content Classification: UNCLASSED" on unclassified classification
   * bar. (Custom label **MUST** contain the word "UNCLASSIFIED")</caption>
   * <example>
   *   <html>
   *     <blt-classificationbar data-classification="unclassified"
   *                            data-custom-text="Content Classification: UNCLASSED">
   *     </blt-classificationbar>
   *  </html>
   * </example>
   *
   * @param {string} data-classification Indicates the classification level of the content on the page being labeled.
   * Valid values include "unclassified", "confidential", "secret", and "top secret". (Case insensitive)
   * @param {string} [data-verbosity] Defines the verbosity with which to describe the specified classification level.
   * Valid values are 0-2 with 0 being least verbose and 2 being most verbose.
   * @param {string} [data-custom-text] This attribute can be used to specify custom messaging for the classification
   * bar classification label. Any text defined here will replace the standard verbosity based label. The only
   * requirement is that the standard verbosity level 0 label is contained somewhere in the custom text.
   *
   *
   */
  function bltClassificationbar() {
    return {
      templateUrl: 'components/classificationbar/classificationbar.template.html',
      controller: bltClassificationbarController,
      bindings: {
        cls: "@classification",
        customText: "@",
        verbosity: "@"
      }
    };
  }

  /**
   * @private
   * @name bltClassificationbarController
   * @module blt_classificationbar
   * @description Controller for bltClassificationBar component. We'll use this as an opportunity to review our attributes and provide
   * error feedback.
   *
   * @param {service} BltApi The ngBoltJS [BltApi](core.BltApi.html) service.
   *
   */
  function bltClassificationbarController() {

    var ctrl = this;
    var classifications = {
      "unclassified": {display: "UNCLASSIFIED", cssClass: "unclassified"},
      "confidential": {display: "CONFIDENTIAL", cssClass: "confidential"},
      "secret": {display: "SECRET", cssClass: "secret"},
      "topsecret": {display: "TOP SECRET", cssClass: "top-secret"},
      "top-secret": {display: "TOP SECRET", cssClass: "top-secret"},
      "top secret": {display: "TOP SECRET", cssClass: "top-secret"},
    }
    var verbosity = {
      0: "",
      1: "Highest Possible Classification: ",
      2: "This page contains dynamic content - Highest Possible Classification: "
    }

    var classification = undefined;

    ctrl.$onInit = init;

    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {
      //confirm classification chosen and appropriately chosen
      if ( !ctrl.cls ) {
        console.error("Missing required attribute: 'classification'");
        return;
      } else {
        classification = classifications[ctrl.cls.toLowerCase()];
        if ( !classification ) {
          console.error("Attribute 'classification' must be one of ['unclassified', 'confidential', 'secret', " +
            "'topsecret']. Current value: '" + ctrl.cls + "'. See: " + window.location + "/blt.classificationbar.bltClassificationBar.html");
          return;
        }
      }

      //check for custom text entered in place of default text
      if ( angular.isDefined(ctrl.customText) ) {
        if ( ctrl.customText.indexOf(classification.display) < 0 ) {
          console.error("Attribute 'custom-text' must contain at least one reference to standard classification " +
            "display: " + classification.display + " See: " + window.location + "/blt.classificationbar.bltClassificationBar.html");
          return;
        }
      }

      ctrl.classification = angular.copy(classification);
      if ( ctrl.customText ) {
        ctrl.classification.display = ctrl.customText;
      } else if ( ctrl.verbosity ) {
        if ( angular.isUndefined(verbosity[ctrl.verbosity]) ) {
          console.warn("Attribute 'verbosity' contained invalid verbosity level: " + ctrl.verbosity + ". Valid values " +
            "are [0, 1, 2]. See: " + window.location + "/blt.classificationbar.bltClassificationBar.html");
        } else {
          ctrl.classification.display = verbosity[ctrl.verbosity] + ctrl.classification.display;
        }
      }
    }
  }

  bltClassificationbarController.$inject = [];
})();