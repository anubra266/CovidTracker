import React, { useState, useEffect } from "react";
import Layout from "antd/lib/layout";

import Card from "antd/lib/card";
import Statistic from "antd/lib/statistic";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Select from "antd/lib/select";
import axios from "axios";

const Sidebar = () => {
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
						<ChangeRegion />
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

const ChangeRegion = () => {
	function onChange(value) {
		console.log(`selected ${value}`);
	}
	return (
		<Select
			showSearch
			style={{ width: "100%" }}
			placeholder="Select a region"
			optionFilterProp="children"
			onChange={onChange}
			filterOption={(input, option) =>
				option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			<Select.Option value="jack">General</Select.Option>
			<Select.Option value="lucy">United States</Select.Option>
			<Select.Option value="tom">Nigeria</Select.Option>
		</Select>
	);
};
