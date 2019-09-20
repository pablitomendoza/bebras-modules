var boardDefinitions = [
    {
        name: "grovepi",
        friendlyName: "Grove Base Hat for Raspberry Pi",
        image: "grovepihat.png",
        adc: "grovepi",
        portTypes: {
            "D": [5, 16, 18, 22, 24, 26],
            "A": [0, 2, 4, 6],
            "i2c": ["i2c"],
        },
        default: [
            { type: "screen", suggestedName: "screen1", port: "i2c", subType: "16x2lcd" },
            { type: "led", suggestedName: "led1", port: 'D5', subType: "blue" },
            { type: "servo", suggestedName: "servo1", port: "D16" },
            { type: "range", suggestedName: "range1", port :"D18", subType: "ultrasonic"},
            { type: "button", suggestedName: "button1", port: "D22" },
            { type: "humidity", suggestedName: "humidity1", port: "D24"},
            { type: "buzzer", suggestedName: "buzzer1", port: "D26", subType: "active"},
            { type: "temperature", suggestedName: "temperature1", port: 'A0', subType: "groveanalog" },
            { type: "potentiometer", suggestedName: "potentiometer1", port :"A4"},
            { type: "light", suggestedName: "light1", port :"A6"},
        ]
    },
    {
        name: "quickpi",
        friendlyName: "France IOI QuickPi Hat",
        image: "quickpihat.png",
        adc: "ads1015",
        portTypes: {
            "D": [6, 16, 24],
            "A": [0],
        },
        builtinSensors: [
            { type: "screen", subType: "oled128x32", port: "i2c",  suggestedName: "screen1", },
            { type: "led", subType: "red", port: "D4", suggestedName: "led1", },
            { type: "led", subType: "green", port: "D17", suggestedName: "led2", },
            { type: "led", subType: "blue", port: "D27",  suggestedName: "led3", },
            { type: "irtrans", port: "D22",  suggestedName: "infraredtransmiter1", },
            { type: "irrecv", port: "D23", suggestedName: "infraredreceiver1", },
            { type: "sound", port: "A1", suggestedName: "microphone1", },
            { type: "buzzer", subType: "passive", port: "D12", suggestedName: "buzzer1", },
            { type: "accelerometer", subType: "BMI160", port: "i2c", suggestedName: "accelerometer1", },
            { type: "gyroscope", subType: "BMI160", port: "i2c", suggestedName: "gryscope1", },
            { type: "magnetometer", subType: "LSM303C", port: "i2c", suggestedName: "magnetometer1", },
            { type: "temperature", subType: "BMI160", port: "i2c", suggestedName: "temperature1", },
            { type: "range", subType: "vl53l0x", port: "i2c", suggestedName: "distance1", },
            { type: "button", port: "D26", suggestedName: "button1", },
            { type: "light", port: "A2", suggestedName: "light1", },
            { type: "stick", port: "D19", suggestedName: "stick1", }
        ],
    },
    {
        name: "pinohat",
        image: "pinohat.png",
        friendlyName: "Raspberry Pi without hat",
        adc: ["ads1015", "none"],
        portTypes: {
            "D": [5, 16, 24],
            "A": [0],
            "i2c": ["i2c"],
        },
    }
]


