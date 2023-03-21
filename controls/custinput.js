sap.ui.define([
        "sap/m/Input",
        "sap/m/ComboBox",

    ], function( 
        sapInput,
        ComboBox){
        "use strict";
        
        var Input = sapInput.extend("controls_input",{
            metadata: {
                
                aggregations: {
                    _firstInput: { type: "sap.m.Input", multiple: false },
                    _secondInput: { type: "sap.m.Input", multiple: false },
                    _result: { type: "sap.m.Text", multiple: false },
                    _comboBox: { type: "sap.m.ComboBox", multiple: false },
                    _isequal: { type: "sap.m.Button", multiple: false },
                },
                events:{
                    change:{}
                }
            },
            init: function(oEvent) {
                
                if ( sapInput.prototype.init )
                sapInput.prototype.init.apply(this, arguments);
                    var combo = new ComboBox({
                        width:"300px",
                        items:[
                            {key:"+",text:"+"},
                            {key:"-",text:"-"},
                            {key:"*",text:"*"},
                            {key:"/",text:"/"},
                            {key:"^",text:"^"},
                            {key:"%",text:"%"},
                        ],
                        value:"+",
                        
                        
                    });
        
                    

                    var passInput1 = new sap.m.Input({   
                        width:"350px",
                        type:"Number",
                        placeholder:"First Number",
                        valueState: {
                                parts: ["/first"],
                                formatter: function(AlertMessageVisibility) {
                                    return AlertMessageVisibility
                                        ? sap.ui.core.ValueState.Error
                                        : sap.ui.core.ValueState.None
                                } 
                            },
                        valueStateText: {
                                parts: ["/first"],
                                formatter: function(AlertMessageVisibility) {
                                    return AlertMessageVisibility
                                        ? "this is first number field reuired"
                                        : ''
                                } 
                            },
                        liveChange:[function(oEvent){
                            
                            var data = oEvent.getSource().getParent();
                            var first = +data.getAggregation("_firstInput").getValue();
                            var second = +data.getAggregation("_secondInput").getValue();
                          
                            if( first === 0){
                                oEvent.getSource().getModel().setProperty("/first",true)
                                
                            }else{
                                oEvent.getSource().getModel().setProperty("/first",false)
                            }

                            if(second === 0){
                                oEvent.getSource().getModel().setProperty("/second",true) 
                            }
                            else{
                                oEvent.getSource().getModel().setProperty("/second",false)
                            }

                            if (oEvent.getSource().getModel().getProperty("/first") || oEvent.getSource().getModel().getProperty("/second")) {
                                return
                            }

                            switch(data.getAggregation("_comboBox").getValue()){
                                case"+":
                                    data.getAggregation("_result").setText(first+second);
                                    break;
                                case"-":
                                    data.getAggregation("_result").setText(first-second);
                                    break;
                                case"*":
                                    data.getAggregation("_result").setText(first*second);
                                    break;
                                case"/":
                                    data.getAggregation("_result").setText(first/second);
                                    break;
                                case"^":
                                    data.getAggregation("_result").setText(first**second);
                                    break;
                                case"%":
                                    data.getAggregation("_result").setText(first%second);
                                    break;
                            }
                        },this]
                        
                    });

                    var passInput2 = new sap.m.Input({   
                        width:"350px",
                        type:"Number",
                        placeholder:"Second Number",
                            valueState: {
                                parts: ["/second"],
                                formatter: function(AlertMessageVisibility) {
                                    console.log('AlertMessageVisibility', AlertMessageVisibility);
                                    return AlertMessageVisibility
                                        ? sap.ui.core.ValueState.Error
                                        : sap.ui.core.ValueState.None
                                } 
                            },
                            valueStateText: {
                                parts: ["/second"],
                                formatter: function(AlertMessageVisibility) {
                                    console.log('AlertMessageVisibility', AlertMessageVisibility);
                                    return AlertMessageVisibility
                                        ? "this is second number field reuired"
                                        : ''
                                } 
                            }
                    });

                    var passInput3 = new sap.m.Text({   
                        width:"350px",
                        text:{
                                path: "/result",
                                formatter: function() {
                                    return "Answer...";
                                }
                            }
                    });
                    

                    var ans = new sap.m.Button({   
                        width: '50px',
                        text:"=",
                        press:[function(oEvent){
                            
                            var data = oEvent.getSource().getParent();
                            var first = +data.getAggregation("_firstInput").getValue();
                            var second = +data.getAggregation("_secondInput").getValue();
                            console.log(first,second);
                            if( first === 0){
                                oEvent.getSource().getModel().setProperty("/first",true)
                            }else{
                                oEvent.getSource().getModel().setProperty("/first",false)
                            }

                            if(second === 0){
                                oEvent.getSource().getModel().setProperty("/second",true) 
                            }
                            else{
                                oEvent.getSource().getModel().setProperty("/second",false)
                            }

                            if (oEvent.getSource().getModel().getProperty("/first") || oEvent.getSource().getModel().getProperty("/second")) {
                                return
                            }

                            switch(data.getAggregation("_comboBox").getValue()){
                                case"+":
                                    data.getAggregation("_result").setText(first+second);
                                    break;
                                case"-":
                                    data.getAggregation("_result").setText(first-second);
                                    break;
                                case"*":
                                    data.getAggregation("_result").setText(first*second);
                                    break;
                                case"/":
                                    data.getAggregation("_result").setText(first/second);
                                    break;
                                case"^":
                                    data.getAggregation("_result").setText(first**second);
                                    break;
                                case"%":
                                    data.getAggregation("_result").setText(first%second);
                                    break;
                            }
                        },this]
                    });
        
                    this.setAggregation("_firstInput", passInput1);
                    this.setAggregation("_secondInput", passInput2);
                    this.setAggregation("_result", passInput3);
                    this.setAggregation("_comboBox", combo);
                    this.setAggregation("_isequal", ans);
        
                    
                },
                
            renderer: {
                render: function(rm, oControl) {

                    var ctlInput1 = oControl.getAggregation("_firstInput");
                    var ctlInput2 = oControl.getAggregation("_secondInput");
                    var ans = oControl.getAggregation("_result");
                    var comboBox = oControl.getAggregation("_comboBox");
                    var equal = oControl.getAggregation("_isequal");
                    rm.write("<div");
                    rm.addClass("myInput");
                    rm.writeClasses();
                    rm.writeControlData(oControl);
                    rm.writeAttribute("style", "display: flex;align-items: center;justify-content: space-evenly;");
                    rm.write(">");

                    rm.renderControl(ctlInput1);
                    rm.renderControl(comboBox);

                    rm.renderControl(ctlInput2);
                    rm.renderControl(equal);
                    rm.write("&emsp;");
                    rm.renderControl(ans);
                    rm.write("</div>");
                } 
            }
            
            
        });

        // Input.prototype.setValue = function(sValue) {

        //     if ( sapInput.prototype.setValue ){ 
        //         sapInput.prototype.setValue.apply(this, arguments);
        //     }

        //     var oPassInput = this.getAggregation("_passwordInput");
        //     oPassInput.setValue(sValue);
        //     this.setProperty("value", sValue);
        // };

        return Input;

    }, true);