import React from 'react';
import './styles/PlayerScore.css';

class PlayerScore extends React.Component {
    render() {
        return (
            <div
                className={`score-container ${
                    this.props.isMain ? 'sc--absolute' : ''
                }`}
            >
                <h3 className='score-label'>{this.props.label}</h3>
                <div className='score-count'>{this.props.score}</div>
            </div>
        );
    }
}

export default PlayerScore;
