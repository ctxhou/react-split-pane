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
        const ref = this.refs.pane1;
        if (ref && this.props.defaultSize && !this.state.resized) {
            ref.setState({
                size: this.props.defaultSize
            });
        }
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
        if (this.state.active) {
            this.unFocus();
            const ref1 = this.refs.pane1;
            const ref2 = this.refs.pane2;
            if (ref1) {
                const node = ReactDOM.findDOMNode(ref1);
                if (node.getBoundingClientRect) {
                    const width = node.getBoundingClientRect().width;
                    const height = node.getBoundingClientRect().height;
                    const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                    const size = this.props.split === 'vertical' ? width : height;
                    const position = this.state.position;

                    const newSize = size - (position - current);
                    this.setState({
                        position: current,
                        resized: true
                    });

                    if (ref2) {
                        const node = ReactDOM.findDOMNode(ref2);
                        const width = node.getBoundingClientRect().width;
                        const height = node.getBoundingClientRect().height;
                        const current = this.props.split === 'vertical' ? event.clientX : event.clientY;
                        const size = this.props.split === 'vertical' ? width : height;
                        const pane2Size = size + (position - current);
                        if (pane2Size >= this.props.minSize && newSize >= this.props.minSize) {
                            this.updateNewSize(newSize);
                        } else if (pane2Size < this.props.minSize) {
                            this.refs.panel2.setState({size: this.props.minSize})
                        }
                    } else if (newSize >= this.props.minSize) {
                        this.updateNewSize(newSize);
                    }
                }
            }
        }
    },

    updateNewSize(newSize) {
        if (this.props.onChange) {
          this.props.onChange(newSize);
        }
        this.refs.pane1.setState({
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

        const split = this.props.split;
        const onlyLeft = this.props.onlyLeft;
        const onlyRight = this.props.onlyRight;
        const leftPaneClass = cx({displayNone: onlyRight});
        const resizerClass = cx({displayNone: onlyRight || onlyLeft});
        const rightPaneClass = cx({displayNone: onlyLeft});

        const children = this.props.children;
        const classes = ['Panel-wrapper', split];
        
        return (
            <div className={classes.join(' ')} ref="splitPane">
                <Pane ref="pane1" 
                      key="pane1" 
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
                <Pane ref="pane2" 
                      key="pane2" 
                      split={split} 
                      className={rightPaneClass}
                      otherHide={onlyRight}>
                    {children[1]}
                </Pane>
            </div>
        );
    }
});
