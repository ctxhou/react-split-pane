'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Pane from './Pane';
import Resizer from './Resizer';
import cx from 'classnames';

export default React.createClass({

    getInitialState() {
        return {
            active: false,
            resized: false
        };
    },


    getDefaultProps() {
        return {
            split: 'vertical',
            minSize: 0
        };
    },


    componentDidMount() {
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousemove', this.onMouseMove);
        const ref = this.refs.leftPane;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
    },

    componentWillReceiveProps(nextProps) {
        this.updateLeftSize(nextProps.defaultSize);
    },


    componentWillUnmount() {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMove);
    },


    onMouseDown(event) {
        this.unFocus();
        let position = this.props.split === 'vertical' ? event.clientX : event.clientY;
        this.setState({
            active: true,
            position: position
        });
    },


    onMouseMove(event) {
        const position = this.state.position;
        if (this.state.active) {
            this.unFocus();
            const leftRef = this.refs.leftPane;
            const rightRef = this.refs.rightPane;
            if (leftRef) {
                const leftNode = ReactDOM.findDOMNode(leftRef);
                if (leftNode.getBoundingClientRect) {
                    const width = leftNode.getBoundingClientRect().width;
                    const height = leftNode.getBoundingClientRect().height;
                    const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                    const size = this.props.split === 'vertical' ? width : height;

                    const leftSize = size - (position - current);
                    this.setState({
                        position: current,
                        resized: true
                    });

                    if (rightRef) {
                        const rightNode = ReactDOM.findDOMNode(rightRef);
                        const width = rightNode.getBoundingClientRect().width;
                        const height = rightNode.getBoundingClientRect().height;
                        const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                        const size = this.props.split === 'vertical' ? width : height;
                        const rightPaneSize = size + (position - current);
                        if (rightPaneSize >= this.props.minSize && leftSize >= this.props.minSize) {
                            this.updateLeftSizeAndTriggerChange(leftSize);
                        }
                        if (rightPaneSize < this.props.minSize) {
                            const gap = this.props.minSize - rightPaneSize;
                            const leftSize = this.refs.leftPane.state.size;
                            this.updateLeftSizeAndTriggerChange(leftSize - gap)
                        }
                    } else if (leftSize >= this.props.minSize) {
                        this.updateLeftSizeAndTriggerChange(leftSize);
                    }
                }
            }
            
        }
    },

    updateLeftSizeAndTriggerChange(newSize) {
        if (this.props.onChange) {
          this.props.onChange(newSize);
        }
        this.updateLeftSize(newSize)
    },

    updateLeftSize(newSize) {
        this.refs.leftPane.setState({
            size: newSize
        });
    },

    onMouseUp() {
        if (this.state.active) {
            if (this.props.onDragFinished) {
                this.props.onDragFinished();
            }
            this.setState({
                active: false
            });
        }
    },


    unFocus() {
        if (document.selection) {
            document.selection.empty();
        } else {
            window.getSelection().removeAllRanges()
        }
    },


    merge: function (into, obj) {
        for (let attr in obj) {
            into[attr] = obj[attr];
        }
    },


    render() {
        const {
            split,
            onlyLeft,
            onlyRight,
            rightClassName,
            leftClassName
        } = this.props;
        const leftPaneClass = cx(leftClassName, {displayNone: onlyRight});
        const resizerClass = cx({displayNone: onlyRight || onlyLeft});
        const rightPaneClass = cx(rightClassName, {displayNone: onlyLeft});

        const children = this.props.children;
        const classes = ['Panel-wrapper', split];
        
        return (
            <div className={classes.join(' ')} ref="splitPane">
                <Pane ref="leftPane" 
                      key="leftPane" 
                      split={split} 
                      className={leftPaneClass}
                      otherHide={onlyLeft}>
                    {children[0]}
                </Pane>
                <Resizer className={resizerClass}
                         ref="resizer" 
                         key="resizer" 
                         onMouseDown={this.onMouseDown} 
                         split={split} /> 
                <Pane ref="rightPane" 
                      key="rightPane" 
                      split={split} 
                      className={rightPaneClass}
                      otherHide={onlyRight}>
                    {children[1]}
                </Pane>
            </div>
        );
    }
});
