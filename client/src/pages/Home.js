import { Col, Space, Carousel, Button } from 'antd';
import React, { useRef } from 'react';
import { 
    RightOutlined,
    LeftOutlined } from '@ant-design/icons';
import HomeStyled from './styles/bannerStyled/HomeStyled';

const Home = () => {
    const contentStyle = {
        height: '240px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    let carourelRef = useRef();
    const handleNext = () => {
        carourelRef.current.next();
    }
    const handlePrev = () => {
        carourelRef.current.prev();
    }
    return (
        <>  
            <Col span={14}>
                <Carousel autoplay ref={carourelRef}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                    <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <HomeStyled>
                    <Space  style={{margin: '0 auto'}}>
                        <Button onClick={handlePrev}>
                            <LeftOutlined />
                        </Button>
                        <Button onClick={handleNext}>
                            <RightOutlined />
                        </Button>
                    </Space>
                </HomeStyled>
                
            </Col>
            <Col span={8}>Banner</Col>
        </>
    )
}

export default Home;
