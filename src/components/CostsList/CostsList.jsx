import React, { Component } from 'react';

import { Panel, PanelHeader } from 'ufs-ui';

import CostsTable from './PageComponents/CostsTable.jsx';
import CostsForm from './PageComponents/CostsForm.jsx';

import './styles.css';

class CostsLists extends Component {
	state = {
		activeRows: [],
		costsArray: [],
		isDeleteDisabled: true
	}

	handleAddCost = cost => {
		this.setState(prevState => ({
			costsArray: prevState.costsArray.concat(cost)
		}));
	}

	handleDeleteCost = () => {
		const { costsArray, activeRows } = this.state;
		const correctedArray = costsArray.filter(item => !activeRows.includes(item.id));

		this.setState({
			isDeleteDisabled: true,
			costsArray: correctedArray
		});
	}

	toggleRow = rowId => {
        const { activeRows } = this.state;
        const result = activeRows.slice();

        if(activeRows.includes(rowId)) {
            const index = activeRows.indexOf(rowId);

            result.splice(index, 1);
        } else {
            result.push(rowId);
        }

        this.setState({
        	activeRows: result,
        	isDeleteDisabled: result.length === 0
        });
    }

	handleCheckClick = itemId => {
		this.toggleRow(itemId);
	}

	render() {
		const { costsArray, isDeleteDisabled, activeRows } = this.state;

		return (
			<Panel block className='marginZero'>
				<PanelHeader>
					<h1 className='marginZero'>Таблица расходов</h1>
				</PanelHeader>
				<CostsTable
					activeRows={activeRows}
					costsArray={costsArray}
					onCheckClick={this.handleCheckClick}
				/>
				<CostsForm
					onAddCost={this.handleAddCost}
					onDeleteCost={this.handleDeleteCost}
					isDeleteDisabled={isDeleteDisabled}
				/>
			</Panel>
		);
	}
}

export default CostsLists;
