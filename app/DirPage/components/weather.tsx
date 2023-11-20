'use client'
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import styled from 'styled-components';
import { getMiddlewareMatchers } from "next/dist/build/analysis/get-page-static-info";

const WeatherWidgetWrapper = styled.div`
    min-width: 250px;
    background: #fff;
    border: 1px solid #e8eaff;
    border-radius: 6px;
    padding: 15px 15px 0 15px;
    margin: 20px;
`

const WidgetTitle = styled.h1`
    font-size: 16px;
    font-weight: bold;
    color: #666;
`

const IconArea = styled.div`
    padding: 0 5px;
`

const TempText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #666;
    margin-top: 24px;
`

export default function WeatherWidget_City() {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        const fetchWeather = async (city: string) => {
            try{
                const weatherReq = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ee94006c9bb74ce892f181126211305&q=${city}&days=1&aqi=no&alerts=no`);
                const weatherData = await weatherReq.json();
                setWeather({icon: <Image src={"https:" + weatherData.current.condition.icon} alt={`It is ${weatherData.current.temp_c} in your city`} width={80} height={80} />, temperature: weatherData.current.temp_c + "º C"});
            }
            catch{
                console.log("xWthErr");
            }
        };
        fetchWeather('Tokyo');
    }, []);
    return (
        <WeatherWidgetWrapper>  
            <div className="row">
                <WidgetTitle>With City Name</WidgetTitle>
            </div>
            <div className="row">
                <IconArea>{weather='icon'}</IconArea>
                <TempText>{weather.temperature}</TempText>
            </div>
        </WeatherWidgetWrapper>
    )
}