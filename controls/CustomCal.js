sap.ui.define([
    "sap/m/Input",
    "sap/m/ComboBox",

], function( 
    sapInput,
    ComboBox){
    "use strict";
    
    var Input = sapInput.extend("controls_input",{
        metadata: {
            properties:{
                Input_first_value: {type: "float", default:0},
                Input_second_value: {type: "float", default:0},
                Operator: {type: "string", default:"+"},
            },
            aggregations: {
                _firstInput: { type: "sap.m.Input", multiple: false },
                _secondInput: { type: "sap.m.Input", multiple: false },
                _comboBox: { type: "sap.m.ComboBox", multiple: false },
            },
            events:{
                change:{}
            }
        },
        init: function(oEvent) {
        if(sapInput.prototype.init)
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
            ] ,
            value:"+",
            change:[function(oEvent){
                var data = oEvent.getSource().getParent();
                
                var opt = oEvent.getSource().getValue();
                data.setOperator(opt);
                data.fireChange()
            },this] 
        }).addStyleClass("aa");

        var passInput1 = new sap.m.Input({   
            width:"350px",
            type:"Number",
            placeholder:"First Number",
            valueState: {
                parts: ["/first"],
                formatter: function(action) {
                    return action
                        ? sap.ui.core.ValueState.Error
                        : sap.ui.core.ValueState.None
                } 
            },
            valueStateText: {
                parts: ["/first"],
                formatter: function(action) {
                    return action
                        ? "this is first number field reuired"
                        : ''
                } 
            },
            change:[function(oEvent){
                var data = oEvent.getSource().getParent();
                var first = +data.getAggregation("_firstInput").getValue();
                data.setInput_first_value(first);
                data.fireChange()
            },this]
                    
        });
        
        var passInput2 = new sap.m.Input({   
            width:"350px",
            type:"Number",
            placeholder:"Second Number",
            valueState: {
                parts: ["/second"],
                formatter: function(action) {
                    return action
                        ? sap.ui.core.ValueState.Error
                        : sap.ui.core.ValueState.None
                } 
            },
            valueStateText: {
                parts: ["/second"],
                formatter: function(action) {

                    return action
                        ? "this is second number field reuired"
                        : ''
                } 
            },
            change:[function(oEvent){
                var data = oEvent.getSource().getParent();
                var second = +data.getAggregation("_secondInput").getValue();
                data.setInput_second_value(second);
                data.fireChange()
            },this]
        });
        this.setAggregation("_firstInput", passInput1);
        this.setAggregation("_secondInput", passInput2);
        this.setAggregation("_comboBox", combo);   
        },
            
        renderer: {
            render: function(rm, oControl) {

                var ctlInput1 = oControl.getAggregation("_firstInput");
                var ctlInput2 = oControl.getAggregation("_secondInput");
                var comboBox = oControl.getAggregation("_comboBox");

                rm.write("<div");
                rm.addClass("myInput");
                rm.writeClasses();
                rm.writeControlData(oControl);
                rm.writeAttribute("style", "display: flex;align-items: center;justify-content: space-evenly;");
                rm.write(">");

                rm.renderControl(ctlInput1);
                rm.renderControl(comboBox);

                rm.renderControl(ctlInput2);
                rm.write("</div>");
            } 
        }
        
        
    });

    return Input;

}, true);