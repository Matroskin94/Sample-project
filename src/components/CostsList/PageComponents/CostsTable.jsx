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

import { noop } from '../../../utils/common';

import CONVERTION from '../../../constants/exchangeRates';
import CURRENCY from '../../../constants/currency';
import COSTS_COLUMNS from '../../../constants/tableColumns';

import './styles/tableStyles.css';

class CostsTable extends Component {
	static propTypes = {
        costsArray: PropTypes.array,
        onRowFocus: PropTypes.func,
    };

    static defaultProps = {
        costsArray: [],
        onRowFocus: noop
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

    handleRowFocus = item => () => {
        const { onRowFocus } = this.props;

        onRowFocus(item);
    }

    handleRowBlur = item => () => {
        const { onRowBlur } = this.props;

        onRowBlur(item);
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
			<TableRow
                onBlur={this.handleRowBlur(item)}
                onFocus={this.handleRowFocus(item)}
                key={item.id}
            >
				<TableCell>{item.name}</TableCell>
				<TableCell>{item.cost}</TableCell>
				<TableCell>{item.currency}</TableCell>
				<TableCell>{item.date}</TableCell>
				<TableCell>{item.costType}</TableCell>
			</TableRow>
		));
	}

	render() {

		return (
			<Table>
				<TableHead>
					{this.renderColumns()}
				</TableHead>
				<TableBody className='tableStyle'>
					{this.renderRows()}
				</TableBody>
			</Table>
		);
	}
}

export default CostsTable;
