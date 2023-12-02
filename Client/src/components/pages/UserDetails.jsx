import { useParams } from "react-router-dom"

export const UserDetails = () => {
    const { id } = useParams();
  return (
    <div>
        <h2>User details for id: { id } </h2>
    </div>
  )
}
