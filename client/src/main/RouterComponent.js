import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../Home/Home';
import NavBar from '../NavBar.js/NavBar';
import SignUp from '../Login/SignUp';
import SighnIn from '../Login/SignIn';
import AllCategories from '../AllCategories/AllCategories';
import Playlist from '../playlist.js/Playlist';


const RouterComponents = () => {
     
    return (<>
        <Router>
            <Routes>
                <Route path='/' element={<NavBar/>}>
                    <Route index element={<Home/>} />
                    <Route path="Login" element={<SighnIn />}/>
                    <Route path="Playlists" element={<AllCategories />}/>
                    <Route path="SignUp" element={<SignUp />} />
                    <Route  path="playlist" element={<Playlist />} />               
                </Route>
            </Routes>
        </Router>
    </>);
}

export default RouterComponents;