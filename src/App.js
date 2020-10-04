import React from "react";
import Layout from "antd/lib/layout";

import "antd/dist/antd.dark.css";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Body from "./body";

function App() {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout>
				<Navbar />
				<Body />
			</Layout>
		</Layout>
	);
}

export default App;
