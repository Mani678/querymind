export function getDemoData() {
  const categories = ["Electronics", "Apparel", "Home", "Sports"]
  const regions = ["North", "South", "East", "West"]
  const statuses = ["completed", "pending", "refunded"]
  const products = ["MacBook Pro", "iPhone 15", "Nike Air Max", "Sony WH-1000XM5", "Levi's Jeans", "Instant Pot", "Yoga Mat", "AirPods Pro", "Samsung TV", "Kindle"]

  const orders = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    customer_id: Math.floor(Math.random() * 60) + 1,
    customer_name: `Customer ${Math.floor(Math.random() * 60) + 1}`,
    product: products[Math.floor(Math.random() * products.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    amount: Math.round((Math.random() * 800 + 20) * 100) / 100,
    status: statuses[Math.floor(Math.random() * 3)],
    region: regions[Math.floor(Math.random() * 4)],
    created_at: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  const customers = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@acme.com`,
    plan: i < 8 ? "enterprise" : i < 20 ? "pro" : "free",
    mrr: i < 8 ? 2000 + i * 200 : i < 20 ? 49 : 0,
    churn_risk: i > 50 ? "high" : i > 40 ? "medium" : "low",
    total_orders: orders.filter(o => o.customer_id === i + 1).length,
    joined_at: new Date(Date.now() - (i + 1) * 8 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  const monthly_revenue = Array.from({ length: 6 }, (_, i) => {
    const month = new Date()
    month.setMonth(month.getMonth() - (5 - i))
    return {
      month: month.toLocaleString("default", { month: "short", year: "numeric" }),
      electronics: Math.round(12000 + Math.random() * 5000 - (i === 4 ? 3000 : 0)),
      apparel: Math.round(8000 + Math.random() * 3000 - (i >= 3 ? 1500 * (i - 2) : 0)),
      home: Math.round(6000 + Math.random() * 2000),
      sports: Math.round(4000 + Math.random() * 2000 + i * 200),
    }
  })

  return { orders, customers, monthly_revenue }
}

export const DEMO_SCHEMA = {
  tables: [
    {
      name: "orders",
      columns: [
        { name: "id", type: "integer" },
        { name: "customer_id", type: "integer" },
        { name: "customer_name", type: "text" },
        { name: "product", type: "text" },
        { name: "category", type: "text" },
        { name: "amount", type: "decimal" },
        { name: "status", type: "text" },
        { name: "region", type: "text" },
        { name: "created_at", type: "timestamp" },
      ],
    },
    {
      name: "customers",
      columns: [
        { name: "id", type: "integer" },
        { name: "name", type: "text" },
        { name: "email", type: "text" },
        { name: "plan", type: "text" },
        { name: "mrr", type: "decimal" },
        { name: "churn_risk", type: "text" },
        { name: "total_orders", type: "integer" },
        { name: "joined_at", type: "timestamp" },
      ],
    },
    {
      name: "monthly_revenue",
      columns: [
        { name: "month", type: "text" },
        { name: "electronics", type: "decimal" },
        { name: "apparel", type: "decimal" },
        { name: "home", type: "decimal" },
        { name: "sports", type: "decimal" },
      ],
    },
  ],
}
