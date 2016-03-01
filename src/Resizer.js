'use strict';

import React from 'react';


export default React.createClass({

    onMouseDown(event) {
        this.props.onMouseDown(event);
    },

    render() {
        const split = this.props.split;
        const classes = ['Resizer', this.props.className, split];
        return (<span className={classes.join(' ')} onMouseDown={this.onMouseDown} />);
    }
});


