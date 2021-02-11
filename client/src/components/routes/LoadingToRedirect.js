import { Row } from 'antd'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && history.push('/');
        return () => clearInterval(interval);
    }, [count])
    return (
        <Row justify="center" style={{marginTop: '20px'}}>
            <h3>Redirecting you in {count} seconds</h3>
        </Row>
    )
}

export default LoadingToRedirect;