var sensorDefinitions = [
    /******************************** */
    /*             Actuators          */
    /**********************************/
    {
        name: "led",
        description: "LED",
        isAnalog: false,
        isSensor: false,
        portType: "D",
        selectorImages: ["ledon-red.png"],
        valueType: "boolean",
        pluggable: true,
        getPercentageFromState: function (state) {
            if (state)
                return 1;
            else
                return 0;
        },
        getStateFromPercentage: function (percentage) {
            if (percentage)
                return 1;
            else
                return 0;
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        setLiveState: function (sensor, state, callback) {
            var ledstate = state ? 1 : 0;
            var command = "changeLedState(\"" + sensor.name + "\"," + ledstate + ")";

            context.quickPiConnection.sendCommand(command, callback);
        },
        subTypes: [{
            subType: "blue",
            description: "LED bleue",
            selectorImages: ["ledon-blue.png"],
            suggestedName: "blueled",
        },
        {
            subType: "green",
            description: "LED verte",
            selectorImages: ["ledon-green.png"],
            suggestedName: "greenled",
        },
        {
            subType: "orange",
            description: "LED orange",
            selectorImages: ["ledon-orange.png"],
            suggestedName: "orangeled",
        },
        {
            subType: "red",
            description: "LED rouge",
            selectorImages: ["ledon-red.png"],
            suggestedName: "redled",
        }
        ],
    },
    {
        name: "buzzer",
        description: "Buzzer",
        isAnalog: false,
        isSensor: false,
        portType: "D",
        selectorImages: ["buzzer-ringing.png"],
        valueType: "boolean",
        getPercentageFromState: function (state) {
            if (state)
                return 1;
            else
                return 0;
        },
        getStateFromPercentage: function (percentage) {
            if (percentage)
                return 1;
            else
                return 0;
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        setLiveState: function (sensor, state, callback) {
            var ledstate = state ? 1 : 0;
            var command = "setBuzzerState(\"" + sensor.name + "\"," + ledstate + ")";

            context.quickPiConnection.sendCommand(command, callback);
        },

        subTypes: [{
            subType: "active",
            description: "Grove Buzzer",
            pluggable: true,
        },
        {
            subType: "passive",
            description: "Quick Pi Passive Buzzer",
        }],
    },
    {
        name: "servo",
        description: "Servo motor",
        isAnalog: true,
        isSensor: false,
        portType: "D",
        valueType: "number",
        pluggable: true,
        valueMin: 0,
        valueMax: 180,
        selectorImages: ["servo.png", "servo-pale.png", "servo-center.png"],
        getPercentageFromState: function (state) {
            return state / 180;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 180);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        setLiveState: function (sensor, state, callback) {
            var command = "setServoAngle(\"" + sensor.name + "\"," + state + ")";

            context.quickPiConnection.sendCommand(command, callback);
        }
    },
    {
        name: "screen",
        description: "Screen",
        isAnalog: false,
        isSensor: false,
        doubleWidth: true,
        portType: "i2c",
        valueType: "object",
        selectorImages: ["screen.png"],
        compareState: function (state1, state2) {
            // Both are null are equal
            if (state1 == null && state2 == null)
                return true;

            // If only one is null they are different
            if ((state1 == null && state2) ||
                (state1 && state2 == null))
                return false;

            // Otherwise compare the strings
            return state1.line1 == state2.line1 &&
                state1.line2 == state2.line2;
        },
        setLiveState: function (sensor, state, callback) {
            var command = "displayText(\"" + sensor.name + "\"," + state.line1 + "\", \"" + state.line2 + "\")";

            context.quickPiConnection.sendCommand(command, callback);
        },
        subTypes: [{
            subType: "16x2lcd",
            description: "Grove 16x2 LCD",
            pluggable: true,
        },
        {
            subType: "oled128x32",
            description: "128x32 Oled Screen",
        }],

    },
    {
        name: "irtrans",
        description: "IR Transmiter",
        isAnalog: true,
        isSensor: true,
        portType: "D",
        valueType: "number",
        valueMin: 0,
        valueMax: 60,
        selectorImages: ["irtranson.png"],
        getPercentageFromState: function (state) {
            return state / 60;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 60);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        setLiveState: function (sensor, state, callback) {
            var ledstate = state ? 1 : 0;
            var command = "setInfraredState(\"" + sensor.name + "\"," + ledstate + ")";

            context.quickPiConnection.sendCommand(command, callback);
        },
    },
    /******************************** */
    /*             sensors            */
    /**********************************/
    {
        name: "button",
        description: "Button",
        isAnalog: false,
        isSensor: true,
        portType: "D",
        valueType: "boolean",
        pluggable: true,
        selectorImages: ["buttonoff.png"],
        getPercentageFromState: function (state) {
            if (state)
                return 1;
            else
                return 0;
        },
        getStateFromPercentage: function (percentage) {
            if (percentage)
                return 1;
            else
                return 0;
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("buttonStateInPort(\"" + sensor.name + "\")", function (retVal) {
                var intVal = parseInt(retVal, 10);
                callback(intVal != 0);
            });
        },
    },
    {
        name: "stick",
        description: "5 way button",
        isAnalog: false,
        isSensor: true,
        portType: "D",
        valueType: "boolean",
        selectorImages: ["stick.png"],
        gpiosNames: ["Up", "Down", "Left", "Right", "Center"],
        gpios: [10, 9, 11, 8, 7],
        getPercentageFromState: function (state) {
            if (state)
                return 1;
            else
                return 0;
        },
        getStateFromPercentage: function (percentage) {
            if (percentage)
                return 1;
            else
                return 0;
        },
        compareState: function (state1, state2) {
            if (state1 == null && state2 == null)
                return true;

            return state1[0] == state2[0] &&
                    state1[1] == state2[1] &&
                    state1[2] == state2[2] &&
                    state1[3] == state2[3] &&
                    state1[4] == state2[4];
        },
        getLiveState: function (sensor, callback) {
            var cmd = "readStick(" + this.gpios.join() + ")";

            context.quickPiConnection.sendCommand("readStick(" + this.gpios.join() + ")", function (retVal) {
                var array = JSON.parse(retVal);
                callback(array);
            });
        },
        getButtonState: function(buttonname, state) {
            if (state) {
                var buttonparts = buttonname.split(" ");
                var actualbuttonmame = buttonname;
                if (buttonparts.length == 2) {
                    actualbuttonmame = buttonparts[1];
                }

                var index = this.gpiosNames.indexOf(actualbuttonmame);

                if (index >= 0) {
                    return state[index];
                }
            }

            return false;
        }
    },
    {
        name: "temperature",
        description: "Temperature sensor",
        isAnalog: true,
        isSensor: true,
        portType: "A",
        valueType: "number",
        valueMin: 0,
        valueMax: 60,
        selectorImages: ["temperature-hot.png", "temperature-overlay.png"],
        getPercentageFromState: function (state) {
            return state / 60;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 60);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readTemperature(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
        subTypes: [{
            subType: "groveanalog",
            description: "Grove Analog tempeature sensor",
            portType: "A",
            pluggable: true,
        },
        {
            subType: "BMI160",
            description: "Quick Pi Accelerometer+Gyroscope temperature sensor",
            portType: "i2c",
        },
        {
            subType: "DHT11",
            description: "DHT11 Tempeature Sensor",
            portType: "D",
            pluggable: true,
        }],
    },
    {
        name: "potentiometer",
        description: "Potentiometer",
        isAnalog: true,
        isSensor: true,
        portType: "A",
        valueType: "number",
        pluggable: true,
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["potentiometer.png", "potentiometer-pale.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readRotaryAngle(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
    },
    {
        name: "light",
        description: "Light sensor",
        isAnalog: true,
        isSensor: true,
        portType: "A",
        valueType: "number",
        pluggable: true,
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["light.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readLightIntensity(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
    },
    {
        name: "range",
        description: "Capteur de distance",
        isAnalog: true,
        isSensor: true,
        portType: "D",
        valueType: "number",
        valueMin: 0,
        valueMax: 5000,
        selectorImages: ["range.png"],
        getPercentageFromState: function (state) {
            return state / 500;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 500);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readDistance(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
        subTypes: [{
            subType: "vl53l0x",
            description: "Time of flight distance sensor",
            portType: "i2c",
        },
        {
            subType: "ultrasonic",
            description: "Capteur de distance à ultrason",
            portType: "D",
            pluggable: true,
        }],

    },
    {
        name: "humidity",
        description: "Humidity sensor",
        isAnalog: true,
        isSensor: true,
        portType: "D",
        valueType: "number",
        pluggable: true,
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["humidity.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readHumidity(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
    },
    {
        name: "sound",
        description: "Sound sensor",
        isAnalog: true,
        isSensor: true,
        portType: "A",
        valueType: "number",
        pluggable: true,
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["sound.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readSoundLevel(\"" + sensor.name + "\")", function(val) {
                val = Math.round(val);
                callback(val);
            });
        },
    },
    {
        name: "accelerometer",
        description: "Accelerometer sensor (BMI160)",
        isAnalog: true,
        isSensor: true,
        portType: "i2c",
        valueType: "object",
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["accel.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readAccelBMI160()", function(val) {
                var array = JSON.parse(val);
                callback(array);
            });
        },
    },
    {
        name: "gyroscope",
        description: "Gyropscope sensor (BMI160)",
        isAnalog: true,
        isSensor: true,
        portType: "i2c",
        valueType: "object",
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["gyro.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readGyroBMI160()", function(val) {

                var array = JSON.parse(val);
                array[0] = Math.round(array[0]);
                array[1] = Math.round(array[1]);
                array[2] = Math.round(array[2]);
                callback(array);
            });
        },
    },
    {
        name: "magnetometer",
        description: "Magnetometer sensor (LSM303C)",
        isAnalog: true,
        isSensor: true,
        portType: "i2c",
        valueType: "object",
        valueMin: 0,
        valueMax: 100,
        selectorImages: ["mag.png"],
        getPercentageFromState: function (state) {
            return state / 100;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 100);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("readMagnetometerLSM303C(False)", function(val) {

                var array = JSON.parse(val);

                array[0] = Math.round(array[0]);
                array[1] = Math.round(array[1]);
                array[2] = Math.round(array[2]);

                callback(array);
            });
        },
    },
    {
        name: "irrecv",
        description: "IR Receiver",
        isAnalog: true,
        isSensor: true,
        portType: "D",
        valueType: "number",
        valueMin: 0,
        valueMax: 60,
        selectorImages: ["irrecvon.png"],
        getPercentageFromState: function (state) {
            return state / 60;
        },
        getStateFromPercentage: function (percentage) {
            return Math.round(percentage * 60);
        },
        compareState: function (state1, state2) {
            return state1 == state2;
        },
        getLiveState: function (sensor, callback) {
            context.quickPiConnection.sendCommand("buttonStateInPort(\"" + sensor.name + "\")", function (retVal) {
                var intVal = parseInt(retVal, 10);
                callback(intVal == 0);
            });
        },
    },
];


function findSensorDefinition(sensor) {
    for (var iType = 0; iType < sensorDefinitions.length; iType++) {
        var type = sensorDefinitions[iType];

        if (sensor.type == type.name) {
            if (sensor.subType && type.subTypes) {

                for (var iSubType = 0; iSubType < type.subTypes.length; iSubType++) {
                    var subType = type.subTypes[iSubType];

                    if (subType.subType == sensor.subType) {
                        return $.extend({}, type, subType);
                    }              
                }
            } else {
                return type;
            }
        }
    }

    return null;
}

function getCurrentBoard() {
    var found = boardDefinitions.find(function (element) {
        if (context.board == element.name)
            return element;
    });

    return found;
}

