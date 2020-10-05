import React, { useState, useEffect } from "react";
import Layout from "antd/lib/layout";

import Card from "antd/lib/card";
import Statistic from "antd/lib/statistic";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import axios from "axios";

const Sidebar = (props) => {
	const [summary, setSummary] = useState(null);
	const getSummary = () => {
		axios({
			method: "get",
			url: "https://api.covid19api.com/summary",
			headers: {},
		})
			.then(function (response) {
				setSummary(response.data.Global);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		getSummary();
		setInterval(() => {
			getSummary();
		}, 10000);
	}, []);
	return (
		<Layout.Sider theme="dark" width={250}>
			<h1 style={{ margin: "16px" }}>
				<strong>GoSoon-Track</strong>
			</h1>
			{summary && (
				<Row gutter={[16, 16]} style={{ padding: 8 }}>
					<Col span={24}>
						<ChangeRegion {...props} />
					</Col>
					<Col span={24}>
						<Card>
							<Statistic
								title="Total Confirmed"
								value={summary.TotalConfirmed}
							/>
						</Card>
					</Col>
					<Col span={24}>
						<Card>
							<Statistic
								valueStyle={{ color: "#cf1322" }}
								title="Total Deaths"
								value={summary.TotalDeaths}
							/>
						</Card>
					</Col>
					<Col span={24}>
						<Card>
							<Statistic
								valueStyle={{ color: "#3f8600" }}
								title="Total Recovered"
								value={summary.TotalRecovered}
							/>
						</Card>
					</Col>
				</Row>
			)}
		</Layout.Sider>
	);
};

export default Sidebar;

const ChangeRegion = ({ setRegion }) => {
	const [countries, setCountries] = useState(null);
	const getCountries = () => {
		axios({
			method: "get",
			url: "https://api.covid19api.com/countries",
			headers: {},
		})
			.then(function (response) {
				setCountries(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	function onChange(value) {
		setRegion(value);
	}
	useEffect(() => {
		getCountries();
	}, []);
	return (
		<Select
			showSearch
			style={{ width: "100%" }}
			placeholder="Search Countries"
			optionFilterProp="children"
			onChange={onChange}
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			{countries ? (
				countries.map((country, index) => {
					return (
						<Select.Option key={index} value={country.Slug}>
							{country.Country}
						</Select.Option>
					);
				})
			) : (
				<Select.Option value={null}>Loading Countries...</Select.Option>
			)}
		</Select>
	);
};
