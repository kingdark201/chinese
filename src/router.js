import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/home"
import Hsk1 from "./pages/hsk1";



const RenderUserRouter = () => {
    const routers = [
        {
            path: ROUTERS.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.HSK1,
            component: <Hsk1 />
        }
    ];

    return (
        <Routes>
            {
                routers.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))
            }
        </Routes>
    );
};

const RouterCustom = () => {
    return <RenderUserRouter />;
};

export default RouterCustom;