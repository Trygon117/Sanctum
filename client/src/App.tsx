import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "./store/page/pageSlice";
import * as paths from "./constants/routes";
import * as query from "./functions/query";

import Community from "./pages/community/Community";
import Create from './pages/create/Create';
import Home from "./pages/home/Home";
import Library from './pages/library/Library';

import PageHeader from "./components/pageHeader/PageHeader";
import PageNav from "./components/pageNav/PageNav";
import Modal from "./components/modal/Modal";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state: any) => state.page.showModal);

  useEffect(() => {
    query.GET('/isLoggedIn')
      .then((data) => {
        console.log(data);
        dispatch(setAccount(data.account));
        if (!data.loggedIn && window.location.pathname !== '/') {
          window.location.pathname = '/';
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <PageHeader />
      <PageNav />

      {showModal ?
        <Modal />
        :
        null}

      <BrowserRouter>
        <Routes>
          <Route path={paths.routs.DEFAULT} element={<Home />} />
          <Route path={paths.routs.HOME} element={<Home />} />
          <Route path={paths.routs.CREATE} element={<Create />} />
          <Route path={paths.routs.COMMUNITY} element={<Community />} />
          <Route path={paths.routs.LIBRARY} element={<Library />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
