import React from 'react';

class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            isError: false,
        };

        this.inputRef = React.createRef();
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        if (this.props.inputValidator(this.state.term)) {
            this.props.parentSubmitHandler(this.state.term);
        } else {
            this.inputRef.current.style.borderColor = 'red';
        }
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className='field'>
                    <input
                        ref={this.inputRef}
                        type='text'
                        value={this.state.term}
                        onChange={(e) =>
                            this.setState({ term: e.target.value })
                        }
                        placeholder={this.props.label}
                    />
                </div>
            </form>
        );
    }
}

export default InputText;
