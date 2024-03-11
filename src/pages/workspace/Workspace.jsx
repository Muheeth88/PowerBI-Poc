import React, { useEffect, useState } from "react";
import axios from "axios";
import Accord from "../../components/accordian/Accord";
import { BEARER_TOKEN } from "../../utils/constants";

const Workspace = () => {
	const [workspaces, setWorkspaces] = useState([]);
	useEffect(() => {
		fetchWorkspaces();
	}, []);

	const fetchWorkspaces = async () => {
		try {
			const response = await axios.get("https://api.powerbi.com/v1.0/myorg/groups", {
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			});
			setWorkspaces(response.data.value);
			console.log(response.data.value);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<div className="container">
			<div className="flex items-center justify-center mb-3">Workspace</div>
			<div>{workspaces && workspaces.map((w) => <Accord key={w.id} workspaceId={w.id} workspaceName={w.name} />)}</div>
		</div>
	);
};

export default Workspace;
