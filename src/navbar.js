import React from "react";
import Layout from "antd/lib/layout";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
const navbar = () => {
	return (
		<Layout.Header>
			<Row
				justify="end"
				gutter={[30, 0]}
				style={{ height: "100%" }}
				align="middle"
			>
				<Col>A</Col>
				<Col>B</Col>
			</Row>
		</Layout.Header>
	);
};

export default navbar;
