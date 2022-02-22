import { Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlantsChart = (props) => {

  let {plantsArr, names} = props;
    return (
        <Fragment>
            <h3>Зависимость потребления заводов от цены на кирпич</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                width={500}
                height={300}
                data={plantsArr}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" type="number" name="Цена" unit="₽"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={names[5]} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={names[6]} stroke="#82ca9d" />
                <Line type="monotone" dataKey={names[7]} stroke="#FA8072" />
                </LineChart>
            </ResponsiveContainer>
      </Fragment>
    );
  }

export default PlantsChart