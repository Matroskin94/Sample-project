import React, { Component } from 'react';

import { Panel, PanelHeader } from 'ufs-ui';

import CostsTable from './PageComponents/CostsTable.jsx';
import CostsForm from './PageComponents/CostsForm.jsx';

import './styles.css';

class CostsLists extends Component {
	state = {
		blurTimer: 0,
		costsArray: [],
		activeRow: {},
		isDeleteDisabled: true
	}

	handleAddCost = cost => {
		this.setState(prevState => ({
			costsArray: prevState.costsArray.concat(cost)
		}));
	}

	handleRowFocus = item => {
		const { blurTimer } = this.state;

		this.setState({
			isDeleteDisabled: false,
			activeRow: item
		});

		if (blurTimer) {
			clearTimeout(blurTimer);
		}
	}

	handleRowBlur = () => {
		const blurTimer = setTimeout(() => {
			this.setState({
				isDeleteDisabled: true,
				activeRow: {}
			});
		}, 100);

		this.setState({ blurTimer });
	}

	handleDeleteCost = () => {
		const { costsArray, activeRow } = this.state;
		const correctedArray = costsArray.filter(item => item.id !== activeRow.id);

		this.setState({
			costsArray: correctedArray
		});
	}

	render() {
		const { costsArray, isDeleteDisabled } = this.state;

		return (
			<Panel block className='marginZero'>
				<PanelHeader>
					<h1 className='marginZero'>Таблица расходов</h1>
				</PanelHeader>
				<CostsTable
					costsArray={costsArray}
					onRowFocus={this.handleRowFocus}
					onRowBlur={this.handleRowBlur}
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
