'use strict';

import React from 'react';
import VendorPrefix from 'react-vendor-prefix';


export default React.createClass({


    getInitialState() {
        return {style: {}};
    },

    render() {
        const split = this.props.split;
        const classes = ['Pane', this.props.className, split];
        const otherHide = this.props.otherHide;
        let style = {};
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

        const prefixed = VendorPrefix.prefix({styles: style});

        return (<div className={classes.join(' ')} style={prefixed.styles}>{this.props.children}</div>);
    }
});


