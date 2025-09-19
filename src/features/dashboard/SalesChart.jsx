import styled from "styled-components";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import PropTypes from "prop-types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
grid-row: 5/-1;
margin-bottom:2.4rem ;
overflow:hidden ;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ orders, numDays }) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      ordersSales: orders
        ?.filter((order) => isSameDay(date, new Date(order.orderdate)))
        ?.reduce((accu, curr) => accu + curr.orderprice, 0),
    };
  });
  
  const colors = isDarkMode
    ? {
        ordersSales: { stroke: "#EA7C69", fill: "#EA7C69" },
        foodNames: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        ordersSales: { stroke: "#EA7C69", fill: "#ffd2ca" },
        foodNames: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
           itemStyle={{
            textWrap:"wrap",
           }}
            contentStyle={{
              backgroundColor: colors.background,
              width:'100%',
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              overflow:'hidden',
            
            }}
          />
          <Area
            dataKey="ordersSales"
            type="monotone"
            stroke={colors.ordersSales.stroke}
            fill={colors.ordersSales.fill}
            strokeWidth={2}
            name="Orders sales"
            unit="$"
            
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
SalesChart.propTypes = {
  orders: PropTypes.array.isRequired,
  numDays: PropTypes.number.isRequired,
};

export default SalesChart;
