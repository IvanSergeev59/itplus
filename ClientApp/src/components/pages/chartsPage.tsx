import { Fragment } from 'react';
import HousesChart from '../houses-chart/houses-chart';
import PlantsChart from '../plants-chart/plants-chart';
import MainChart from '../main-chart/main-chart';
const ChartsPage = (props) => {
    const {data, housesArr, plantsArr, mainChartArr, names} = props
    return (        
        <section className="charts">
            <HousesChart housesArr={housesArr} names={names}/>
            <PlantsChart plantsArr={plantsArr} names={names}/> 
            <MainChart mainChartArr={mainChartArr} names={names}/>
        </section>
    )
}

export default ChartsPage