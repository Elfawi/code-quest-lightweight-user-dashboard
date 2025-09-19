import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import PropTypes from "prop-types";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3/ span 2; 
  grid-row: 2;
@media(max-width:1100px){
  grid-column: 1/ -1;
  grid-row: auto;
}
  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    category: "Pizza",
    value: 0,
    color: "#ef4444",
  },
  {
    category: "Burger",
    value: 0,
    color: "#f97316",
  },
  {
    category: "Pasta",
    value: 0,
    color: "#eab308",
  },
  {
    category: "Salads",
    value: 0,
    color: "#84cc16",
  },
  {
    category: "Desserts",
    value: 0,
    color: "#22c55e",
  },
  {
    category: "Beverages",
    value: 0,
    color: "#14b8a6",
  },
  {
    category: "Appetizers",
    value: 0,
    color: "#3b82f6",
  },
  {
    category: "Main Courses",
    value: 0,
    color: "#a855f7",
  },
  {
    category: "Soups",
    value: 0,
    color: "#22ce4d",
  },
  {
    category: "Asian Cuisine",
    value: 0,
    color: "#de6d22",
  },
  {
    category: "Mexican Cuisine",
    value: 0,
    color: "#22c4e0",
  },
  {
    category: "Other",
    value: 0,
    color: "#6b7280",
  },
];

const startDataDark = [
  {
    category: "Pizza",
    value: 0,
    color: "#b91c1c",
  },
  {
    category: "Burger",
    value: 0,
    color: "#c2410c",
  },
  {
    category: "Pasta",
    value: 0,
    color: "#a16207",
  },
  {
    category: "Salads",
    value: 0,
    color: "#4d7c0f",
  },
  {
    category: "Desserts",
    value: 0,
    color: "#15803d",
  },
  {
    category: "Beverages",
    value: 0,
    color: "#0f766e",
  },
  {
    category: "Appetizers",
    value: 0,
    color: "#1d4ed8",
  },
  {
    category: "Main Courses",
    value: 0,
    color: "#7e22ce",
  },
  {
    category: "Soups",
    value: 0,
    color: "#1dbb44",
  },
  {
    category: "Asian Cuisine",
    value: 0,
    color: "#bd5e1f",
  },
  {
    category: "Mexican Cuisine",
    value: 0,
    color: "#21abc4",
  },
  {
    category: "Other",
    value: 0,
    color: "#4b5563",
  },
];

function prepareData(startData, orders) {
  if (!orders || orders.length === 0) return [];

  function incArrayValue(arr, field, quantity = 1) {
    return arr.map((obj) =>
      obj.category === field 
        ? { ...obj, value: obj.value + quantity } 
        : obj
    );
  }

  const data = orders
    .reduce((arr, order) => {
      let category = "Other";
      let quantity = order.quantity || 1;
console.log(order)
      if (order.foods) {
        if (typeof order.foods === 'string') {
          category = order.foods;
        } else if (order.foods.category) {
          category = order.foods.category;
        } else if (order.foods.name) {
          category = inferCategoryFromName(order.foods.name);
        }
      } 
      else if (order.food) {
        if (typeof order.food === 'string') {
          category = order.food;
        } else if (order.food.category) {
          category = order.food.category;
        } else if (order.food.name) {
          category = inferCategoryFromName(order.food.name);
        }
      }
      else if (order.category) {
        category = order.category;
      }
      else if (order.foodCategory) {
        category = order.foodCategory;
      }

      const validCategories = startData.map(item => item.category);
      if (!validCategories.includes(category)) {
        category = "Other";
      }

      return incArrayValue(arr, category, quantity);
    }, [...startData]) // Create a copy of startData
    .filter((obj) => obj.value > 0); // Only show categories with sales

  return data;
}

function inferCategoryFromName(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('pizza')) return 'Pizza';
  if (lowerName.includes('burger') || lowerName.includes('sandwich')) return 'Burger';
  if (lowerName.includes('pasta') || lowerName.includes('spaghetti') || lowerName.includes('noodle')) return 'Pasta';
  if (lowerName.includes('salad')) return 'Salad';
  if (lowerName.includes('cake') || lowerName.includes('ice cream') || lowerName.includes('dessert')) return 'Dessert';
  if (lowerName.includes('drink') || lowerName.includes('juice') || lowerName.includes('soda') || lowerName.includes('coffee')) return 'Beverage';
  if (lowerName.includes('appetizer') || lowerName.includes('starter')) return 'Appetizer';
  
  return 'Main Course';
}

const CustomTooltip = ({data:orders, active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    console.log("orders",orders)
    return (
      <div 
        style={{
          backgroundColor: 'var(--color-grey-0)',
          padding: '8px 12px',
          border: '1px solid var(--color-grey-200)',
          borderRadius: '4px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>
          {data.payload.category}
        </p>
        <p style={{ margin: 0, color: data.payload.color }}>
          Orders: {data.value}
        </p>
        <p style={{ margin: 0, fontSize: '0.9em', color: 'var(--color-grey-500)' }}>
          {((data.value / orders.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  data: PropTypes.array,
}
  
function CategorySalesChart({ orders = [] }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, orders);
  console.log(data);
  
  // If no data, show a message
  if (data.length === 0) {
    return (
      <ChartBox>
        <Heading as="h2">Food Category Sales</Heading>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '240px',
          color: 'var(--color-grey-500)',
          fontSize: '1.4rem'
        }}>
          No sales data available
        </div>
      </ChartBox>
    );
  }

  return (
    <ChartBox>
      <Heading as="h2">Food Category Sales</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            nameKey="category"
            dataKey="value"
            innerRadius={65}
            outerRadius={110}
            cx="45%"
            cy="58%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={`pie-${index}`}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip data={data} />} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

CategorySalesChart.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number,
      foods: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          category: PropTypes.string,
          name: PropTypes.string,
        }),
      ]),
      food: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          category: PropTypes.string,
          name: PropTypes.string,
        }),
      ]),
      category: PropTypes.string,
      foodCategory: PropTypes.string,
    })
  ),
};

export default CategorySalesChart;