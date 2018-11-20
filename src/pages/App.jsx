import React from 'react';

import {
    RootComponent,
    Sidebar,
    MenuSideTop,
    MenuItem,
    IconType,
    Header,
    Content
} from "ufs-ui";

import "ufs-ui/dist/ufs-ui.css"

import { UFSProvider } from "ufs-workflow-ui";

import CostsList from '../components/CostsList/CostsList.jsx';

const App = props => (
	<UFSProvider>
		<RootComponent>
			<Sidebar>
				<MenuSideTop>
		            <MenuItem className="sber_logo" />
		            <MenuItem title="Расходы" icon={IconType.MENU_CATALOG} pressed />
		        </MenuSideTop>
	        </Sidebar>
	        <Header>
	        	<h1>Таблица расходов</h1>
	        </Header>
	        <Content>
	        	<CostsList />
	        </Content>
		</RootComponent>
	</UFSProvider>
);

export default App;
