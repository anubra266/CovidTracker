import React, { useState } from "react";
import Layout from "antd/lib/layout";

import "antd/dist/antd.dark.css";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Body from "./body";

function App() {
	const [region, SetRegion] = useState(null);
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar setRegion={SetRegion} />
			<Layout>
				<Navbar />
				<Body region={region} />
			</Layout>
		</Layout>
	);
}

export default App;
