sap.ui.define([
        "sap/m/Page","sap/m/Label","sap/m/Input","sap/m/Button","sap/m/TextArea",
        "sap/m/Table","sap/m/Column","sap/m/Text","../controls/CustomCal"
    ], function( Page,Label,Input,Button,TextArea,Table,Column,Text,cuinput ) {
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
                        // new Label({ text: "Product name :" }),
                        // new Input("",{ 
                        //     value: "{/prodname}",
                        //     placeholder:"Product Name",
                        //     valueState: {
                        //         parts: ["/AlertVisibility"],
                        //         formatter: function(AlertMessageVisibility) {
                        //             console.log('AlertMessageVisibility', AlertMessageVisibility);
                        //             return AlertMessageVisibility
                        //                 ? sap.ui.core.ValueState.Error
                        //                 : sap.ui.core.ValueState.None
                        //         } 
                        //     },
                        //     valueStateText: {
                        //         parts: ["/AlertVisibility"],
                        //         formatter: function(AlertMessageVisibility) {
                        //             console.log('AlertMessageVisibility', AlertMessageVisibility);
                        //             return AlertMessageVisibility
                        //                 ? "this is reuired field"
                        //                 : ''
                        //         } 
                        //     }
                        // }),

                        // new Label({ text: "Product price :" }),
                        // new Input({ value: "{/price}", type:"Number" ,placeholder:"Product Price"}),

                        // new Label({ text: "Product quantity:" , description:"Product quantity"}),
                        // new Input({ value: "{/qty}", type:"Number" ,placeholder:"Product Quantity"}),

                        new Label({ text: "Product quantity:" , description:"Product quantity"}),
                        new cuinput({
                            Input_first_value:"{/input1}",
                            Input_second_value:"{/input2}",
                            Operator:"{/opt}",
                            change:[oController.onchangeEvent,oController]
                        }),
                        
                        new Input({ value: {
                            parts:["/answer"],
                            formatter: function(ans) {

                                return (""+ans) === "NaN"?"Not Divisible by nothing or Zero":"Answer : " + ans ;
                            }
                        } ,editable:false}),    
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
                            mode:"SingleSelectMaster",
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
                                new Column({header: new Text({text:"UnitPrice"}) }),
                                new Column({header: new Text({text:"QuantityPerUnit"}) }),
                                new Column({header: new Text({text:"Discontinued"}) }),
                                new Column({header: new Text({text:"More Details"}) }),
                            ],
                            items: {
                                        path:"/Products",
                                        // template: new sap.m.StandardListItem({
                                        //     title:"{}",
                                        //     icon: "sap-icon://chevron-phase-2",
            
                                        // })
                                        factory: (idx,ctx) =>{
                                            var inputPrice;
                                            var inputQty;
                                            var data = ctx.getObject()
                                            console.log(ctx.sPath);
                                            var row = new sap.m.ColumnListItem({
                            
                                                cells:[
                                                    new Text({text:"{ProductID}"}),
                                                    new Text({text:"{ProductName}"}),
                                                    new Text({text:"{UnitPrice}" }),
                                                    new Text({text:"{QuantityPerUnit}"}),
                                                    new Text({text:"{Discontinued}"}),
                                                    new Button({
                                                        text: "",
                                                        icon:"sap-icon://inspect",
                                                        press: [ctx.sPath,oController.onDefaultDialogPress, oController]
                                                    }),
                                                ],highlight:{
                                                        parts:["Discontinued"],
                                                        formatter: function(discon) {
                                                                return discon?sap.ui.core.MessageType.Error:sap.ui.core.MessageType.Success;
                                                            }
                                                },
                                                // press: [ctx.sPath,oController.onDefaultDialogPress, oController]
                                                        
                                            }).addStyleClass("table-success")

                                            return row;
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
                                // template: new sap.m.ColumnListItem({
                                //             type: "Active",
                                //             title:{
                                //                 parts:["ProductName"],
                                //                 formatter: function(ProductName) {
                                //                         return `Product Name: `+ ProductName;
                                //                 },
                                                
                                //             },
                                //             description:{
                                //                 parts:["QuantityPerUnit","UnitPrice"],
                                //                 formatter: function(QuantityPerUnit,UnitPrice) {
                                //                                 return `Product Price: $${UnitPrice}   Product Quantity: ${QuantityPerUnit}`;
                                //                 }
                                //             },
                                //             icon: "sap-icon://chevron-phase-2",
                                //             highlight:{
                                //                 parts:["Discontinued"],
                                //                 formatter: function(discon) {
                                //                         return discon?sap.ui.core.MessageType.Error:sap.ui.core.MessageType.Success;
                                //                     },
                                //             press: [oController.onSelectedRowItem, oController]
                                       

                                //         }
            
                                //         })
                                factory: (idx,ctx) =>{
                                    return new sap.m.StandardListItem({
                                        title:{
                                                parts:["ProductName"],
                                                formatter: function(ProductName) {
                                                        return `Product Name: `+ ProductName;
                                                }

                                        },
                                        description:{
                                                parts:["QuantityPerUnit","UnitPrice"],
                                                formatter: function(QuantityPerUnit,UnitPrice) {
                                                        return `Product Price: $${UnitPrice}   Product Quantity: ${QuantityPerUnit}`;
                                                }
                                        }
                                    })
    
                                }
                            },
                            
                        }),
                    ]
                });
    
            }
        });
    
        // var myclass = new oView();
    
        return oView;
    });