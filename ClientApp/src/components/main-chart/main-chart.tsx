import React, { Fragment, PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';



const MainChart = (props) => {
    let {mainChartArr, names} = props; 
    return (
      <Fragment>
        <h3>Общее потребление</h3>
        <ResponsiveContainer width="100%" height={1000}>
          <ComposedChart
            width={500}           
            data={mainChartArr}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" />
            <YAxis  type="number" />
            <Tooltip />
            <Legend />
            <Bar dataKey={names[7]} barSize={20} fill="#9400D3" stackId="a"/>
            <Bar dataKey={names[6]} barSize={20} fill="#FF8C00" stackId="a"/>
            <Bar dataKey={names[5]} barSize={20} fill="#FF0000" stackId="a"/>
            <Bar dataKey={names[2]} barSize={20} fill="#413ea0" stackId="a"/> 
            <Bar dataKey={names[3]} barSize={20} fill="#82ca9d" stackId="a"/>
            <Bar dataKey={names[4]} barSize={20} fill="#FA8072" stackId="a"/>
            <Bar dataKey={names[1]} barSize={20} fill="#FF00FF" stackId="a"/>          
            <Line type="monotone" dataKey="x" stroke="#D2691E" name="Общее потребление"/>
          </ComposedChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
export default MainChart