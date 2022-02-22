
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Fragment } from 'react';
const HousesChart = (props) => {
  
  let {housesArr, names} = props;
  console.log('House Chart',  housesArr)
    return (      
      <Fragment>
        <h3>Зависимость потребления жилых домов от температуры окружающей среды</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart         
            data={housesArr}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey="temp" type="number" name="stature" unit="C" domain={['dataMin', 'dataMax']}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={names[0]} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey={names[1]} stroke="#82ca9d" />
            <Line type="monotone" dataKey={names[2]} stroke="#FA8072" />
            <Line type="monotone" dataKey={names[3]} stroke="#FF00FF" />
            <Line type="monotone" dataKey={names[4]} stroke="#808000" />
          </LineChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }

export default HousesChart


   