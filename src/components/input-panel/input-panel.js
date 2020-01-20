import React, { Component } from 'react';
import './input-panel.css';

export default class InputPanel extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onInputAdd(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (

            <form className="input-panel d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="Type to add your task"
                    value={this.state.label} />

                <button
                    className="btn btn-outline-secondary">Add
            </button>

            </form>
        );
    };
};