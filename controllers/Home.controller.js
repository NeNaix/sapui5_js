sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function( Controller ) {
    "use strict";

    /**
     * @class spinifex.strato.controller.widget.WidgetSettings Controller for Widget Settings view.
     */
    return Controller.extend("spinifex.webdemo.controllers.Home", { /** @lends spinifex.strato.controller.widget.WidgetSettings */

        model: null,

        /**
         * Called when a controller is instantiated and its View controls (if
         * available) are already created. Can be used to modify the View before it
         * is displayed, to bind event handlers and do other one-time
         * initialization.
         *
         * @constructs
         */
        onInit: function () {

            var model = new sap.ui.model.json.JSONModel({
                loading: false,
                mode:"",
                numDigits: 0,
                maxNumbers: 0,
                result: "",
                records:
                {
                    "Products": [
                      {
                        "ProductID": 1,
                        "ProductName": "Chai",
                        "QuantityPerUnit": "10 boxes x 20 bags",
                        "UnitPrice": "18.0000",
                        "Discontinued": false
                      },
                      {
                        "ProductID": 2,
                        "ProductName": "Chang",
                        "QuantityPerUnit": "24 - 12 oz bottles",
                        "UnitPrice": "19.0000",
                        "Discontinued": true
                      },
                      {
                        "ProductID": 3,
                        "ProductName": "Aniseed Syrup",
                        "QuantityPerUnit": "12 - 550 ml bottles",
                        "UnitPrice": "10.0000",
                        "Discontinued": false
                      },
                      {
                        "ProductID": 4,
                        "ProductName": "Chef Anton's Cajun Seasoning",
                        "QuantityPerUnit": "48 - 6 oz jars",
                        "UnitPrice": "22.0000",
                        "Discontinued": false
                      },
                      {
                        "ProductID": 5,
                        "ProductName": "Chef Anton's Gumbo Mix",
                        "QuantityPerUnit": "36 boxes",
                        "UnitPrice": "21.3500",
                        "Discontinued": false
                      }
                    ]
                  }
            });

            this.getView().setModel(model);
        },
        /**
         * This function is called from the generate
         * button
         */
        onSaveProduct: function() {
            var model = this.getView().getModel();
          
            var records = model.getProperty("/records/Products");

            records.push();

            model.setProperty("/records", [...records]);
        },
        onGeneratePress: function(oEvent, param) {
            console.log(param)
            var model = this.getView().getModel();
            var numdigits = model.getProperty("/numDigits");
            var maxnumber = model.getProperty("/maxNumbers");
            var result = 0;
            model.setProperty("/loading", true);
            switch(param){
                case "clear":
                    model.setProperty("/numDigits",0);
                    model.setProperty("/maxNumbers",0);
                    break;
                case "+":
                    result = numdigits+` + `+maxnumber+` = ` + (+numdigits + (+maxnumber)).toString();
                    break;
                case "-":
                    result = numdigits+` - `+maxnumber+` = ` + (+numdigits - (+maxnumber)).toString();
                    break;
                case "*":
                    result = numdigits+` * `+maxnumber+` = ` + (+numdigits * (+maxnumber)).toString();
                    break;
                case "/":
                    result = numdigits+` / `+maxnumber+` = ` + (+numdigits / (+maxnumber)).toString();
                    break;
                
            }
            console.log(result);
            model.setProperty("/result", result);
            model.setProperty("/loading", false);
        },
        onSaveRecord: function() {
            var model = this.getView().getModel();
          
            var records = model.getProperty("/records");

            records.push(model.getProperty("/result"));

            model.setProperty("/records", [...records]);
        },
        onClearRecord: function() { 
            var model = this.getView().getModel();
            model.setProperty("/records", []);
        },
        
    });

});