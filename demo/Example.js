import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from '../lib/SplitPane';


var Example = React.createClass({
    
    getInitialState: function() {
        return {
            hide: false
        }
    },

    toggle: function() {
        this.setState({hide: !this.state.hide})
    },

    render: function() {
        return (
            <SplitPane split="vertical" minSize="50" defaultSize="100" onlyLeft={this.state.hide}>
                <div>Left
                <button onClick={this.toggle}>toggle</button>
                </div>
                <div>Right</div>
            </SplitPane>
        );
    }

});


ReactDOM.render(<Example />, document.getElementById("container"));