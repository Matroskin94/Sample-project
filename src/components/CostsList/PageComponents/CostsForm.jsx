import React, { Component, PropTypes } from 'react';

import {
	TextInput,
	NumberInput,
	DateInput,
	RadioGroup,
    RadioButton,
    Select,
    SelectType,
    OptionItem,
    Row,
    Col,
    Button
} from 'ufs-ui';

import { COSTS_TYPE } from '../../../constants/common';
import CURRENCY from '../../../constants/currency';

import { getFormatedDate } from '../../../utils/common';

const MARGIN_STYLE = {
	marginTop: '0',
	marginButtom: '0',
	verticalAlign: 'bottom'
};

const DISPLAY_INLINE = {
	display: 'inline-block',
	width: '225px'
}

class CostsTable extends Component {
	static propTypes = {
        onAddCost: PropTypes.func
    };

    static defaultProps = {
        onAddCost: []
    };

	state = {
		name: '',
		cost: '',
		date: new Date(),
		costType: COSTS_TYPE.PRODUCTS,
		currency: CURRENCY.RU.title,
		nameError: {
			isError: false,
			errorMessage: ''
		},
		costError: {
			isError: false,
			errorMessage: ''
		}
	}

	validateRequiredField = (fieldNameError, value) => {
		if (String(value).trim() === '') {
			this.setState({
				[fieldNameError]: {
					isError: true,
					errorMessage: 'Поле обязательно для заполнения'
				}
			});

			return false;
		}

		this.setState({
			[fieldNameError]: {
				isError: false,
				errorMessage: ''
			}
		});

		return true;
	}

	handleInputChange = name => val => {
		this.setState({ [name]: val });
	}

	handleSelectChange = (index, item) => {
		this.setState({ costType: item });
	}

	handleRadioChange = (index, value) => {
		this.setState({ currency: value });
	}

	handleFieldBlur = field => () => {
		const fieldValue = this.state[field];
		const errorType = field + 'Error';
		const { isError } = this.state[errorType];

		if (isError) {
			this.validateRequiredField(errorType, fieldValue);
		}
	}

	handleAddCost = () => {
		const { name, cost, date,costType, currency } = this.state;
		const { onAddCost } = this.props;
		const nameValid = this.validateRequiredField('nameError', name);
		const costValid = this.validateRequiredField('costError', cost);
		
		if (nameValid && costValid) {
			const costObject = {
				id: (new Date()).getTime(),
				date: getFormatedDate(date),
				name,
				cost,
				costType,
				currency
			}

			onAddCost(costObject);
		}
	}

	render() {
		const {
			costType,
			name,
			cost,
			currency,
			nameError,
			costError,
			date
		} = this.state;

		return (
			<div>
				<h1>Добавить покуку</h1>
				<Row>
					<Col md={12}>
						<TextInput
							small
							errorMessage={nameError.errorMessage}
                            hasError={nameError.isError}
							label="Наименование"
							onChange={this.handleInputChange('name')}
							onBlur={this.handleFieldBlur('name')}
							value={name}
						/>
						<NumberInput
							small
							errorMessage={costError.errorMessage}
                            hasError={costError.isError}
							rightAlign={false}
							label="Стоимость"
							onChange={this.handleInputChange('cost')}
							onBlur={this.handleFieldBlur('cost')}
							value={cost}
						/>
						<DateInput
							small
							style={MARGIN_STYLE}
							value={date}
							onChange={this.handleInputChange('date')}
							format="YYYY-MM-DD"
							label="Дата покупки"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Select
							style={DISPLAY_INLINE}
							type={SelectType.DASHED}
							caption="Тип расхода"
							value={costType}
							onChange={this.handleSelectChange}
			    		>
							<OptionItem value={COSTS_TYPE.PRODUCTS}>Продукты</OptionItem>
							<OptionItem value={COSTS_TYPE.TRANSPORT}>Транспортные расходы</OptionItem>
							<OptionItem value={COSTS_TYPE.CLOTHES}>Одежда</OptionItem>
							<OptionItem value={COSTS_TYPE.OTHER}>Прочее</OptionItem>
						</Select>
						<RadioGroup
							label="Валюта покупки"
							value={currency}
							onChange={this.handleRadioChange}
						>
							<RadioButton label={CURRENCY.RU.title} value={CURRENCY.RU.title}/>
							<RadioButton label={CURRENCY.BY.title} value={CURRENCY.BY.title}/>
						</RadioGroup>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Button onClick={this.handleAddCost}>Добавить покупку</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CostsTable;