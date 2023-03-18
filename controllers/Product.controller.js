sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",  
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
  "sap/ui/core/library",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/m/Text"
], function (Controller, JSONModel, Dialog, Button,mobileLibrary,coreLibrary, List, StandardListItem,Text) {
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
            onDefaultDialogPress: function (evt,path) {

              var model = this.getView().getModel();
              var current_products = model.getProperty(path);
              

              console.log(current_products,evt);
              var oDialog = new Dialog({
                type:mobileLibrary.DialogType.Message,
                title: "Products Information : "+ current_products.ProductName,
                state:coreLibrary.ValueState.Information,
                content:[
                  new sap.m.Label({ text: "Product name : "+current_products.ProductName }),
                  new sap.m.Label({ text: "Product Quantity : "+current_products.QuantityPerUnit }),
                  new sap.m.Label({ text: "Product Price : "+current_products.UnitPrice }),
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
              oDialog.open();
              // if (!this.oDefaultDialog) {
              //   this.oDefaultDialog = new Dialog({
              //     type:mobileLibrary.DialogType.Message,
              //     title: "Products Information : "+ current_products.ProductName,
              //     state:coreLibrary.ValueState.Information,
              //     draggable:true,
              //     content:[
              //       new sap.m.Label({ text: "Product name : "+current_products.ProductName }),
              //       new sap.m.Label({ text: "Product Quantity : "+current_products.QuantityPerUnit }),
              //       new sap.m.Label({ text: "Product Price : "+current_products.UnitPrice }),
              //       new sap.m.Label({ text: "Product Discontinued : "+current_products.Discontinued }),
              //     ]
              //     ,

              //     // new List({
              //     //   items: {
              //     //     path: ""+path,
              //     //     template: new StandardListItem({
              //     //       title: "{ProductName}",
              //     //       counter: "{UnitPrice}"
              //     //     })
              //     //   }
              //     // })
              //     beginButton: new Button({
              //       type:  mobileLibrary.ButtonType.Emphasized,
              //       text: "OK",
              //       press: function () {
              //         this.oDefaultDialog.close();
              //       }.bind(this)
              //     }),
              //     endButton: new Button({
              //       text: "Close",
              //       press: function () {
              //         this.oDefaultDialog.close();
              //       }.bind(this)
              //     }),
              //     afterClose: function() {
              //     }
              //   });
        
              //   // to get access to the controller's model
              //   this.getView().addDependent(this.oDefaultDialog);
              // }
        
              // this.oDefaultDialog.open();
            },
              
            onToggle: function() {
                var model = this.getView().getModel();
                var show = model.getProperty("/show");
                model.setProperty("/show", !show);

            },
            // onAddProductToList: function(ctx,oProduct) {
            //     var model = this.getView().getModel();
            //     var records = model.getProperty("/Products_list");
    
            //     records.push(oProduct);
    
            //     model.setProperty("/Products_list", records);

            // },
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