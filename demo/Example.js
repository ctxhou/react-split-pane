import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from '../lib/SplitPane';


var Example = React.createClass({
    
    getInitialState: function() {
        return {
            hide: false,
            defaultSize: 100
        }
    },

    didMount: function() {
        console.log('finish')
    },

    toggle: function() {
        this.setState({hide: !this.state.hide})
    },

    width: function() {
        this.setState({defaultSize: 1900})
    },

    render: function() {
        return (
            <SplitPane split="vertical" 
                       minSize="500" 
                       defaultSize={this.state.defaultSize} 
                       onlyLeft={this.state.hide}
                       rightClassName='right'
                       leftClassName='left'
                       didMount={this.didMount}>
                <div>Left
                <button onClick={this.toggle}>toggle</button>
                <button onClick={this.width}>width</button>
                </div>
                <div>Right</div>
            </SplitPane>
        );
    }

});


ReactDOM.render(<Example />, document.getElementById("container"));