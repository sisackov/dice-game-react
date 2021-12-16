import React from 'react';

class InputText extends React.Component {
    state = { term: '' };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <form className='search-form' onSubmit={this.onFormSubmit}>
                <div className='field'>
                    <input
                        type='text'
                        value={this.state.term}
                        onChange={(e) =>
                            this.setState({ term: e.target.value })
                        }
                        placeholder='Search for events...'
                    />
                </div>
            </form>
        );
    }
}

export default InputText;
