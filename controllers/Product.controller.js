sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",  
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
  "sap/ui/core/library",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/m/Text",
  "sap/m/Input",
  "sap/m/FormattedText",
], function (
  Controller,
  JSONModel,
  Dialog,
  Button,
  mobileLibrary,
  coreLibrary,
  List,
  StandardListItem,
  Text,
  Input,
  FormattedText,
  ) {
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
                var model = new JSONModel({
                first:true,second:true,
                input1:null,input2:null,opt:"+",answer:0,
                prodname:"",
                show:true,
                price:0,
                qty:0,
                AlertVisibility:false,
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
          
            onSelectedRowItem: function(evt) {
              
              var oSelectedItem = oEvent.getSource();
              var oContext = oSelectedItem.getBindingContext("products");
              var sPath = oContext.getPath();
              var oProductDetailPanel = this.byId("productDetailsPanel");
              console.log(sPath);
              oProductDetailPanel.bindElement({ path: sPath, model: "Products" });
              
            },
            onDefaultDialogPress: function (evt,path) {

              var model = this.getView().getModel();
              var current_products = model.getProperty(path);
              var pqty;
              var pprice;
              console.log("The chosen path :"+path);
              var oDialog = new Dialog({
                type:mobileLibrary.DialogType.Message,
                state:coreLibrary.ValueState.Information,
                title: "Products Information : "+ current_products.ProductName,
                content:[
                  new sap.m.Label({ text: `{${path}/ProductName}` }),
                  new Input({value:`{${path}/UnitPrice}`,type:"Number",placeholder:"Product Price"}),
                  new Input({value:`{${path}/QuantityPerUnit}`,placeholder:"Product QTY"}),
                  new sap.m.Label({ text: "Product Discontinued : "+current_products.Discontinued }),
                ],
                beginButton: new Button({
                  text: 'Close',
                  press: function () {
                    oDialog.close();
                  }
                }),
                afterClose: function() {
                  oDialog.destroy();
                }
              });

              oDialog.setModel(model);
              oDialog.open();
            },
              
            onToggle: function() {
                var model = this.getView().getModel();
                var show = model.getProperty("/show");
                model.setProperty("/show", !show);

            },
            onchangeEvent: function(ctx) {
                var model = this.getView().getModel();
                var first = +model.getProperty("/input1");
                var second = +model.getProperty("/input2");
                var opt = model.getProperty("/opt");
                
                first < 0 ? model.setProperty("/first",true):model.setProperty("/first",false);
                second < 0 ? model.setProperty("/second",true):model.setProperty("/second",false);
                if (model.getProperty("/first")|| model.getProperty("/second")) {
                    return;
                }
                
                switch(opt){
                    case "+":
                        model.setProperty("/answer",first+second);
                        break;
                    case "-":
                        model.setProperty("/answer",first-second);
                        break;
                    case "*":
                        model.setProperty("/answer",first*second);
                        break;
                    case "/":
                        model.setProperty("/answer",first/second);
                        break;
                    case "^":
                        model.setProperty("/answer",first**second);
                        break;
                    case "%":
                        model.setProperty("/answer",first%second);
                        break;
                }
                  
                
    

            },
            onSaveProduct: function() {
                var model = this.getView().getModel();
                var current_products = model.getProperty("/Products");
                let prod = model.getProperty("/prodname");
                let price = model.getProperty("/price");
                let qty = model.getProperty("/qty");
                var discon = false;
                
                if(model.getProperty("/prodname").trim() === ""){
                  model.setProperty("/AlertVisibility",true);
                        return sap.m.MessageToast.show("Product name is Required", {
                                duration: 1000,                  // default
                                width: "100%",                   // default
                                my: "center  bottom",             // default
                                at: "center  bottom",             // default
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
            }
        });
  
    });