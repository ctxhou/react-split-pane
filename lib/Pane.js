'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVendorPrefix = require('react-vendor-prefix');

var _reactVendorPrefix2 = _interopRequireDefault(_reactVendorPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'Pane',
    getInitialState: function getInitialState() {
        return { style: {} };
    },
    render: function render() {
        var split = this.props.split;
        var classes = ['Pane', this.props.className, split];
        var otherHide = this.props.otherHide;
        var style = {};
        if (this.state.size) {
            if (split === 'vertical') {
                style.width = this.state.size;
            } else {
                style.height = this.state.size;
                style.display = 'flex';
            }
            style.flex = 'none';
        }

        if (otherHide) {
            style.width = '100%';
        }

        var prefixed = _reactVendorPrefix2.default.prefix({ styles: style });

        return _react2.default.createElement(
            'div',
            { className: classes.join(' '), style: prefixed.styles },
            this.props.children
        );
    }
});
module.exports = exports['default'];