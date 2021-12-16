import React from 'react';

class PlayerComponent extends React.Component {
    render() {
        return (
            <div className='score-container'>
                <h4 className='score-label'>{this.props.label}</h4>
                <div className='score-count'>{this.props.score}</div>
            </div>
        );
    }
}

export default PlayerComponent;
