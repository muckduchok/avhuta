import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import AvhutaList from '../avhuta-list';
import ItemStatusFilter from '../item-status-filter';
import InputPanel from '../input-panel';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        avhutaDate: [
            this.createAvhutaItem('Drink Cofee'),
            this.createAvhutaItem('I like make app'),
            this.createAvhutaItem('Go to pee') ],
        term: '',
        filter: 'all' //active, all, done
    };

    createAvhutaItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ avhutaDate }) => {
            const idx = avhutaDate.findIndex((el) => el.id === id);

            const newArray = [
                ...avhutaDate.slice(0, idx),
                ...avhutaDate.slice(idx + 1)
            ];

            return {
                avhutaDate: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createAvhutaItem(text);
        // add element in array
        this.setState(({ avhutaDate }) => {

            const NewArr = [
                ...avhutaDate,
                newItem
            ];
            return {
                avhutaDate: NewArr
            };
});
    };

    toggleProperty(arr, id, propName) {
            const idx = arr.findIndex((el) => el.id === id);

            const oldItem = arr[idx];
            const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]};

           return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];
    };

    onToggleDone = (id) => {
        this.setState(({ avhutaDate }) => {
            return {
                avhutaDate: this.toggleProperty(avhutaDate, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ avhutaDate }) => {
            return {
                avhutaDate: this.toggleProperty(avhutaDate, id, 'important')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        };
    };

    render() {

        const { avhutaDate, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(avhutaDate, term), filter);

        const doneCount = avhutaDate
            .filter((el) => el.done).length;
        const todoCount = avhutaDate.length - doneCount;

        return (
            <div className="avhuta-app">
                <AppHeader avhUta={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>

                <AvhutaList
                    avhutas={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />

                <InputPanel onInputAdd={this.addItem} />
            </div>
        );
    }
};