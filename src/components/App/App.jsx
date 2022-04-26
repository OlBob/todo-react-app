import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';

import './App.css';

export default class App extends Component {
    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
        ],
        term: '',
    };

    createTodoItem(label) {
        return {
            done: false,
            label: label,
            important: false,
            id: this.maxId++,
        };
    }

    getIndex(arr, id) {
        return arr.findIndex((el) => el.id === id);
    }

    deleteItem = (id) => {
        // console.log(id);

        this.setState(({ todoData }) => {
            // debugger;
            const idx = this.getIndex(todoData, id);
            const _todoData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1),
            ];

            return {
                todoData: _todoData,
            };
        });
    };

    addItem = (text) => {
        this.setState(({ todoData }) => {
            let _todoData = [...todoData, this.createTodoItem(text)];

            return {
                todoData: _todoData,
            };
        });
    };

    toggleProperty(arr, id, property) {
        const idx = this.getIndex(arr, id);
        const oldItem = arr[idx];

        const _todoData = [
            ...arr.slice(0, idx),
            { ...oldItem, [property]: !oldItem[property] },
            ...arr.slice(idx + 1),
        ];

        return _todoData;
    }

    onToggleImportant = (id) => {
        // debugger;
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important'),
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done'),
            };
        });
    };

    onItemSearch = (term) => {
        this.setState({ term });
    };

    search = (arr, param) => {
        if (param.length === 0) return arr;

        return arr.filter((item) => {
            return item.label.toLowerCase().indexOf(param.toLowerCase()) > -1;
        });
    };

    render() {
        const { todoData, term } = this.state,
            doneCount = todoData.filter((item) => item.done).length,
            todoCount = todoData.length - doneCount,
            filteredData = this.search(todoData, term);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onItemSearch={this.onItemSearch} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={filteredData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={(text) => this.addItem(text)} />
            </div>
        );
    }
}
