import React, { Component } from 'react';

import CostsTable from './PageComponents/CostsTable.jsx';
import CostsForm from './PageComponents/CostsForm.jsx';

const costsData = [{
	id: 1,
	name: 'Белет до Питера',
	cost: '28',
	currency: 'Белорусский рубль',
	date: '2018-11-20',
	costType: 'Транспортные рассходы'
},{
	id: 2,
	name: 'Еда Еда Еда',
	cost: '50',
	currency: 'Российский рубль',
	date: '2018-11-21',
	costType: 'Продукты'
},{
	id: 3,
	name: 'Штаны',
	cost: '50',
	currency: 'Белорусский рубль',
	date: '2018-11-21',
	costType: 'Одежда'
},{
	id: 4,
	name: 'Зубная паста',
	cost: '2.15',
	currency: 'Белорусский рубль',
	date: '2018-11-19',
	costType: 'Прочее'
}];

class CostsLists extends Component {

	render() {
		return (
			<div>
				<CostsTable costsArray={costsData} />
				<CostsForm />
			</div>
		);
	}
}

export default CostsLists;
