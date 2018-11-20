import React, { Component } from 'react';

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

const MARGIN_STYLE = {
	marginTop: '0',
	marginButtom: '0',
	verticalAlign: 'bottom'
};

const DISPLAY_INLINE = {
	display: 'inline-block'
}

const COSTS_TYPE = {
	OTHER: 'OTHER',
	PRODUCTS: 'PRODUCTS',
	CLOTHES: 'CLOTHES',
	TRANSPORT: 'TRANSPORT'
}

class CostsTable extends Component {

	render() {
		return (
			<div>
				<h1>Добавить покуку</h1>
				<Row>
					<Col md={12}>
						<TextInput small label='Наименование' />
						<NumberInput
							small
							rightAlign={false}
							label='Стоимость'
						/>
						<DateInput
							small
							style={MARGIN_STYLE}
							format="YYYY-MM-DD"
							label='Дата покупки'
						/>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Select
							style={DISPLAY_INLINE}
							type={SelectType.DASHED}
							caption="Тип расхода"
							value={COSTS_TYPE.PRODUCTS}
			    		>
							<OptionItem value={COSTS_TYPE.PRODUCTS}>Продукты</OptionItem>
							<OptionItem value={COSTS_TYPE.TRANSPORT}>Транспортные расходы</OptionItem>
							<OptionItem value={COSTS_TYPE.CLOTHES}>Одежда</OptionItem>
							<OptionItem value={COSTS_TYPE.OTHER}>Прочее</OptionItem>
						</Select>
						<RadioGroup label='Валюта покупки'>
							<RadioButton label="Российски рубль" value="RU"/>
							<RadioButton label="Белорусский рубль" value="BY"/>
						</RadioGroup>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Button>Добавить покупку</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CostsTable;