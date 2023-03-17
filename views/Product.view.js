
sap.ui.define([
        "sap/m/Page","sap/m/Label","sap/m/Input","sap/m/Button","sap/m/TextArea",
        "sap/m/Table","sap/m/Column","sap/m/Text"
    ], function( Page,Label,Input,Button,TextArea,Table,Column,Text ) {
        "use strict";
    
            var oView = sap.ui.jsview("spinifex.webdemo.views.Product", {
                    /**
             * Specifies the Controller belonging to this View.
                     * In the case that it is not implemented, or that "null" is
             * returned, this View does not have a Controller.
                     */
        getControllerName: function () {
                return "spinifex.webdemo.controllers.Product";
        },
        createContent: function (oController) {
    
                return new Page({
                    title: "PRODUCT",
                    content: [
                        new Label({ text: "Product name :" }),
                        new Input({ value: "{/prodname}" ,placeholder:"Product Name"}),

                        new Label({ text: "Product price :" }),
                        new Input({ value: "{/price}", type:"Number" ,placeholder:"Product Price"}),

                        new Label({ text: "Product quantity:" , description:"Product quantity"}),
                        new Input({ value: "{/qty}", type:"Number" ,placeholder:"Product Quantity"}),
                        
                        new Button({
                            text: "Add",
                            icon:"sap-icon://add",
                        //     busyIndicatorDelay: 0,
                        //     busy: {
                        //         path: "/loading",
                        //         formatter: function(isLoading) {
                        //             return isLoading;
                        //         }
                        //     },
                            press: [oController.onSaveProduct, oController]
                        }),
                        new Button({
                                text: "Toggle",
                                icon:"sap-icon://switch-views",
                                press: [oController.onToggle, oController]
                            }),
                        new Table({
                            visible: {
                                path: "/show",
                                formatter: function(is_visible) {
                                    return is_visible;
                                }
                            },
                            insert:false,
                            width:"100%",
                            columns: [
                                new Column({ header: new Text({text:"ProductID"})  }),
                                new Column({ header: new Text({text:"ProductName"}) }),
                                new Column({header: new Text({text:"QuantityPerUnit"}) }),
                                new Column({header: new Text({text:"UnitPrice"}) }),
                                new Column({header: new Text({text:"Discontinued"}) }),
                            ],
                            items: {
                                        path:"/Products",
                                        // template: new sap.m.StandardListItem({
                                        //     title:"{}",
                                        //     icon: "sap-icon://chevron-phase-2",
            
                                        // })
                                        factory: (idx,ctx) =>{
                                            console.log(ctx);

                                            var inputPrice;
                                            var inputQty;
                                            var border;
                                            var data = ctx.getObject()
                                        //     console.log(ctx)
                                            if(data.UnitPrice === 0 ){
                                                
                                                inputPrice = new Input({value:data.UnitPrice,type:"Number",placeholder:"Product Price"})
                                            }else{
                                                inputPrice = new Text({text:"{UnitPrice}" });
                                            }

                                            if(data.QuantityPerUnit === 0 ){
                                                inputQty = new Input({value:data.QuantityPerUnit,type:"Number",placeholder:"Product Quantity"})
                                            }else{
                                                inputQty = new Text({text:"{QuantityPerUnit}"});
                                            }

                                            return new sap.m.ColumnListItem({
                                                
                                                cells:[
                                                    new Text({text:"{ProductID}"}),
                                                    new Text({text:"{ProductName}"}),
                                                    inputQty,
                                                    inputPrice,
                                                    new Text({text:"{Discontinued}"}) 
                                                ],highlight:{
                                                        parts:["Discontinued"],
                                                        formatter: function(discon) {
                                                                return discon?sap.ui.core.MessageType.Error:sap.ui.core.MessageType.Success;
                                                            }
                                               

                                                }
                                                
                                            }).addStyleClass("discon")
            
                                        }
                                    }
                        }),

                        new sap.m.List({
                                visible: {
                                        path: "/show",
                                        formatter: function(is_visible) {
                                            return !is_visible;
                                        }
                                    },
                            items: {
                                path:"/Products",
                                template: new sap.m.StandardListItem({
                                            title:{
                                                parts:["ProductName"],
                                                formatter: function(ProductName) {
                                                        return `Product Name: `+ ProductName;
                                                },
                                                
                                            },
                                            description:{
                                                parts:["QuantityPerUnit","UnitPrice"],
                                                formatter: function(QuantityPerUnit,UnitPrice) {
                                                                return `Product Price: $${UnitPrice}   Product Quantity: ${QuantityPerUnit}`;
                                                }
                                            },
                                            icon: "sap-icon://chevron-phase-2",
                                            highlight:{
                                                parts:["Discontinued"],
                                                formatter: function(discon) {
                                                        return discon?sap.ui.core.MessageType.Error:sap.ui.core.MessageType.Success;
                                                    }
                                       

                                        }
            
                                        })
                                // factory: (idx,ctx) =>{
                                //     return new sap.m.StandardListItem({
                                //         title:{
                                //                 parts:["ProductName"],
                                //                 formatter: function(ProductName) {
                                //                         return `Product Name: `+ ProductName;
                                //                 }

                                //         },
                                //         description:{
                                //                 parts:["QuantityPerUnit","UnitPrice"],
                                //                 formatter: function(QuantityPerUnit,UnitPrice) {
                                //                         return `Product Price: $${UnitPrice}   Product Quantity: ${QuantityPerUnit}`;
                                //                 }
                                //         }
                                //     })
    
                                // }
                            },
                            
                        }),    
                    ]
                });
    
            }
        });
    
        // var myclass = new oView();
    
        return oView;
    });