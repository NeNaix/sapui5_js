
sap.ui.define([
    "sap/m/Page","sap/m/Label","sap/m/Input","sap/m/Button","sap/m/TextArea",
    "sap/m/Table","sap/m/Column","sap/m/Text"
], function( Page,Label,Input,Button,TextArea,Table,Column,Text ) {
    "use strict";

	var oView = sap.ui.jsview("spinifex.webdemo.views.Home", {
		/**
         * Specifies the Controller belonging to this View.
		 * In the case that it is not implemented, or that "null" is
         * returned, this View does not have a Controller.
		 */
		getControllerName: function () {
            return "spinifex.webdemo.controllers.Home";
        },

        createContent: function (oController) {

            return new Page({
                title: "Calculator SapUI5",
                content: [
                    new Label({ text: "Input : 1" }),
                    new Input({ value: "{/numDigits}",type:"Number"}),
                    new Label({ text: "Input : 2" }),
                    
                    new Input({ value: "{/maxNumbers}",type:"Number" }),
                    
                    new Button({
                        text: "Add",
                        icon:"sap-icon://add",

                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: ["+",oController.onGeneratePress, oController]
                    }),
                    new Button({
                        text: "Subtract",
                        icon:"sap-icon://less",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: ["-",oController.onGeneratePress, oController]
                    }),
                    new Button({
                        text: "Multiply",
                        icon:"sap-icon://decline",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: ["*",oController.onGeneratePress, oController]
                    }),
                    new Button({
                        text: "Divide",
                        icon:"sap-icon://commission-check",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: ["/",oController.onGeneratePress, oController]
                    }),
                    new Button({
                        text: "Clear",
                        icon:"sap-icon://sys-cancel-2",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: ["clear",oController.onGeneratePress, oController]
                    }),
                    
                    new Input({editable:false,
                        // visible: {
                        //     path: "/result",
                        //     formatter: function(aResult) {
                        //         return aResult > 0 ? true : false;
                        //     }
                        // },
                        // value: "{/result}"
                        value: {
                            path: "/result",
                            formatter: function(aResult) {
                                return aResult;
                            }
                        }
                    }),
                    new Table({
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
                                    path:"/records/Products",
                                    // template: new sap.m.StandardListItem({
                                    //     title:"{}",
                                    //     icon: "sap-icon://chevron-phase-2",
        
                                    // })
                                    factory: (idx,ctx) =>{
                                        console.log(ctx);
                                        return new sap.m.ColumnListItem({
                                            cells:[
                                                new Text({text:"{ProductID}"}),
                                                new Text({text:"{ProductName}"}),
                                                new Text({text:"{QuantityPerUnit}"}),
                                                new Text({text:"{UnitPrice}"}),
                                                new Text({text:"{Discontinued}"})
                                            ]
                                        })
        
                                    }
                                }
                    }),
                    // new sap.m.List({
                    //     items: {
                    //         path:"/records",
                    //         // template: new sap.m.StandardListItem({
                    //         //     title:"{}",
                    //         //     icon: "sap-icon://chevron-phase-2",

                    //         // })
                    //         factory: (idx,ctx) =>{

                    //             return new sap.m.CustomListItem({
                    //                 content:[
                    //                     // insert controls here 
                    //                 ]
                    //             })

                    //         }
                    //     },
                        
                    // }),
                    new Button({
                        text: "Add To Log",
                        icon:"sap-icon://save",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: [oController.onSaveRecord, oController]
                    }),
                    new Button({
                        text: "Clear Log",
                        icon:"sap-icon://delete",
                        busyIndicatorDelay: 0,
                        busy: {
                            path: "/loading",
                            formatter: function(isLoading) {
                                return isLoading;
                            }
                        },

                        press: [oController.onClearRecord, oController]
                    }),
                    
                    
                    
                ]
            });

        }
    });

    // var myclass = new oView();

    return oView;
});