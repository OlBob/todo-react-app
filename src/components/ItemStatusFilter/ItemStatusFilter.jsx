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
        const btns = this.buttons.map((btn) => {
            const clazz =
                this.props.filter === btn.label
                    ? 'btn-info'
                    : 'btn-outline-secondary';

            return (
                <button
                    key={btn.label}
                    type="button"
                    className={`btn ${clazz}`}
                    value={btn.label}
                    onClick={(e) => this.updateFilter(e.currentTarget.value)}>
                    {btn.name}
                </button>
            );
        });

        return <div className="btn-group">{btns}</div>;
    }
}
