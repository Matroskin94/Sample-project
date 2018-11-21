import React, { Component, PropTypes } from 'react';

import {
	Table,
	TableHead,
	TableColumn,
	TableRow,
	TableCell,
	TableBody,
	SortOrder
} from 'ufs-ui';

import CONVERTION from '../../../constants/exchangeRates';
import CURRENCY from '../../../constants/currency';
import COSTS_COLUMNS from '../../../constants/tableColumns';

const TABLE_STYLE = {
	height: '185px',
    overflowY: 'auto'
};

class CostsTable extends Component {
	static propTypes = {
        costsArray: PropTypes.array
    };

    static defaultProps = {
        costsArray: []
    };

    state = {
        sortedBy: undefined,
        sortOrder: 1
    }

    sortTable = (data) => {
        if (this.state.sortedBy === undefined) {
            return data;
        }

        return data.sort((prevRow, nextRow) => {
                const isAsc = this.state.sortOrder === SortOrder.ASC;
                const { sortedBy } = this.state;
                let prevConverted = prevRow[sortedBy];
                let nextConverted = nextRow[sortedBy];

                if (sortedBy === 'cost') {
                	prevConverted = Number(prevRow[sortedBy]);
                	nextConverted = Number(nextRow[sortedBy]);

                	if (prevRow.currency !== CURRENCY.RU.title) {
                		prevConverted = prevConverted * CONVERTION.BY_RU;
                	}

                	if (nextRow.currency !== CURRENCY.RU.title) {
                		nextConverted = nextConverted * CONVERTION.BY_RU;
                	}
                } else if (sortedBy === 'date') {
                	prevConverted = new Date(prevRow[sortedBy]);
                	nextConverted = new Date(nextRow[sortedBy]);
                }

                if (prevConverted < nextConverted) {
                    return isAsc ? -1 : 1;
                } else if (prevConverted > nextConverted) {
                    return isAsc ? 1 : -1;
                } else {
                    return 0;
                }
            });
    }

    onColumnClick = (name: string) => () => {
        let sortedBy = this.state.sortedBy;
        let sortOrder = this.state.sortOrder;

        if (name !== sortedBy || sortOrder === undefined) {
            sortedBy = name;
            sortOrder = SortOrder.ASC;
        } else if (sortOrder === SortOrder.ASC) {
            sortOrder = SortOrder.DESC;
        } else {
            sortedBy = undefined;
            sortOrder = undefined;
        }

        this.setState({ sortedBy, sortOrder });
    }

	renderColumns = () => {
		return COSTS_COLUMNS.map(item => (
			<TableColumn
				key={item.key}
				sortable
				sortOrder={this.state.sortedBy === item.key ? this.state.sortOrder : undefined}
				onClick={this.onColumnClick(item.key)}
			>
                {item.title}
            </TableColumn>
		));
	}

	renderRows = () => {
		const { costsArray } = this.props;
		const sortedArray = this.sortTable(costsArray.slice());

		return sortedArray.map(item => (
			<TableRow key={item.id}>
				<TableCell key='name'>{item.name}</TableCell>
				<TableCell key='cost'>{item.cost}</TableCell>
				<TableCell key='currency'>{item.currency}</TableCell>
				<TableCell key='date'>{item.date}</TableCell>
				<TableCell key='costType'>{item.costType}</TableCell>
			</TableRow>
		));
	}

	render() {

		return (
			<Table>
				<TableHead>
					{this.renderColumns()}
				</TableHead>
				<TableBody style={TABLE_STYLE}>
					{this.renderRows()}
				</TableBody>
			</Table>
		);
	}
}

export default CostsTable;
