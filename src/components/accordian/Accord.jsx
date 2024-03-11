import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BEARER_TOKEN } from "../../utils/constants";

const Accord = (props) => {
	const navigate = useNavigate();
	const [reports, setReports] = useState([]);

	const toggleAccordion = (workspaceId) => {
		fetchReports(workspaceId);
	};

	const fetchReports = async (workspaceId) => {
		try {
			const response = await axios.get(`https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports`, {
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			});
			setReports(response.data.value);
			console.log("Reports", response.data.value);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleReportClick = (reportName, embedUrl, id, datasetId) => {
		localStorage.clear();
		localStorage.setItem("embedurl", embedUrl);
		localStorage.setItem("reportid", id);
		localStorage.setItem("datasetid", datasetId);
		navigate(`/dashboard/${reportName}`);
	};

	return (
		<div>
			<Accordion>
				<AccordionSummary
					onClick={() => toggleAccordion(props.workspaceId)}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1-content"
					id="panel1-header"
				>
					{props.workspaceName}
				</AccordionSummary>
				<AccordionDetails>
					<div className="">
						{reports &&
							reports.map((r) => (
								// <Link key={r.id} to="/dashboard">
								<div
									key={r.id}
									onClick={() => handleReportClick(r.name, r.embedUrl, r.id, r.datasetId)}
									className="my-4 cursor-pointer hover:bg-slate-100 p-2"
								>
									<div>
										<span>Report Name : </span> <span>{r.name}</span>
									</div>
									<div>
										<span>Report Type : </span> <span>{r.reportType}</span>
									</div>
									<div className="w-100">
										<span>Embed URL : </span> <span>{`${r.embedUrl.substring(0, 60)} ...`}</span>
									</div>
								</div>
								//  </Link>
							))}
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default Accord;
