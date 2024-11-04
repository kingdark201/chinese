import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/home"
import Hsk1 from "./pages/hsk1";
import Hsk2 from "./pages/hsk2";
import Hsk3 from "./pages/hsk3";
import Hsk4 from "./pages/hsk4";
import Hsk5 from "./pages/hsk5";
import Hsk6 from "./pages/hsk6";



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
        ,
        {
            path: ROUTERS.HSK2,
            component: <Hsk2 />
        }
        ,
        {
            path: ROUTERS.HSK3,
            component: <Hsk3 />
        }
        ,
        {
            path: ROUTERS.HSK4,
            component: <Hsk4 />
        }
        ,
        {
            path: ROUTERS.HSK5,
            component: <Hsk5 />
        }
        ,
        {
            path: ROUTERS.HSK6,
            component: <Hsk6 />
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
