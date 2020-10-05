import React, { useState, useEffect } from "react";

import Layout from "antd/lib/layout";
import Table from "antd/lib/table";
import Card from "antd/lib/card";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import axios from "axios";

const Body = ({ region }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	const getData = () => {
		axios({
			method: "get",
			url: "https://api.covid19api.com/summary",
			headers: {},
		})
			.then(function (response) {
				setData(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	useEffect(() => {
		getData();
		setInterval(() => {
			getData();
		}, 10000);
	}, []);

	const sortStrArr = (a, b, sorter) => {
		return a[sorter].localeCompare(b[sorter]);
	};
	const sortNumArr = (a, b, sorter) => {
		if (a[sorter] < b[sorter]) {
			return -1;
		}
		if (a[sorter] > b[sorter]) {
			return 1;
		}
		return 0;
	};
	const addCommas = (text) => {
		return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	return (
		<Layout.Content>
			<Row gutter={[16, 16]} style={{ padding: 8 }}>
				<Col span={24}>
					<Card>
						<Table
							pagination={{ defaultPageSize: 5 }}
							dataSource={data && data.Countries}
							loading={loading}
							title={() => "World Data"}
							bordered
						>
							<Table.Column
								title="Name"
								dataIndex="Country"
								sorter={(a, b) => sortStrArr(a, b, "Country")}
								render={(text) => (
									<Typography.Text strong>{text}</Typography.Text>
								)}
							/>
							<Table.Column
								title="Confirmed"
								dataIndex="TotalConfirmed"
								sorter={(a, b) => sortNumArr(a, b, "TotalConfirmed")}
								render={(text) => (
									<Typography.Text>{addCommas(text)}</Typography.Text>
								)}
							/>
							<Table.Column
								title="Deceased"
								dataIndex="TotalDeaths"
								sorter={(a, b) => sortNumArr(a, b, "TotalDeaths")}
								render={(text) => (
									<Typography.Text type="danger">
										{addCommas(text)}
									</Typography.Text>
								)}
							/>
							<Table.Column
								title="Recovered"
								dataIndex="TotalRecovered"
								sorter={(a, b) => sortNumArr(a, b, "TotalRecovered")}
								render={(text) => (
									<Typography.Text type="success">
										{addCommas(text)}
									</Typography.Text>
								)}
							/>
						</Table>
					</Card>
				</Col>
			</Row>
		</Layout.Content>
	);
};

export default Body;
