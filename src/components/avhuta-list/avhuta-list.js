import React from 'react';
import AvhutaListItem from '../avhuta-list-item';
import './avhuta-list.css';

const AvhutaList = ({ avhutas, onDeleted,
                      onToggleImportant,
                      onToggleDone }) => {

    const elements = avhutas.map((item) => {
        const { id, ...itemProps } = item;

        return (
            <li key={id} className="list-group-item">
                <AvhutaListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)} />
            </li>
        );
    });

    return (
        <ul className = "list-group avhuta-list">
            {elements}
        </ul>
    );
};

export default AvhutaList;