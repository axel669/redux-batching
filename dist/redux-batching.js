'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var gen = function gen(store) {
    var action = function action(type) {
        var constructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
            return {};
        };
        var dispatches = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var method = function method() {
            var obj = _extends({
                type: type
            }, constructor.apply(undefined, arguments));
            return obj;
        };
        if (dispatches === true) {
            method.dispatch = function () {
                store.dispatch(method.apply(undefined, arguments));
            };
        }
        return method;
    };
    var batch = action('batch', function () {
        for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
            actions[_key] = arguments[_key];
        }

        return {
            actions: actions
        };
    });

    return { action: action, batch: batch };
};

var batchReducer = function batchReducer(func) {
    return function (state, action) {
        if (action.type === 'batch') {
            return action.actions.reduce(function (state, action) {
                return func(state, action);
            }, state);
        }
        return func(state, action);
    };
};

exports.batchReducer = batchReducer;
exports.gen = gen;