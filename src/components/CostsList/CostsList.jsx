import React, { Component } from 'react';

import CostsTable from './PageComponents/CostsTable.jsx';
import CostsForm from './PageComponents/CostsForm.jsx';

class CostsLists extends Component {
	state = {
		costsArray: []
	}

	handleAddCost = cost => {
		this.setState(prevState => ({
			costsArray: prevState.costsArray.concat(cost)
		}));
	}

	render() {
		const { costsArray } = this.state;

		return (
			<div>
				<CostsTable costsArray={costsArray} />
				<CostsForm onAddCost={this.handleAddCost} />
			</div>
		);
	}
}

export default CostsLists;
