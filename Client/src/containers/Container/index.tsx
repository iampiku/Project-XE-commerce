import React from "react";

const Container = ({children}: any) => {
    const [data , setData] = React.useState ({});

    React.useEffect (() => {
        (async function () {
            const resp = await (await fetch ('/api/data')).json ()
            setData (prevState => prevState = resp);
        }) ()
    } , [])

    return <div className={''}>
        <pre>
            {JSON.stringify (data , null , 2)}
        </pre>
    </div>;
};

export default Container;
