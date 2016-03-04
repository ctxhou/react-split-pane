'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Pane = require('./Pane');

var _Pane2 = _interopRequireDefault(_Pane);

var _Resizer = require('./Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
    displayName: 'SplitPane',
    getInitialState: function getInitialState() {
        return {
            active: false,
            resized: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            split: 'vertical',
            minSize: 0
        };
    },
    componentDidMount: function componentDidMount() {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        var ref = this.refs.leftPane;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.updateLeftSize(nextProps.defaultSize);
    },
    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    },
    onMouseDown: function onMouseDown(event) {
        this.unFocus();
        var position = this.props.split === 'vertical' ? event.clientX : event.clientY;
        this.setState({
            active: true,
            position: position
        });
    },
    onMouseMove: function onMouseMove(event) {
        var position = this.state.position;
        if (this.state.active) {
            this.unFocus();
            var leftRef = this.refs.leftPane;
            var rightRef = this.refs.rightPane;
            if (leftRef) {
                var leftNode = _reactDom2.default.findDOMNode(leftRef);
                if (leftNode.getBoundingClientRect) {
                    var width = leftNode.getBoundingClientRect().width;
                    var height = leftNode.getBoundingClientRect().height;
                    var current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                    var size = this.props.split === 'vertical' ? width : height;

                    var leftSize = size - (position - current);
                    this.setState({
                        position: current,
                        resized: true
                    });

                    if (rightRef) {
                        var rightNode = _reactDom2.default.findDOMNode(rightRef);
                        var _width = rightNode.getBoundingClientRect().width;
                        var _height = rightNode.getBoundingClientRect().height;
                        var _current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                        var _size = this.props.split === 'vertical' ? _width : _height;
                        var rightPaneSize = _size + (position - _current);
                        if (rightPaneSize >= this.props.minSize && leftSize >= this.props.minSize) {
                            this.updateLeftSize(leftSize);
                        }
                        if (rightPaneSize < this.props.minSize) {
                            var gap = this.props.minSize - rightPaneSize;
                            var _leftSize = this.refs.leftPane.state.size;
                            this.updateLeftSize(_leftSize - gap);
                        }
                    } else if (leftSize >= this.props.minSize) {
                        this.updateLeftSize(leftSize);
                    }
                }
            }
        }
    },
    updateLeftSize: function updateLeftSize(newSize) {
        if (this.props.onChange) {
            this.props.onChange(newSize);
        }
        this.refs.leftPane.setState({
            size: newSize
        });
    },
    onMouseUp: function onMouseUp() {
        if (this.state.active) {
            if (this.props.onDragFinished) {
                this.props.onDragFinished();
            }
            this.setState({
                active: false
            });
        }
    },
    unFocus: function unFocus() {
        if (document.selection) {
            document.selection.empty();
        } else {
            window.getSelection().removeAllRanges();
        }
    },


    merge: function merge(into, obj) {
        for (var attr in obj) {
            into[attr] = obj[attr];
        }
    },

    render: function render() {
        var _props = this.props;
        var split = _props.split;
        var onlyLeft = _props.onlyLeft;
        var onlyRight = _props.onlyRight;
        var rightClassName = _props.rightClassName;
        var leftClassName = _props.leftClassName;

        var leftPaneClass = (0, _classnames2.default)(leftClassName, { displayNone: onlyRight });
        var resizerClass = (0, _classnames2.default)({ displayNone: onlyRight || onlyLeft });
        var rightPaneClass = (0, _classnames2.default)(rightClassName, { displayNone: onlyLeft });

        var children = this.props.children;
        var classes = ['Panel-wrapper', split];

        return _react2.default.createElement(
            'div',
            { className: classes.join(' '), ref: 'splitPane' },
            _react2.default.createElement(
                _Pane2.default,
                { ref: 'leftPane',
                    key: 'leftPane',
                    split: split,
                    className: leftPaneClass,
                    otherHide: onlyLeft },
                children[0]
            ),
            _react2.default.createElement(_Resizer2.default, { className: resizerClass,
                ref: 'resizer',
                key: 'resizer',
                onMouseDown: this.onMouseDown,
                split: split }),
            _react2.default.createElement(
                _Pane2.default,
                { ref: 'rightPane',
                    key: 'rightPane',
                    split: split,
                    className: rightPaneClass,
                    otherHide: onlyRight },
                children[1]
            )
        );
    }
});
module.exports = exports['default'];