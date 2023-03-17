sap.ui.define([
        "sap/ui/core/mvc/Controller",
    ], function( Controller ) {
        "use strict";
    
        /**
         * @class spinifex.strato.controller.widget.WidgetSettings Controller for Widget Settings view.
         */
        return Controller.extend("spinifex.webdemo.controllers.Product", { /** @lends spinifex.strato.controller.widget.WidgetSettings */
    
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
                prodname:"",
                show:true,
                price:0,
                qty:0,
                Products: [
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
                });
    
                this.getView().setModel(model);
            },
            /**
             * This function is called from the generate
             * button
             */
            onToggle: function() {
                var model = this.getView().getModel();
                var show = model.getProperty("/show");
                model.setProperty("/show", !show);

            },
            onAddProductToList: function(ctx,oProduct) {
                var model = this.getView().getModel();
          
                var records = model.getProperty("/Products_list");
    
                records.push(oProduct);
    
                model.setProperty("/Products_list", records);

            },
            onSaveProduct: function() {
                var model = this.getView().getModel();
                var current_products = model.getProperty("/Products");
                let prod = model.getProperty("/prodname");
                let price = model.getProperty("/price");
                let qty = model.getProperty("/qty");
                var discon = false;
                if(model.getProperty("/prodname").trim() === ""){
                        return sap.m.MessageToast.show("Product name is Required", {
                                duration: 1000,                  // default
                                width: "100%",                   // default
                                my: "top bottom",             // default
                                at: "top bottom",             // default
                                of: window,                      // default
                                offset: "0 0",                   // default
                                collision: "fit fit",            // default
                                onClose: null,                   // default
                                autoClose: true,                 // default
                                animationTimingFunction: "ease", // default
                                animationDuration: 1000,         // default
                                closeOnBrowserNavigation: true   // default
                            });
                //     return alert("Product name is Required");    
                } 

                if (+price <= 0|| +qty <= 0) {
                    discon = true;  
                }

                console.log(Boolean(current_products[current_products.length-1]));

                Boolean(current_products[current_products.length-1]) ? current_products.push({
                        "ProductID": current_products[current_products.length-1].ProductID + 1,
                        "ProductName": prod,
                        "QuantityPerUnit": qty,
                        "UnitPrice": price,
                        "Discontinued": discon
                }):current_products.push([{
                        "ProductID": 1,
                        "ProductName": prod,
                        "QuantityPerUnit": qty,
                        "UnitPrice": price,
                        "Discontinued": discon
                }]);

                model.setProperty("/Products",current_products);
                model.setProperty("/prodname",0);
                model.setProperty("/price",0);
                model.setProperty("/qty",0);

                
    
                // records.push();
    
                // model.setProperty("/Products", [...records]);
            }
        });
    
    });