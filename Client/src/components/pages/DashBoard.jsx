import "./dashboard.css"

export const DashBoard = () => {
  return (
    <div className="dashBox">
    <div className="header">
      <h1>Dashboard</h1>
    </div>
    <div className="company_data">
      <div className="datas">
        <p className="data_head">Total Employee</p>
        <p className="data">32</p>
      </div>
      <div className="datas">
        <p className="data_head">Admins</p>
        <p className="data">3</p>
      </div>
      <div className="datas">
        <p className="data_head">Average Pay</p>
        <p className="data">32000</p>
      </div>
    </div>
    <div className="new_employee">
      <p>New Employees</p>
    </div>
    </div>
  )
}
