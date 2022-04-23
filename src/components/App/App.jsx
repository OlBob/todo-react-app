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

    render() {
        const { todoData } = this.state,
            doneCount = todoData.filter((item) => item.done).length,
            todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={(text) => this.addItem(text)} />
            </div>
        );
    }
}
