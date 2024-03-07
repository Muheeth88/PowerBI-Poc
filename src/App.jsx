import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "./App.css";
import Workspace from './pages/workspace/Workspace';
import Dashboard from './pages/dashboards/Dashboard';

function App() {

	return (
	<Router>
		<Routes>
		<Route path="/" element={<Navigate to="/workspaces" replace />} />
			<Route path='/workspaces' element={<Workspace/>}/>
			<Route path='/dashboard/:reportname' element={<Dashboard/>}/>
			{/* <Route path='/dashboard' element={<Dashboard/>}/> */}
		</Routes>
	</Router>
	);
}

export default App;
