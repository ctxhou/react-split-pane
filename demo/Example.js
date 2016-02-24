import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from '../lib/SplitPane';


var Example = React.createClass({

    render: function() {
        return (
            <SplitPane split="vertical" minSize="50" defaultSize="100">
                <div></div>
                <div></div>
            </SplitPane>
        );
    }

});


ReactDOM.render(<Example />, document.getElementById("container"));