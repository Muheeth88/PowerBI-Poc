import React, { useEffect, useState } from "react";
import { models } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import axios from "axios";
import { BEARER_TOKEN } from "../../utils/constants";
import { useParams } from "react-router-dom";
import "../dashboards/Dashboard.css";

const Dashboard = () => {
	const { reportname } = useParams();
	const [reportId, setReportId] = useState("");
	const [datasetId, setDatasetId] = useState("");
	const [embedUrl, setEmbedUrl] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [pbiConfigured, setPbiConfigured] = useState(false);

	const [reportConfig, setReportConfig] = useState({});

	useEffect(() => {
		getReportDetails();
		getAccessToken();
	}, []);

	const getReportDetails = () => {
		setDatasetId(localStorage.getItem("datasetid"));
		setReportId(localStorage.getItem("reportid"));
		setEmbedUrl(localStorage.getItem("embedurl"));
		getAccessToken();
	};

	const getAccessToken = async () => {
		let payload = {
			datasets: [
				{
					id: localStorage.getItem("datasetid"),
				},
			],
			reports: [
				{
					id: localStorage.getItem("reportid"),
				},
			],
		};

		try {
			const response = await axios.post("https://api.powerbi.com/v1.0/myorg/GenerateToken", payload, {
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			});
			console.log(response.data.token);
      localStorage.setItem("accesstoken", response.data.token)
			setAccessToken(response.data.token);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
		// setTimeout( updateReportConfig(), 2000)
		updateReportConfig();
	};

	const updateReportConfig = () => {
		setReportConfig({
			type: "report",
			embedUrl: localStorage.getItem("embedurl"),
			accessToken: localStorage.getItem("accesstoken"),
			id: localStorage.getItem("reportid"),
			tokenType: models.TokenType.Embed,
			settings: {
				panes: {
					filters: {
						expanded: false,
						visible: true,
					},
				},
			},
		});
		setPbiConfigured(true);
		//  setTimeout( setPbiConfigured(true), 2000)
	};

	return (
		<>
			<div className="wrapper">
				{pbiConfigured && (
					<PowerBIEmbed
						embedConfig={reportConfig}
						cssClassName="power-bi-report-class"
						eventHandlers={
							new Map([
								[
									"loaded",
									function () {
										console.log("Report loaded");
									},
								],
								[
									"rendered",
									function () {
										console.log("Report rendered");
									},
								],
								[
									"error",
									function (event) {
										console.log(event.detail);
									},
								],
							])
						}
						getEmbeddedComponent={(embeddedReport) => {
							window.report = embeddedReport;
						}}
					/>
				)}
			</div>
		</>
	);
};

export default Dashboard;
