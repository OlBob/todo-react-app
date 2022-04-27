import React, { Component } from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {
    buttons = [
        {
            label: 'All',
            name: 'All',
        },
        {
            label: 'Active',
            name: 'Active',
        },
        {
            label: 'Done',
            name: 'Done',
        },
    ];

    updateFilter = (filter) => this.props.setFilter(filter);

    render() {
        const btns = this.buttons.map(({ name, label }) => {
            const clazz =
                this.props.filter === label
                    ? 'btn-info'
                    : 'btn-outline-secondary';

            return (
                <button
                    key={label}
                    type="button"
                    className={`btn ${clazz}`}
                    onClick={(e) => this.updateFilter(name)}>
                    {name}
                </button>
            );
        });

        return <div className="btn-group">{btns}</div>;
    }
}
