import React, { Component } from 'react';

import './SearchPanel.css';

export default class SerchPanel extends Component {
    state = {
        term: '',
    };

    setTerm = (e) => {
        const term = e.target.value;

        this.setState({ term });

        return this.props.onItemSearch(term);
    };

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={this.state.term}
                onInput={(e) => this.setTerm(e)}
            />
        );
    }
}
